"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import {
  Activity,
  Container,
  Database,
  Globe,
  Server,
  Waypoints,
  Workflow,
} from "lucide-react";
import type { InfraNodeData, InfraNodeKind } from "@/data/infrastructure";

const iconByKind: Record<InfraNodeKind, typeof Server> = {
  edge: Globe,
  server: Server,
  service: Waypoints,
  database: Database,
  cicd: Workflow,
  registry: Container,
};

const accentByKind: Record<InfraNodeKind, string> = {
  edge: "text-accent-2 border-accent-2/40",
  server: "text-foreground border-border-strong",
  service: "text-accent border-accent/40",
  database: "text-accent-2 border-accent-2/40",
  cicd: "text-warning border-warning/40",
  registry: "text-warning border-warning/40",
};

export function InfraNode({ data, selected }: NodeProps & { data: InfraNodeData }) {
  const Icon = iconByKind[data.kind];

  return (
    <div
      className={`glass-card w-56 rounded-xl border px-4 py-3 transition-shadow ${accentByKind[data.kind]} ${
        selected ? "glow" : ""
      }`}
    >
      <Handle type="target" position={Position.Top} className="!bg-border-strong" />
      <Handle type="target" position={Position.Left} className="!bg-border-strong" />
      <div className="flex items-center gap-2">
        <Icon size={15} />
        <p className="text-sm font-medium text-foreground">{data.title}</p>
      </div>
      <p className="mt-1 text-xs text-muted">{data.subtitle}</p>
      <Handle type="source" position={Position.Bottom} className="!bg-border-strong" />
      <Handle type="source" position={Position.Right} className="!bg-border-strong" />
    </div>
  );
}

export function InfraGroupNode({ data }: NodeProps & { data: InfraNodeData }) {
  return (
    <div className="h-full w-full rounded-2xl border border-dashed border-border-strong bg-background-elevated/40">
      <Handle type="target" position={Position.Top} className="!bg-border-strong" />
      <Handle type="target" position={Position.Left} className="!bg-border-strong" />
      <div className="flex items-center gap-2 px-4 pt-3 font-mono text-xs uppercase tracking-wider text-muted">
        <Activity size={13} className="text-accent" />
        {data.title}
        <span className="normal-case tracking-normal text-muted/70">— {data.subtitle}</span>
      </div>
    </div>
  );
}
