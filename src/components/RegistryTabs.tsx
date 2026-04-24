import React, { useState } from "react";
import { Icon } from "@iconify/react";

type RegistryKind = "agents" | "skills" | "prompts";

interface AgentItem {
  name: string;
  slug: string;
  version: string;
  description: string;
  tools: string[];
  owner: string;
  scope: string;
  status: "stable" | "beta" | "deprecated";
  runs: string;
}

interface SkillItem {
  name: string;
  slug: string;
  version: string;
  description: string;
  triggers: string[];
  owner: string;
  scope: string;
  status: "stable" | "beta" | "deprecated";
}

interface PromptItem {
  name: string;
  slug: string;
  version: string;
  description: string;
  model: string;
  tokens: string;
  owner: string;
  scope: string;
  status: "stable" | "beta" | "deprecated";
}

const agents: AgentItem[] = [
  {
    name: "Support Triage",
    slug: "agents/support-triage",
    version: "v1.4.2",
    description:
      "Classifies incoming tickets, assigns severity, and routes to the right engineering queue using MCP-connected ticketing.",
    tools: ["jira-mcp", "github-mcp", "internal-rag"],
    owner: "support-platform",
    scope: "ad:Support-Agents",
    status: "stable",
    runs: "12.4k / wk",
  },
  {
    name: "SQL Analyst",
    slug: "agents/sql-analyst",
    version: "v2.0.0",
    description:
      "Translates natural language into safe, policy-checked SQL. Guardrails block destructive ops; PII columns are auto-masked.",
    tools: ["snowflake-mcp", "presidio-guardrail"],
    owner: "data-platform",
    scope: "ad:Analysts, ad:Data-Eng",
    status: "stable",
    runs: "3.1k / wk",
  },
  {
    name: "Release Captain",
    slug: "agents/release-captain",
    version: "v0.9.1",
    description:
      "Drafts changelogs, checks CI, and files a release PR. Read-only in repos outside the caller's team scope.",
    tools: ["github-mcp", "slack-mcp"],
    owner: "platform-eng",
    scope: "ad:Engineering-Leads",
    status: "beta",
    runs: "412 / wk",
  },
  {
    name: "Finance Bot",
    slug: "agents/finance-bot",
    version: "v0.3.0",
    description:
      "Answers expense questions, pulls SAP records, and flags outliers. Strict per-group data scoping.",
    tools: ["sap-mcp", "internal-rag"],
    owner: "finance-eng",
    scope: "ad:Finance-Ops",
    status: "beta",
    runs: "184 / wk",
  },
];

const skills: SkillItem[] = [
  {
    name: "Summarize Document",
    slug: "skills/summarize-document",
    version: "v3.2.0",
    description:
      "Chunks, summarizes, and extracts key facts from documents up to 1M tokens with configurable output style.",
    triggers: ["docs", "pdf", "summarize"],
    owner: "ai-platform",
    scope: "ad:All-Employees",
    status: "stable",
  },
  {
    name: "Policy Reviewer",
    slug: "skills/policy-reviewer",
    version: "v1.1.0",
    description:
      "Reads contracts & internal policies, highlights risky clauses, and cites the org handbook via RAG.",
    triggers: ["contracts", "policy review", "legal"],
    owner: "legal-eng",
    scope: "ad:Legal-Team",
    status: "stable",
  },
  {
    name: "Code Reviewer",
    slug: "skills/code-reviewer",
    version: "v2.4.1",
    description:
      "Reviews diffs for security, style, and logic issues. Integrates with github-mcp for inline comments.",
    triggers: ["code review", "pr", "diff"],
    owner: "platform-eng",
    scope: "ad:Engineers",
    status: "stable",
  },
  {
    name: "Meeting Notes",
    slug: "skills/meeting-notes",
    version: "v0.8.0",
    description:
      "Turns transcripts into structured notes, action items, and calendar follow-ups. PII is redacted by default.",
    triggers: ["transcript", "meeting", "notes"],
    owner: "productivity",
    scope: "ad:All-Employees",
    status: "beta",
  },
];

const prompts: PromptItem[] = [
  {
    name: "Customer Reply — Formal",
    slug: "prompts/customer-reply-formal",
    version: "v4.1.0",
    description:
      "Brand-aligned formal reply template with tone controls, signature injection, and compliance disclaimers.",
    model: "claude-4.6-sonnet",
    tokens: "~420",
    owner: "support-platform",
    scope: "ad:Support-Agents",
    status: "stable",
  },
  {
    name: "Incident Retro",
    slug: "prompts/incident-retro",
    version: "v2.0.0",
    description:
      "Structured incident retrospective generator. Pulls timeline from logs-mcp, outputs markdown RCA.",
    model: "gpt-5",
    tokens: "~980",
    owner: "sre",
    scope: "ad:SRE",
    status: "stable",
  },
  {
    name: "Product Spec Draft",
    slug: "prompts/product-spec",
    version: "v1.3.0",
    description:
      "Generates a v0 PRD from a problem statement, constraints, and target users. Tied to org writing style.",
    model: "claude-4.6-opus",
    tokens: "~1.2k",
    owner: "product",
    scope: "ad:Product",
    status: "stable",
  },
  {
    name: "Onboarding Email",
    slug: "prompts/onboarding-email",
    version: "v0.5.0",
    description:
      "New-hire welcome email — personalized per role, team, and start date. Data pulled via hris-mcp.",
    model: "gpt-4.1-mini",
    tokens: "~260",
    owner: "people-ops",
    scope: "ad:HR",
    status: "beta",
  },
];

const tabs: { key: RegistryKind; label: string; icon: string; count: string; description: string }[] = [
  {
    key: "agents",
    label: "Agents",
    icon: "solar:robot-bold-duotone",
    count: "47",
    description:
      "Multi-step workers with tool access. Each agent has a manifest: prompt, tools, scope, and guardrail bindings.",
  },
  {
    key: "skills",
    label: "Skills",
    icon: "solar:magic-stick-3-bold-duotone",
    count: "132",
    description:
      "Reusable capabilities the gateway can compose. Triggered by intent, routed by policy, versioned like code.",
  },
  {
    key: "prompts",
    label: "Prompts",
    icon: "solar:document-text-bold-duotone",
    count: "389",
    description:
      "Versioned prompt templates with variables, model binding, and rollout controls. Shared across teams.",
  },
];

const statusStyles: Record<string, string> = {
  stable: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
  beta: "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30",
  deprecated: "bg-slate-500/15 text-slate-600 dark:text-slate-400 border-slate-500/30",
};

const statusDot: Record<string, string> = {
  stable: "bg-emerald-500",
  beta: "bg-amber-500",
  deprecated: "bg-slate-400",
};

const RegistryTabs: React.FC = () => {
  const [active, setActive] = useState<RegistryKind>("agents");

  const activeTab = tabs.find((t) => t.key === active)!;

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900">
      {/* Tab bar */}
      <div className="flex flex-col sm:flex-row border-b border-slate-200 dark:border-slate-800">
        {tabs.map((tab) => {
          const isActive = active === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`flex-1 group relative flex items-center justify-between gap-3 px-6 py-5 text-left transition-colors ${
                isActive
                  ? "bg-slate-50 dark:bg-slate-800/60"
                  : "hover:bg-slate-50/50 dark:hover:bg-slate-800/30"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                    isActive
                      ? "bg-brand-500/15 text-brand-600 dark:text-brand-400"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  <Icon icon={tab.icon} width={20} height={20} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-bold ${
                        isActive
                          ? "text-slate-900 dark:text-white"
                          : "text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {tab.label}
                    </span>
                    <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-slate-200/60 dark:bg-slate-700 text-slate-600 dark:text-slate-400">
                      {tab.count}
                    </span>
                  </div>
                  <div className="hidden sm:block text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
                    registry / {tab.key}
                  </div>
                </div>
              </div>
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500"></div>
              )}
            </button>
          );
        })}
      </div>

      {/* Description bar */}
      <div className="px-6 py-4 bg-slate-50/60 dark:bg-slate-800/30 border-b border-slate-200 dark:border-slate-800">
        <p className="text-sm text-slate-600 dark:text-slate-400">{activeTab.description}</p>
      </div>

      {/* Content */}
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {active === "agents" &&
          agents.map((a) => (
            <div
              key={a.slug}
              className="px-6 py-5 hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-3 flex-wrap mb-1">
                    <h4 className="font-bold text-slate-900 dark:text-white">{a.name}</h4>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {a.version}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusStyles[a.status]}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${statusDot[a.status]}`}></span>
                      {a.status}
                    </span>
                  </div>
                  <div className="font-mono text-xs text-slate-500 dark:text-slate-400">{a.slug}</div>
                </div>
                <div className="text-right text-xs font-mono text-slate-500 dark:text-slate-400 whitespace-nowrap">
                  <div className="text-slate-700 dark:text-slate-300 font-semibold">{a.runs}</div>
                  <div>runs</div>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                {a.description}
              </p>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-brand-500/10 text-brand-700 dark:text-brand-300 font-mono">
                  <Icon icon="solar:users-group-rounded-bold-duotone" width={12} height={12} />
                  {a.scope}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono">
                  <Icon icon="solar:user-id-bold-duotone" width={12} height={12} />
                  {a.owner}
                </span>
                <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
                <span className="text-slate-500 dark:text-slate-400 font-mono">tools:</span>
                {a.tools.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}

        {active === "skills" &&
          skills.map((s) => (
            <div
              key={s.slug}
              className="px-6 py-5 hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-3 flex-wrap mb-1">
                    <h4 className="font-bold text-slate-900 dark:text-white">{s.name}</h4>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {s.version}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusStyles[s.status]}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${statusDot[s.status]}`}></span>
                      {s.status}
                    </span>
                  </div>
                  <div className="font-mono text-xs text-slate-500 dark:text-slate-400">{s.slug}</div>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                {s.description}
              </p>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-brand-500/10 text-brand-700 dark:text-brand-300 font-mono">
                  <Icon icon="solar:users-group-rounded-bold-duotone" width={12} height={12} />
                  {s.scope}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono">
                  <Icon icon="solar:user-id-bold-duotone" width={12} height={12} />
                  {s.owner}
                </span>
                <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
                <span className="text-slate-500 dark:text-slate-400 font-mono">triggers:</span>
                {s.triggers.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          ))}

        {active === "prompts" &&
          prompts.map((p) => (
            <div
              key={p.slug}
              className="px-6 py-5 hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-3 flex-wrap mb-1">
                    <h4 className="font-bold text-slate-900 dark:text-white">{p.name}</h4>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {p.version}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusStyles[p.status]}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${statusDot[p.status]}`}></span>
                      {p.status}
                    </span>
                  </div>
                  <div className="font-mono text-xs text-slate-500 dark:text-slate-400">{p.slug}</div>
                </div>
                <div className="text-right text-xs font-mono text-slate-500 dark:text-slate-400 whitespace-nowrap">
                  <div className="text-slate-700 dark:text-slate-300 font-semibold">{p.tokens}</div>
                  <div>tokens</div>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                {p.description}
              </p>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-brand-500/10 text-brand-700 dark:text-brand-300 font-mono">
                  <Icon icon="solar:users-group-rounded-bold-duotone" width={12} height={12} />
                  {p.scope}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono">
                  <Icon icon="solar:user-id-bold-duotone" width={12} height={12} />
                  {p.owner}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono">
                  <Icon icon="solar:cpu-bolt-bold-duotone" width={12} height={12} />
                  {p.model}
                </span>
              </div>
            </div>
          ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 px-6 py-3 text-xs font-mono text-slate-500 dark:text-slate-400">
        <span>
          showing 4 of {activeTab.count} {activeTab.label.toLowerCase()}
        </span>
        <span className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">
          browse full registry
          <Icon icon="solar:arrow-right-bold-duotone" width={12} height={12} />
        </span>
      </div>
    </div>
  );
};

export default RegistryTabs;
