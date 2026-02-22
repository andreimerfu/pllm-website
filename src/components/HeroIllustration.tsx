import React from "react";

const HeroIllustration: React.FC = () => {
  return (
    <div className="w-full max-w-xl">
      {/* Terminal window */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-card">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <span className="w-3 h-3 rounded-full bg-red-400" />
          <span className="w-3 h-3 rounded-full bg-amber-400" />
          <span className="w-3 h-3 rounded-full bg-green-400" />
          <span className="ml-2 text-xs text-slate-500 dark:text-slate-400 font-mono">terminal</span>
        </div>

        {/* Terminal body */}
        <div className="bg-slate-900 p-5 font-mono text-sm leading-relaxed text-left overflow-x-auto">
          {/* Comment */}
          <p className="text-slate-500"># Drop-in OpenAI replacement — just change the base URL</p>
          <p className="mt-3">
            <span className="text-green-400">$</span>{" "}
            <span className="text-slate-300">curl http://localhost:8080/v1/chat/completions \</span>
          </p>
          <p className="text-slate-300 pl-4">-H "Authorization: Bearer $PLLM_KEY" \</p>
          <p className="text-slate-300 pl-4">-d '{`{"model":"gpt-4o","messages":[{"role":"user","content":"Hi"}]}`}'</p>

          {/* Response */}
          <div className="mt-4 text-slate-400">
            <p>{"{"}</p>
            <p className="pl-4">
              <span className="text-brand-400">"provider"</span>: <span className="text-green-400">"openai"</span>,
            </p>
            <p className="pl-4">
              <span className="text-brand-400">"model"</span>: <span className="text-green-400">"gpt-4o"</span>,
            </p>
            <p className="pl-4">
              <span className="text-brand-400">"latency_ms"</span>: <span className="text-amber-400">142</span>,
            </p>
            <p className="pl-4">
              <span className="text-brand-400">"route"</span>: <span className="text-green-400">"least-latency"</span>
            </p>
            <p>{"}"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroIllustration;
