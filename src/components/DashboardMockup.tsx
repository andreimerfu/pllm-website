import { Icon } from "@iconify/react";

const sidebarItems = [
  { icon: "solar:routing-2-bold-duotone", label: "Routes", active: true },
  { icon: "solar:box-bold-duotone", label: "Models", active: false },
  { icon: "solar:key-bold-duotone", label: "API Keys", active: false },
  { icon: "solar:users-group-rounded-bold-duotone", label: "Teams", active: false },
  { icon: "solar:shield-check-bold-duotone", label: "Guardrails", active: false },
  { icon: "solar:monitor-smartphone-bold-duotone", label: "Monitor", active: false },
];

const modelCards = [
  { name: "GPT-4o", weight: "60%", healthy: true, provider: "OpenAI" },
  { name: "Claude 3.5", weight: "30%", healthy: true, provider: "Anthropic" },
  { name: "Gemini Pro", weight: "10%", healthy: false, provider: "Google" },
];

const fallbackChain = ["GPT-4o", "Claude 3.5", "Gemini Pro"];

const stats = [
  { label: "Requests Today", value: "12,847" },
  { label: "Avg Latency", value: "142ms" },
  { label: "Active Models", value: "5/6" },
];

export default function DashboardMockup() {
  return (
    <div className="w-full rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-800 shadow-lg">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <span className="ml-2 text-xs font-medium text-slate-500 dark:text-slate-400">
          pLLM Dashboard
        </span>
      </div>

      {/* Body */}
      <div className="flex min-h-[360px] sm:min-h-[420px]">
        {/* Sidebar */}
        <div className="hidden md:flex flex-col border-r border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 py-3">
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              className={`flex items-center gap-3 px-3 lg:px-5 py-2.5 text-sm font-medium transition-colors ${
                item.active
                  ? "text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/20 border-r-2 border-r-brand-500"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              <Icon icon={item.icon} width={20} height={20} />
              <span className="hidden lg:inline">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 p-4 sm:p-6 overflow-hidden">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 mb-4">
            <span>Routes</span>
            <span>/</span>
            <span className="text-slate-700 dark:text-slate-300 font-medium">Smart Route</span>
          </div>

          {/* Route header */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Smart Route
            </h3>
            <span className="text-xs font-mono bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 px-2 py-0.5 rounded">
              least-latency
            </span>
            <span className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              Active
            </span>
          </div>

          {/* Model cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            {modelCards.map((model) => (
              <div
                key={model.name}
                className="rounded-lg border border-slate-200 dark:border-slate-700 p-3 bg-white dark:bg-slate-800"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">
                    {model.name}
                  </span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      model.healthy ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                  {model.provider}
                </div>
                <div className="text-xs font-mono text-slate-600 dark:text-slate-300">
                  Weight: {model.weight}
                </div>
              </div>
            ))}
          </div>

          {/* Fallback chain */}
          <div className="mb-6">
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
              Fallback Chain
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {fallbackChain.map((name, i) => (
                <span key={name} className="flex items-center gap-2">
                  <span className="text-xs font-mono bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded">
                    {name}
                  </span>
                  {i < fallbackChain.length - 1 && (
                    <Icon
                      icon="solar:arrow-right-linear"
                      width={14}
                      height={14}
                      className="text-slate-400 dark:text-slate-500"
                    />
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-3 gap-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-3">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
