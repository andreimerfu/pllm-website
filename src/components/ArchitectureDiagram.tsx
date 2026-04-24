import React from "react";
import { Icon } from "@iconify/react";

interface Consumer {
  name: string;
  sub: string;
  icon: string;
}

interface Resource {
  name: string;
  icon: string;
  status?: "healthy" | "degraded" | "failed";
  uptime?: string;
}

interface CoreLayer {
  name: string;
  icon: string;
  note: string;
}

const consumers: Consumer[] = [
  { name: "IDE agents", sub: "Cursor · Zed · Continue", icon: "solar:code-square-bold-duotone" },
  { name: "Chat clients", sub: "Internal ChatGPT · Teams", icon: "solar:chat-round-dots-bold-duotone" },
  { name: "Backend apps", sub: "Python · Node.js · Go", icon: "solar:programming-bold-duotone" },
  { name: "Autonomous agents", sub: "LangGraph · CrewAI", icon: "solar:bolt-circle-bold-duotone" },
];

const coreLayers: CoreLayer[] = [
  { name: "Auth", icon: "solar:shield-user-bold-duotone", note: "SSO · group sync" },
  { name: "Policy", icon: "solar:shield-keyhole-bold-duotone", note: "AD-group RBAC" },
  { name: "Registry", icon: "solar:widget-bold-duotone", note: "agents · skills · prompts" },
  { name: "Router", icon: "solar:routing-2-bold-duotone", note: "latency-aware" },
  { name: "Guardrails", icon: "solar:shield-check-bold-duotone", note: "PII · injection · moderation" },
  { name: "Audit", icon: "solar:document-text-bold-duotone", note: "every call logged" },
];

const llmProviders: Resource[] = [
  { name: "OpenAI", icon: "logos:openai-icon", status: "healthy", uptime: "99.9%" },
  { name: "Anthropic", icon: "logos:anthropic-icon", status: "healthy", uptime: "99.9%" },
  { name: "Azure OpenAI", icon: "logos:microsoft-azure", status: "degraded", uptime: "92.1%" },
  { name: "AWS Bedrock", icon: "logos:aws", status: "healthy", uptime: "99.8%" },
  { name: "Google Vertex", icon: "logos:google-cloud", status: "healthy", uptime: "99.7%" },
  { name: "Meta Llama", icon: "logos:meta-icon", status: "healthy", uptime: "99.6%" },
];

const mcpServers: Resource[] = [
  { name: "GitHub", icon: "logos:github-icon", status: "healthy" },
  { name: "Jira", icon: "logos:jira", status: "healthy" },
  { name: "Snowflake", icon: "logos:snowflake-icon", status: "degraded" },
  { name: "PostgreSQL", icon: "logos:postgresql", status: "healthy" },
];

const idProviders: Resource[] = [
  { name: "Entra ID", icon: "logos:microsoft-icon" },
  { name: "Okta", icon: "logos:okta-icon" },
  { name: "Active Directory", icon: "solar:server-square-bold-duotone" },
];

const statusDot: Record<string, string> = {
  healthy: "bg-emerald-500",
  degraded: "bg-amber-500",
  failed: "bg-red-500",
};

const ArchitectureDiagram: React.FC = () => {
  return (
    <div className="relative w-full max-w-7xl mx-auto">
      {/* Background panel */}
      <div className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 p-6 sm:p-10 overflow-hidden">
        {/* Grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.1]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Glow */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full bg-brand-500/10 dark:bg-brand-500/20 blur-[100px]" />

        <div className="relative">
          {/* Label row */}
          <div className="grid grid-cols-3 gap-4 lg:gap-8 mb-8">
            <div>
              <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-slate-500 dark:text-slate-400 mb-1">
                01 · Consumers
              </div>
              <div className="h-px bg-gradient-to-r from-slate-300 to-transparent dark:from-slate-700"></div>
            </div>
            <div className="text-center">
              <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-brand-600 dark:text-brand-400 mb-1">
                02 · pLLM Control Plane
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent"></div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-slate-500 dark:text-slate-400 mb-1">
                03 · Managed Resources
              </div>
              <div className="h-px bg-gradient-to-l from-slate-300 to-transparent dark:from-slate-700 ml-auto"></div>
            </div>
          </div>

          {/* Main grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-10 items-start">
            {/* Consumers column */}
            <div className="space-y-2.5">
              {consumers.map((c) => (
                <div
                  key={c.name}
                  className="group relative flex items-center gap-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-3 hover:border-brand-500/50 dark:hover:border-brand-400/50 transition-colors"
                >
                  <div className="w-9 h-9 rounded-md bg-slate-50 dark:bg-slate-800/80 flex items-center justify-center flex-shrink-0 border border-slate-200/70 dark:border-slate-700/70">
                    <Icon icon={c.icon} className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                      {c.name}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate">
                      {c.sub}
                    </div>
                  </div>
                  {/* Connector dot → on wide screens */}
                  <span className="hidden lg:block absolute -right-5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-500/40 group-hover:bg-brand-500 transition-colors"></span>
                </div>
              ))}
            </div>

            {/* Center: pLLM core */}
            <div className="relative lg:w-[280px]">
              {/* Outer glow ring */}
              <div className="absolute inset-0 -m-2 rounded-2xl bg-gradient-to-b from-brand-500/10 via-brand-500/5 to-accent-500/10 blur-xl"></div>

              <div className="relative rounded-xl border-2 border-brand-500/40 dark:border-brand-400/40 bg-white dark:bg-slate-900 shadow-xl overflow-hidden">
                {/* Header */}
                <div className="relative bg-gradient-to-b from-brand-500/5 to-transparent dark:from-brand-500/15 border-b border-brand-500/20 dark:border-brand-400/20 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src="/robot.png"
                      alt="pLLM"
                      className="w-9 h-9 rounded-lg flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="font-bold text-slate-900 dark:text-white">
                        pLLM
                      </div>
                      <div className="text-[10px] font-mono tracking-wider uppercase text-brand-600 dark:text-brand-400">
                        single Go binary
                      </div>
                    </div>
                    <span className="ml-auto flex items-center gap-1 text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      live
                    </span>
                  </div>
                </div>

                {/* Core layers stack */}
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {coreLayers.map((layer, i) => (
                    <div
                      key={layer.name}
                      className="flex items-center gap-3 px-5 py-3 hover:bg-brand-500/[0.03] dark:hover:bg-brand-500/[0.08] transition-colors"
                    >
                      <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 tabular-nums w-4">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <Icon
                        icon={layer.icon}
                        className="w-4 h-4 text-brand-600 dark:text-brand-400 flex-shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-semibold text-slate-900 dark:text-white">
                          {layer.name}
                        </div>
                        <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 truncate">
                          {layer.note}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer metrics */}
                <div className="bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 px-5 py-3 grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">
                      &lt;1ms
                    </div>
                    <div className="text-[9px] font-mono tracking-wider uppercase text-slate-500 dark:text-slate-400">
                      overhead
                    </div>
                  </div>
                  <div className="border-x border-slate-200 dark:border-slate-700">
                    <div className="text-sm font-bold text-slate-900 dark:text-white">
                      12k+
                    </div>
                    <div className="text-[9px] font-mono tracking-wider uppercase text-slate-500 dark:text-slate-400">
                      rps / node
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">
                      65MB
                    </div>
                    <div className="text-[9px] font-mono tracking-wider uppercase text-slate-500 dark:text-slate-400">
                      memory
                    </div>
                  </div>
                </div>
              </div>

              {/* Left/right connector dots for wide screens */}
              <span className="hidden lg:block absolute top-1/2 -left-3 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-brand-500 shadow-[0_0_12px_rgba(20,184,166,0.6)]"></span>
              <span className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-brand-500 shadow-[0_0_12px_rgba(20,184,166,0.6)]"></span>
            </div>

            {/* Managed resources column */}
            <div className="space-y-6">
              {/* LLM providers */}
              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
                  <span className="text-[10px] font-mono tracking-wider uppercase text-slate-600 dark:text-slate-300">
                    LLM providers
                  </span>
                  <span className="ml-auto text-[10px] font-mono text-slate-400 dark:text-slate-500">
                    {llmProviders.length}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {llmProviders.map((p) => (
                    <div
                      key={p.name}
                      className="group flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-2.5 py-2 hover:border-brand-500/50 dark:hover:border-brand-400/50 transition-colors relative"
                    >
                      {/* Connector dot ← */}
                      <span className="hidden lg:block absolute -left-5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-500/40 group-hover:bg-brand-500 transition-colors"></span>
                      <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center flex-shrink-0 border border-slate-200 dark:border-slate-600">
                        <Icon icon={p.icon} className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                          {p.name}
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${statusDot[p.status || "healthy"]}`}
                          ></span>
                          <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                            {p.uptime}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* MCP servers */}
              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-500"></span>
                  <span className="text-[10px] font-mono tracking-wider uppercase text-slate-600 dark:text-slate-300">
                    MCP servers
                  </span>
                  <span className="ml-auto text-[10px] font-mono text-slate-400 dark:text-slate-500">
                    {mcpServers.length}+
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {mcpServers.map((p) => (
                    <div
                      key={p.name}
                      className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-2.5 py-2 hover:border-accent-500/50 dark:hover:border-accent-400/50 transition-colors"
                    >
                      <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center flex-shrink-0 border border-slate-200 dark:border-slate-600">
                        <Icon icon={p.icon} className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                          {p.name}
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${statusDot[p.status || "healthy"]}`}
                          ></span>
                          <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 capitalize">
                            {p.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Identity providers */}
              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  <span className="text-[10px] font-mono tracking-wider uppercase text-slate-600 dark:text-slate-300">
                    Identity
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {idProviders.map((p) => (
                    <div
                      key={p.name}
                      className="flex items-center gap-1.5 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 pl-1.5 pr-2 py-1"
                    >
                      <div className="w-5 h-5 rounded bg-white flex items-center justify-center border border-slate-200 dark:border-slate-600">
                        <Icon
                          icon={p.icon}
                          className="w-3 h-3 text-slate-700"
                        />
                      </div>
                      <span className="text-[11px] font-mono text-slate-700 dark:text-slate-300">
                        {p.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom control-plane bar */}
          <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Icon
                  icon="solar:cpu-bolt-bold-duotone"
                  className="w-4 h-4 text-brand-500"
                />
                <span className="text-xs font-mono text-slate-600 dark:text-slate-400">
                  single control plane · zero sidecars · zero python runtime
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  healthy
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  degraded
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                  failed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureDiagram;
