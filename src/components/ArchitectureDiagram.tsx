import React from "react";

const ArchitectureDiagram: React.FC = () => {
  return (
    <div className="relative w-full max-w-6xl mx-auto bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-8 lg:p-12 border border-slate-200">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #3b82f6 2px, transparent 2px), radial-gradient(circle at 75% 75%, #8b5cf6 2px, transparent 2px)`,
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
            System Architecture
          </h3>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Enterprise-grade architecture designed for high availability,
            scalability, and performance
          </p>
        </div>

        {/* Architecture Flow */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
          {/* Client Layer */}
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h4 className="text-lg font-bold text-slate-900 mb-2">
                Client Layer
              </h4>
              <p className="text-sm text-slate-600">Applications & Services</p>
            </div>

            <div className="space-y-4">
              {[
                {
                  name: "Web Applications",
                  icon: "🌐",
                  desc: "React, Vue, Angular",
                },
                {
                  name: "Mobile Apps",
                  icon: "📱",
                  desc: "iOS, Android, React Native",
                },
                {
                  name: "Backend Services",
                  icon: "⚙️",
                  desc: "Node.js, Python, Go",
                },
                {
                  name: "AI Platforms",
                  icon: "🤖",
                  desc: "LangChain, AutoGPT",
                },
              ].map((client, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-lg">
                      {client.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900 text-sm">
                        {client.name}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {client.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Arrow */}
            <div className="hidden lg:block absolute left-full top-1/2 transform -translate-y-1/2 ml-4">
              <div className="flex items-center">
                <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500"></div>
                <div className="w-3 h-3 bg-purple-500 rounded-full transform rotate-45 ml-2"></div>
              </div>
            </div>
          </div>

          {/* pLLM Gateway Layer */}
          <div className="relative">
            <div className="text-center mb-8">
              <h4 className="text-lg font-bold text-slate-900 mb-2">
                pLLM Gateway
              </h4>
              <p className="text-sm text-slate-600">
                Intelligent Routing Engine
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl p-8 text-white shadow-xl">
              {/* Main Gateway */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L2 7v10c0 5.55 3.84 9.95 9 11 5.16-1.05 9-5.45 9-11V7l-10-5z" />
                  </svg>
                </div>
                <h5 className="font-bold text-lg mb-2">Core Gateway</h5>
                <p className="text-purple-100 text-sm">
                  High-performance Go runtime
                </p>
              </div>

              {/* Gateway Components */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { name: "Router", desc: "Chi HTTP Router" },
                  { name: "Auth", desc: "JWT & RBAC" },
                  { name: "Cache", desc: "Redis Layer" },
                  { name: "Monitor", desc: "Metrics & Logs" },
                ].map((component, index) => (
                  <div
                    key={index}
                    className="bg-white/10 rounded-xl p-3 backdrop-blur-sm"
                  >
                    <p className="font-semibold text-sm mb-1">
                      {component.name}
                    </p>
                    <p className="text-xs text-purple-200">{component.desc}</p>
                  </div>
                ))}
              </div>

              {/* Load Balancer */}
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                    </svg>
                  </div>
                  <span className="font-semibold">
                    Intelligent Load Balancer
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mx-auto mb-1"></div>
                    <span className="text-purple-200">Round Robin</span>
                  </div>
                  <div className="text-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mx-auto mb-1"></div>
                    <span className="text-purple-200">Least Busy</span>
                  </div>
                  <div className="text-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mx-auto mb-1"></div>
                    <span className="text-purple-200">Weighted</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="hidden lg:block absolute left-full top-1/2 transform -translate-y-1/2 ml-4">
              <div className="flex items-center">
                <div className="w-8 h-0.5 bg-gradient-to-r from-purple-500 to-green-400"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full transform rotate-45 ml-2"></div>
              </div>
            </div>
          </div>

          {/* Provider Layer */}
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h4 className="text-lg font-bold text-slate-900 mb-2">
                Provider Layer
              </h4>
              <p className="text-sm text-slate-600">LLM Service Providers</p>
            </div>

            <div className="space-y-4">
              {[
                {
                  name: "OpenAI",
                  icon: "simple-icons:openai",
                  color: "from-green-500 to-green-600",
                  status: "healthy",
                },
                {
                  name: "Anthropic",
                  icon: "simple-icons:anthropic",
                  color: "from-orange-500 to-orange-600",
                  status: "healthy",
                },
                {
                  name: "Azure OpenAI",
                  icon: "logos:microsoft-azure",
                  color: "from-blue-500 to-blue-600",
                  status: "degraded",
                },
                {
                  name: "AWS Bedrock",
                  icon: "logos:aws",
                  color: "from-yellow-500 to-orange-500",
                  status: "healthy",
                },
                {
                  name: "Google Vertex",
                  icon: "logos:google-cloud",
                  color: "from-blue-400 to-blue-500",
                  status: "healthy",
                },
                {
                  name: "Grok",
                  icon: "simple-icons:meta",
                  color: "from-purple-500 to-purple-600",
                  status: "failed",
                },
              ].map((provider, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl flex items-center justify-center border border-slate-200">
                        <iconify-icon
                          icon={provider.icon}
                          class="w-6 h-6"
                        ></iconify-icon>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-900 text-sm">
                          {provider.name}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              provider.status === "healthy"
                                ? "bg-green-500"
                                : provider.status === "degraded"
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }`}
                          ></div>
                          <p
                            className={`text-xs capitalize ${
                              provider.status === "healthy"
                                ? "text-green-600"
                                : provider.status === "degraded"
                                  ? "text-yellow-600"
                                  : "text-red-600"
                            }`}
                          >
                            {provider.status}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500">
                        {provider.status === "healthy"
                          ? "99.9%"
                          : provider.status === "degraded"
                            ? "85.2%"
                            : "0%"}
                      </p>
                      <p className="text-xs text-slate-400">uptime</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Data Flow Indicators */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <div className="text-center mb-6">
            <h5 className="text-lg font-bold text-slate-900 mb-2">
              Data Flow & Features
            </h5>
            <p className="text-sm text-slate-600">
              Real-time monitoring and intelligent routing
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                name: "Circuit Breaker",
                icon: "⚡",
                desc: "Automatic failover protection",
              },
              {
                name: "Health Checks",
                icon: "💓",
                desc: "Continuous monitoring",
              },
              {
                name: "Rate Limiting",
                icon: "🚦",
                desc: "Traffic control & quotas",
              },
              { name: "Analytics", icon: "📊", desc: "Performance insights" },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 shadow-sm border border-slate-200"
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">{feature.icon}</div>
                  <p className="font-semibold text-slate-900 text-sm mb-1">
                    {feature.name}
                  </p>
                  <p className="text-xs text-slate-500">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
          <div className="text-center mb-6">
            <h5 className="text-lg font-bold text-slate-900 mb-2">
              Live Performance Metrics
            </h5>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                metric: "1000+",
                label: "Requests/sec",
                color: "text-blue-600",
              },
              { metric: "<1ms", label: "Latency", color: "text-green-600" },
              { metric: "99.9%", label: "Uptime", color: "text-purple-600" },
              { metric: "65MB", label: "Memory", color: "text-orange-600" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className={`text-2xl font-bold ${stat.color} mb-1`}>
                  {stat.metric}
                </p>
                <p className="text-sm text-slate-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureDiagram;
