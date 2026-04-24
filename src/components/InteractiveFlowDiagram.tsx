import React, { useState, useCallback, useEffect } from "react";
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  Handle,
  Position,
  MarkerType,
  type Node,
  type Edge,
  type OnConnect,
} from "@xyflow/react";
import { Icon } from "@iconify/react";
import "@xyflow/react/dist/style.css";

type Status = "healthy" | "degraded" | "failed";

const statusStyles: Record<
  Status,
  { dot: string; text: string; border: string; bg: string }
> = {
  healthy: {
    dot: "bg-emerald-500",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-500/60 dark:border-emerald-400/60",
    bg: "bg-emerald-500/5 dark:bg-emerald-500/10",
  },
  degraded: {
    dot: "bg-amber-500",
    text: "text-amber-600 dark:text-amber-400",
    border: "border-amber-500/60 dark:border-amber-400/60",
    bg: "bg-amber-500/5 dark:bg-amber-500/10",
  },
  failed: {
    dot: "bg-red-500",
    text: "text-red-600 dark:text-red-400",
    border: "border-red-500/60 dark:border-red-400/60",
    bg: "bg-red-500/5 dark:bg-red-500/10",
  },
};

// ───────────── Custom Nodes ─────────────

const RequestNode = ({ data }: { data: any }) => (
  <div className="group">
    <Handle type="target" position={Position.Left} className="!bg-brand-500 !border-0" />
    <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="w-5 h-5 rounded-full bg-brand-500/15 flex items-center justify-center">
        <Icon icon={data.icon || "solar:programming-bold-duotone"} className="w-3 h-3 text-brand-600 dark:text-brand-400" />
      </div>
      <span className="text-xs font-semibold text-slate-900 dark:text-white">
        {data.label}
      </span>
    </div>
    <Handle type="source" position={Position.Right} className="!bg-brand-500 !border-0" />
  </div>
);

const GatewayNode = ({ data }: { data: any }) => (
  <div className="relative">
    <Handle type="target" position={Position.Left} className="!bg-brand-500 !border-0" />
    <div className="absolute inset-0 rounded-xl bg-brand-500/20 blur-xl"></div>
    <div className="relative rounded-xl border-2 border-brand-500/50 dark:border-brand-400/50 bg-white dark:bg-slate-900 px-5 py-3 shadow-lg">
      <div className="flex items-center gap-2.5">
        <img src="/robot.png" alt="pLLM" className="w-7 h-7 rounded-md" />
        <div>
          <div className="text-sm font-bold text-slate-900 dark:text-white">
            {data.label}
          </div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-brand-600 dark:text-brand-400">
            route · guard · audit
          </div>
        </div>
      </div>
    </div>
    <Handle type="source" position={Position.Right} className="!bg-brand-500 !border-0" />
  </div>
);

const ProviderNode = ({ data }: { data: any }) => {
  const s = statusStyles[data.status as Status] || statusStyles.healthy;
  return (
    <div className="group">
      <Handle type="target" position={Position.Left} className="!bg-slate-400 !border-0" />
      <div
        className={`min-w-[140px] rounded-lg border bg-white dark:bg-slate-900 px-3 py-2.5 shadow-sm transition-all ${s.border}`}
      >
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-md bg-white flex items-center justify-center border border-slate-200 dark:border-slate-600">
            <Icon icon={data.icon} className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
            {data.label}
          </span>
        </div>
        <div className={`inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider ${s.text}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${s.dot} ${data.status === "healthy" ? "animate-pulse" : ""}`}></span>
          {data.status}
        </div>
      </div>
      <Handle type="source" position={Position.Right} className="!bg-slate-400 !border-0" />
    </div>
  );
};

const CircuitBreakerNode = ({ data }: { data: any }) => (
  <div>
    <Handle type="target" position={Position.Left} className="!bg-red-500 !border-0" />
    <div
      className={`min-w-[140px] rounded-lg border border-dashed px-3 py-2.5 bg-white dark:bg-slate-900 ${
        data.active
          ? "border-red-500/60 dark:border-red-400/60"
          : "border-slate-300 dark:border-slate-700"
      }`}
    >
      <div className="flex items-center gap-2 mb-1">
        <Icon
          icon="solar:shield-warning-bold-duotone"
          className={`w-4 h-4 ${data.active ? "text-red-500" : "text-slate-400"}`}
        />
        <span className="text-xs font-bold text-slate-900 dark:text-white">
          {data.label}
        </span>
      </div>
      <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {data.active ? "tripped · cooling down" : "closed · armed"}
      </div>
    </div>
  </div>
);

const nodeTypes = {
  request: RequestNode,
  gateway: GatewayNode,
  provider: ProviderNode,
  circuitBreaker: CircuitBreakerNode,
};

// ───────────── Graph ─────────────

const initialNodes: Node[] = [
  {
    id: "1",
    type: "request",
    position: { x: 20, y: 200 },
    data: { label: "Client Request", icon: "solar:programming-bold-duotone" },
    sourcePosition: Position.Right,
  },
  {
    id: "2",
    type: "gateway",
    position: { x: 200, y: 188 },
    data: { label: "pLLM" },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "3",
    type: "provider",
    position: { x: 460, y: 70 },
    data: { label: "OpenAI", icon: "logos:openai-icon", status: "healthy" },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
  },
  {
    id: "4",
    type: "provider",
    position: { x: 460, y: 160 },
    data: { label: "Anthropic", icon: "logos:anthropic-icon", status: "healthy" },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
  },
  {
    id: "5",
    type: "provider",
    position: { x: 460, y: 250 },
    data: { label: "Google Vertex", icon: "logos:google-cloud", status: "healthy" },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
  },
  {
    id: "6",
    type: "circuitBreaker",
    position: { x: 460, y: 340 },
    data: { label: "Circuit Breaker", active: false },
    targetPosition: Position.Left,
  },
  {
    id: "7",
    type: "request",
    position: { x: 720, y: 200 },
    data: { label: "Response", icon: "solar:check-circle-bold-duotone" },
    targetPosition: Position.Left,
  },
];

const BRAND = "#14b8a6"; // brand-500
const AMBER = "#f59e0b";
const SLATE = "#94a3b8";
const RED = "#ef4444";

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
    style: { stroke: BRAND, strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: BRAND },
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    animated: true,
    style: { stroke: BRAND, strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: BRAND },
  },
  {
    id: "e2-4",
    source: "2",
    target: "4",
    style: { stroke: SLATE, strokeWidth: 1.5, strokeDasharray: "5,5" },
    markerEnd: { type: MarkerType.ArrowClosed, color: SLATE },
  },
  {
    id: "e2-5",
    source: "2",
    target: "5",
    style: { stroke: SLATE, strokeWidth: 1.5, strokeDasharray: "5,5" },
    markerEnd: { type: MarkerType.ArrowClosed, color: SLATE },
  },
  {
    id: "e2-6",
    source: "2",
    target: "6",
    style: { stroke: SLATE, strokeWidth: 1, strokeDasharray: "3,3" },
    markerEnd: { type: MarkerType.ArrowClosed, color: SLATE },
  },
  {
    id: "e3-7",
    source: "3",
    target: "7",
    animated: true,
    style: { stroke: BRAND, strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: BRAND },
  },
  {
    id: "e4-7",
    source: "4",
    target: "7",
    style: { stroke: SLATE, strokeWidth: 1.5 },
    markerEnd: { type: MarkerType.ArrowClosed, color: SLATE },
  },
  {
    id: "e5-7",
    source: "5",
    target: "7",
    style: { stroke: SLATE, strokeWidth: 1.5 },
    markerEnd: { type: MarkerType.ArrowClosed, color: SLATE },
  },
];

// ───────────── Theme hook ─────────────

function useDarkMode() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const update = () => setDark(document.documentElement.classList.contains("dark"));
    update();
    const mo = new MutationObserver(update);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);
  return dark;
}

// ───────────── Main component ─────────────

const InteractiveFlowDiagram: React.FC = () => {
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);
  const [mode, setMode] = useState<Status>("healthy");
  const dark = useDarkMode();

  useEffect(() => {
    setNodes((prev) =>
      prev.map((n) => {
        if (n.type === "provider") {
          let status: Status = "healthy";
          if (mode === "degraded" && n.id === "3") status = "degraded";
          else if (mode === "failed" && (n.id === "3" || n.id === "4")) status = "failed";
          return { ...n, data: { ...n.data, status } };
        }
        if (n.type === "circuitBreaker") {
          return { ...n, data: { ...n.data, active: mode === "failed" } };
        }
        return n;
      })
    );

    setEdges((prev) =>
      prev.map((edge) => {
        const activePrimary =
          (mode === "healthy" && ["e1-2", "e2-3", "e3-7"].includes(edge.id)) ||
          (mode === "degraded" && ["e1-2", "e2-4", "e4-7"].includes(edge.id)) ||
          (mode === "failed" && ["e1-2", "e2-5", "e5-7"].includes(edge.id));

        return {
          ...edge,
          animated: activePrimary,
          style: {
            ...edge.style,
            stroke: activePrimary
              ? BRAND
              : mode === "failed" && edge.id.startsWith("e2-6")
                ? RED
                : SLATE,
            strokeWidth: activePrimary ? 2.5 : edge.style?.strokeWidth || 1.5,
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: activePrimary ? BRAND : SLATE,
          },
        };
      })
    );
  }, [mode, setNodes, setEdges]);

  useEffect(() => {
    const id = setInterval(() => {
      setMode((c) => (c === "healthy" ? "degraded" : c === "degraded" ? "failed" : "healthy"));
    }, 3500);
    return () => clearInterval(id);
  }, []);

  const noop: OnConnect = useCallback((p) => setEdges((eds) => addEdge(p, eds)), [setEdges]);

  const modeStyles: Record<Status, string> = {
    healthy: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/40",
    degraded: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/40",
    failed: "bg-red-500/15 text-red-700 dark:text-red-300 border-red-500/40",
  };

  return (
    <div className="w-full h-[560px] rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 overflow-hidden relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={() => {}}
        onEdgesChange={() => {}}
        onConnect={noop}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        panOnScroll={false}
        panOnDrag={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background color={dark ? "#334155" : "#cbd5e1"} gap={24} size={1.2} />
      </ReactFlow>

      {/* Simulation control — top-left */}
      <div className="absolute top-4 left-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-3 backdrop-blur">
        <div className="text-[10px] font-mono tracking-wider uppercase text-slate-500 dark:text-slate-400 mb-2">
          Simulation Mode
        </div>
        <div className="flex gap-1.5">
          {(["healthy", "degraded", "failed"] as Status[]).map((m) => {
            const active = mode === m;
            return (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border transition-all capitalize ${
                  active
                    ? modeStyles[m]
                    : "bg-transparent text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {m}
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend — bottom-right */}
      <div className="absolute bottom-4 right-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-3 backdrop-blur">
        <div className="text-[10px] font-mono tracking-wider uppercase text-slate-500 dark:text-slate-400 mb-2">
          Legend
        </div>
        <div className="space-y-1">
          {(
            [
              { label: "primary route", color: "bg-brand-500", dashed: false },
              { label: "fallback", color: "bg-slate-400", dashed: true },
              { label: "circuit", color: "bg-red-500", dashed: true },
            ] as const
          ).map((l) => (
            <div key={l.label} className="flex items-center gap-2">
              <span
                className={`inline-block w-5 h-0.5 ${l.color} ${l.dashed ? "opacity-60" : ""}`}
                style={l.dashed ? { backgroundImage: "linear-gradient(90deg, currentColor 50%, transparent 50%)", backgroundSize: "4px 1px", backgroundRepeat: "repeat-x" } : undefined}
              ></span>
              <span className="text-[11px] text-slate-600 dark:text-slate-400">
                {l.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractiveFlowDiagram;
