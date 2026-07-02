package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"sync"
	"time"

	_ "github.com/lib/pq"
)

const (
	sleepDuration  = 5
	workerCount    = 5
	requestTimeout = 3
)

type Url struct {
	Name         string        `json:"name"`
	Url          string        `json:"url"`
	SuccessCount int           `json:"successCount"`
	ResponseTime time.Duration `json:"responseTime"`
}

func main() {
	jsonMethod := &JSONUrlParser{}
	parser := NewUrlParser(jsonMethod)
	urls, err := parser.Parse("data/urls.json")
	if err != nil {
		log.Fatal(err)
	}

	db := initDB(os.Getenv("DATABASE_URL"))
	defer db.Close()

	var mu sync.Mutex
	server := NewServer(&mu, urls, db)

	http.HandleFunc("/results", server.resultsHandler)

	go http.ListenAndServe(":8090", nil)

	infinityCheckUrls(urls, &mu, db)
}

type Server struct {
	mu   *sync.Mutex
	urls []*Url
	db   *sql.DB
}

func NewServer(mu *sync.Mutex, urls []*Url, db *sql.DB) *Server {
	return &Server{mu: mu, urls: urls, db: db}
}

func (s *Server) resultsHandler(w http.ResponseWriter, req *http.Request) {
	log.Println("=== ПРИНЯТ ЗАПРОС НА ЭНДПОИНТ /RESULTS ===")
	rows, err := s.db.Query(`SELECT name, url, success_count, response_time_ms, checked_at FROM url_checks ORDER BY checked_at DESC LIMIT 100`)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	type Result struct {
		Name           string    `json:"name"`
		URL            string    `json:"url"`
		SuccessCount   int       `json:"successCount"`
		ResponseTimeMs int64     `json:"responseTimeMs"`
		CheckedAt      time.Time `json:"checkedAt"`
	}

	var results []Result
	for rows.Next() {
		var r Result
		if err := rows.Scan(&r.Name, &r.URL, &r.SuccessCount, &r.ResponseTimeMs, &r.CheckedAt); err != nil {
			continue
		}
		results = append(results, r)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(results)
}

func initDB(dsn string) *sql.DB {
	if dsn == "" {
		dsn = "postgres://checker:checker@localhost:5432/checker?sslmode=disable"
	}
	db, err := sql.Open("postgres", dsn)
	if err != nil {
		log.Fatal("db open:", err)
	}
	for i := 0; i < 10; i++ {
		if err = db.Ping(); err == nil {
			break
		}
		log.Printf("waiting for db... (%d/10)", i+1)
		time.Sleep(2 * time.Second)
	}
	if err != nil {
		log.Fatal("db ping:", err)
	}
	_, err = db.Exec(`CREATE TABLE IF NOT EXISTS url_checks (
		id               SERIAL PRIMARY KEY,
		name             TEXT NOT NULL,
		url              TEXT NOT NULL,
		success_count    INT NOT NULL,
		response_time_ms BIGINT NOT NULL,
		checked_at       TIMESTAMPTZ DEFAULT NOW()
	)`)
	if err != nil {
		log.Fatal("create table:", err)
	}
	return db
}

func saveResults(db *sql.DB, urls []*Url) {
	for _, u := range urls {
		_, err := db.Exec(
			`INSERT INTO url_checks (name, url, success_count, response_time_ms) VALUES ($1, $2, $3, $4)`,
			u.Name, u.Url, u.SuccessCount, u.ResponseTime.Milliseconds(),
		)
		if err != nil {
			log.Println("save result:", err)
		}
	}
}

type UrlParser struct {
	parserMethod ParserMethod
}

func NewUrlParser(p ParserMethod) *UrlParser {
	return &UrlParser{parserMethod: p}
}

func (up *UrlParser) Parse(path string) ([]*Url, error) {
	return up.parserMethod.Parse(path)
}

type ParserMethod interface {
	Parse(path string) ([]*Url, error)
}

type JSONUrlParser struct{}

func (p *JSONUrlParser) Parse(path string) ([]*Url, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, err
	}
	var res []*Url
	if err = json.Unmarshal(data, &res); err != nil {
		return nil, err
	}
	return res, nil
}

func infinityCheckUrls(urls []*Url, mu *sync.Mutex, db *sql.DB) {
	for {
		errChan := make(chan error)
		go processWithPool(urls, errChan, mu)
		for err := range errChan {
			if err != nil {
				fmt.Println(err)
			}
		}
		saveResults(db, urls)
		for _, url := range urls {
			fmt.Println(url.Name, url.Url, url.SuccessCount, url.ResponseTime)
		}
		time.Sleep(time.Second * sleepDuration)
	}
}

func processWithPool(items []*Url, errors chan<- error, mu *sync.Mutex) {
	var wg sync.WaitGroup
	jobs := make(chan *Url, len(items))

	for w := 0; w < workerCount; w++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			for item := range jobs {
				errors <- checkUrl(item, mu)
			}
		}()
	}

	for _, item := range items {
		jobs <- item
	}
	close(jobs)

	wg.Wait()
	close(errors)
}

func checkUrl(url *Url, mu *sync.Mutex) error {
	req, err := http.NewRequest("GET", url.Url, nil)
	if err != nil {
		return err
	}

	client := &http.Client{Timeout: requestTimeout * time.Second}

	start := time.Now()
	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	duration := time.Since(start)

	if resp.StatusCode == 200 {
		mu.Lock()
		url.SuccessCount++
		url.ResponseTime = duration
		mu.Unlock()
	}

	return nil
}
