"use client";

import { useMemo, useState } from "react";
import {
  Background,
  BackgroundVariant,
  Controls,
  MarkerType,
  ReactFlow,
  type Edge,
  type Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { infraEdges, infraNodes, type InfraNodeData } from "@/data/infrastructure";
import { InfraGroupNode, InfraNode } from "@/components/infra/InfraNode";
import { InfraDetails } from "@/components/infra/InfraDetails";

const nodeTypes = { infra: InfraNode, group: InfraGroupNode };

const byId = new Map(infraNodes.map((node) => [node.id, node]));

const layoutNodes: Node<InfraNodeData>[] = [
  { id: "user", type: "infra", position: { x: 0, y: 300 }, data: byId.get("user")! },
  { id: "dns-ssl", type: "infra", position: { x: 260, y: 300 }, data: byId.get("dns-ssl")! },
  { id: "cicd", type: "infra", position: { x: 260, y: 500 }, data: byId.get("cicd")! },
  {
    id: "vps2",
    type: "group",
    position: { x: 560, y: 60 },
    data: byId.get("vps2")!,
    style: { width: 340, height: 480 },
  },
  {
    id: "nginx",
    type: "infra",
    position: { x: 32, y: 70 },
    parentId: "vps2",
    extent: "parent",
    data: byId.get("nginx")!,
  },
  {
    id: "go-app",
    type: "infra",
    position: { x: 32, y: 220 },
    parentId: "vps2",
    extent: "parent",
    data: byId.get("go-app")!,
  },
  {
    id: "monitoring",
    type: "infra",
    position: { x: 32, y: 370 },
    parentId: "vps2",
    extent: "parent",
    data: byId.get("monitoring")!,
  },
  {
    id: "vps1",
    type: "group",
    position: { x: 1000, y: 190 },
    data: byId.get("vps1")!,
    style: { width: 300, height: 220 },
  },
  {
    id: "postgres",
    type: "infra",
    position: { x: 32, y: 90 },
    parentId: "vps1",
    extent: "parent",
    data: byId.get("postgres")!,
  },
];

const flowEdges: Edge[] = infraEdges.map((edge) => ({
  id: edge.id,
  source: edge.source,
  target: edge.target,
  label: edge.label,
  animated: edge.animated,
  style: {
    stroke: edge.dashed ? "var(--color-border-strong)" : "var(--color-accent)",
    strokeWidth: 1.5,
    strokeDasharray: edge.dashed ? "5 5" : undefined,
  },
  labelStyle: { fill: "var(--color-muted)", fontSize: 11, fontFamily: "var(--font-mono)" },
  labelBgStyle: { fill: "var(--color-background)", fillOpacity: 0.85 },
  markerEnd: { type: MarkerType.ArrowClosed, color: "var(--color-accent)", width: 16, height: 16 },
}));

export function InfraDiagram() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = useMemo(
    () => (selectedId ? infraNodes.find((n) => n.id === selectedId) ?? null : null),
    [selectedId],
  );

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
      <div className="glass-card h-[640px] rounded-2xl overflow-hidden">
        <ReactFlow
          nodes={layoutNodes}
          edges={flowEdges}
          nodeTypes={nodeTypes}
          onNodeClick={(_, node) => setSelectedId(node.id)}
          onPaneClick={() => setSelectedId(null)}
          fitView
          fitViewOptions={{ padding: 0.15 }}
          minZoom={0.4}
          maxZoom={1.5}
          proOptions={{ hideAttribution: true }}
        >
          <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="var(--color-border-strong)" />
          <Controls showInteractive={false} className="!fill-foreground [&_button]:!bg-background-elevated [&_button]:!border-border [&_button]:!text-foreground" />
        </ReactFlow>
      </div>

      <InfraDetails node={selected} />
    </div>
  );
}
