import React, { useState } from "react";
import { Icon } from "@iconify/react";
import CodeBlock from "./CodeBlock";

type DeployKey = "helm" | "docker" | "binary";
type SdkKey = "python" | "node" | "curl";

interface DeployOption {
  key: DeployKey;
  label: string;
  icon: string;
  time: string;
  tagline: string;
  code: string;
}

interface SdkExample {
  key: SdkKey;
  label: string;
  icon: string;
  lang: string;
  code: string;
}

const deployments: DeployOption[] = [
  {
    key: "helm",
    label: "Kubernetes",
    icon: "logos:kubernetes",
    time: "~5 min",
    tagline: "Production-ready with auto-scaling and HA",
    code: `# Add the pLLM Helm repository
helm repo add pllm https://andreimerfu.github.io/pllm
helm repo update

# Install with your secrets
helm install pllm pllm/pllm \\
  --set pllm.secrets.jwtSecret="$(openssl rand -hex 32)" \\
  --set pllm.secrets.masterKey="sk-master-$(openssl rand -hex 16)" \\
  --set pllm.secrets.openaiApiKey="sk-..."

# Verify
kubectl get pods -l app.kubernetes.io/name=pllm`,
  },
  {
    key: "docker",
    label: "Docker Compose",
    icon: "logos:docker-icon",
    time: "~2 min",
    tagline: "Ideal for local development and trials",
    code: `# Clone and configure
git clone https://github.com/andreimerfu/pllm.git
cd pllm && cp .env.example .env

# Drop in your keys
echo "OPENAI_API_KEY=sk-..." >> .env

# Bring it up
docker compose up -d

# Smoke test
curl http://localhost:8080/v1/models`,
  },
  {
    key: "binary",
    label: "Binary",
    icon: "solar:download-square-bold-duotone",
    time: "~30 sec",
    tagline: "Single static Go binary — no deps, no runtime",
    code: `# Grab the latest release for your platform
curl -LO https://github.com/andreimerfu/pllm/releases/latest/download/pllm-linux-amd64
chmod +x pllm-linux-amd64

# Configure via env
export JWT_SECRET=$(openssl rand -hex 32)
export MASTER_KEY=sk-master-$(openssl rand -hex 16)
export OPENAI_API_KEY=sk-...

# Run
./pllm-linux-amd64 server`,
  },
];

const sdkExamples: SdkExample[] = [
  {
    key: "python",
    label: "Python",
    icon: "logos:python",
    lang: "python",
    code: `from openai import OpenAI

# Same SDK. Just flip the base_url.
client = OpenAI(
    api_key="sk-...",
    base_url="https://pllm.company.com/v1"
)

response = client.chat.completions.create(
    model="smart",                         # pLLM route — picks the best model
    messages=[{"role": "user", "content": "Hello"}],
)`,
  },
  {
    key: "node",
    label: "Node.js",
    icon: "logos:nodejs-icon",
    lang: "javascript",
    code: `import OpenAI from "openai";

// Same SDK. Just flip the baseURL.
const openai = new OpenAI({
  apiKey: "sk-...",
  baseURL: "https://pllm.company.com/v1",
});

const res = await openai.chat.completions.create({
  model: "smart",                          // pLLM route
  messages: [{ role: "user", content: "Hello" }],
});`,
  },
  {
    key: "curl",
    label: "cURL",
    icon: "simple-icons:curl",
    lang: "bash",
    code: `curl https://pllm.company.com/v1/chat/completions \\
  -H "Authorization: Bearer sk-..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "smart",
    "messages": [{"role": "user", "content": "Hello"}]
  }'`,
  },
];

const Terminal = ({ code, lang }: { code: string; lang: string }) => (
  <CodeBlock code={code} language={lang} />
);

const QuickStartTabs: React.FC = () => {
  const [deploy, setDeploy] = useState<DeployKey>("docker");
  const [sdk, setSdk] = useState<SdkKey>("python");

  const activeDeploy = deployments.find((d) => d.key === deploy)!;
  const activeSdk = sdkExamples.find((s) => s.key === sdk)!;

  return (
    <div className="space-y-14">
      {/* Deployment panel */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 sm:px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-brand-500/15 text-brand-600 dark:text-brand-400 flex items-center justify-center">
              <Icon icon="solar:rocket-bold-duotone" width={18} height={18} />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">Step 1 — Deploy pLLM</div>
              <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
                {activeDeploy.time} · {activeDeploy.tagline}
              </div>
            </div>
          </div>

          {/* Segmented tabs */}
          <div
            role="tablist"
            className="inline-flex p-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700"
          >
            {deployments.map((d) => {
              const active = deploy === d.key;
              return (
                <button
                  key={d.key}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setDeploy(d.key)}
                  className={`relative inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                    active
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <Icon icon={d.icon} width={14} height={14} />
                  {d.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <Terminal code={activeDeploy.code} lang="bash" />
        </div>
      </div>

      {/* SDK panel */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 sm:px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-accent-500/15 text-accent-600 dark:text-accent-400 flex items-center justify-center">
              <Icon icon="solar:code-bold-duotone" width={18} height={18} />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">Step 2 — Point your app at pLLM</div>
              <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
                100% OpenAI compatible · change one line
              </div>
            </div>
          </div>

          {/* Segmented tabs */}
          <div
            role="tablist"
            className="inline-flex p-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700"
          >
            {sdkExamples.map((s) => {
              const active = sdk === s.key;
              return (
                <button
                  key={s.key}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSdk(s.key)}
                  className={`relative inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                    active
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <Icon icon={s.icon} width={14} height={14} />
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <Terminal code={activeSdk.code} lang={activeSdk.lang} />
        </div>

        {/* response preview */}
        <div className="px-5 sm:px-6 pb-6">
          <div className="rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/30 p-4">
            <div className="flex items-center gap-2 mb-2 text-xs font-mono tracking-wider uppercase text-slate-500 dark:text-slate-400">
              <Icon icon="solar:arrow-down-bold-duotone" width={12} height={12} />
              response
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-mono">
              <span className="text-slate-500 dark:text-slate-400">
                "route":{" "}
                <span className="text-brand-600 dark:text-brand-400">"smart"</span>
              </span>
              <span className="text-slate-500 dark:text-slate-400">
                "provider":{" "}
                <span className="text-slate-900 dark:text-white">"openai"</span>
              </span>
              <span className="text-slate-500 dark:text-slate-400">
                "model":{" "}
                <span className="text-slate-900 dark:text-white">"gpt-5"</span>
              </span>
              <span className="text-slate-500 dark:text-slate-400">
                "latency_ms":{" "}
                <span className="text-accent-600 dark:text-accent-400">142</span>
              </span>
              <span className="ml-auto flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                200 OK
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickStartTabs;
