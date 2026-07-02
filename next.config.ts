import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // КРИТИЧЕСКИ ВАЖНО ДЛЯ ЭТОГО DOCKERFILE
  /* твои остальные настройки */
};

export default nextConfig;