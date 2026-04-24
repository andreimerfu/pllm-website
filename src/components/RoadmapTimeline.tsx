import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  quarter: string;
  status: 'completed' | 'in-progress' | 'planned';
  icon: string;
  features: string[];
  priority: 'high' | 'medium' | 'low';
}

const roadmapData: RoadmapItem[] = [
  {
    id: '1',
    title: 'Advanced Guardrails',
    description: 'Pluggable content guardrails with pre-call, post-call, during-call, and logging-only modes. Marketplace with Presidio PII detection and more.',
    quarter: 'Q4 2025',
    status: 'completed',
    icon: 'solar:shield-check-bold-duotone',
    priority: 'high',
    features: [
      'PII detection & masking (Presidio)',
      'Pre-call, post-call, during-call & logging modes',
      'Guardrails marketplace',
      'YAML-based configuration',
      'Per-guardrail stats & health checks'
    ]
  },
  {
    id: '2',
    title: 'MCP Gateway (alpha)',
    description: 'Turn pLLM into the control plane for every MCP server in the org. Registry, health, versioning, and per-tool scoping.',
    quarter: 'Q1 2026',
    status: 'in-progress',
    icon: 'solar:server-square-bold-duotone',
    priority: 'high',
    features: [
      'MCP server registry with manifests',
      'Per-tool allow-listing',
      'Health checks & circuit breakers',
      'Version pinning & blue/green rollout',
      'Unified tool catalog across servers'
    ]
  },
  {
    id: '3',
    title: 'AD / Entra Group Governance',
    description: 'Native Active Directory and Entra ID group sync. Use the identity system you already have to drive AI access policy.',
    quarter: 'Q2 2026',
    status: 'in-progress',
    icon: 'solar:users-group-rounded-bold-duotone',
    priority: 'high',
    features: [
      'AD / Entra / Okta group sync',
      'Group-based model & MCP allow-lists',
      'Policy-as-code (YAML) with diffs',
      'Per-group budgets, quotas, and guardrails',
      'SIEM-ready audit streaming'
    ]
  },
  {
    id: '4',
    title: 'Agent Registry',
    description: 'First-class agent artifacts: manifest-driven agents with bound tools, guardrails, models, and AD-group scope.',
    quarter: 'Q2 2026',
    status: 'planned',
    icon: 'solar:robot-bold-duotone',
    priority: 'high',
    features: [
      'Agent manifests (YAML)',
      'Bound MCP tools & guardrails',
      'Canary & weighted rollout',
      'Run history with trace replay',
      'Per-agent cost & token attribution'
    ]
  },
  {
    id: '5',
    title: 'Skills & Prompt Registry',
    description: 'Versioned skills and prompt templates with rollout controls, evals, and group scoping. Stop treating prompts like snippets.',
    quarter: 'Q3 2026',
    status: 'planned',
    icon: 'solar:magic-stick-3-bold-duotone',
    priority: 'high',
    features: [
      'Semver-versioned prompt templates',
      'Skill packs with intent triggers',
      'Built-in eval harness',
      'A/B tests across versions',
      'Registry UI + REST/CLI API'
    ]
  },
  {
    id: '6',
    title: 'MCP Gateway (GA)',
    description: 'Production-grade MCP control plane with full lifecycle management, sandboxed runtime, and enterprise SLAs.',
    quarter: 'Q3 2026',
    status: 'planned',
    icon: 'solar:cpu-bolt-bold-duotone',
    priority: 'high',
    features: [
      'Sandboxed MCP server runtime',
      'Multi-tenant isolation',
      'Usage-based rate limits per tool',
      'MCP-to-MCP composition',
      'Marketplace of pre-built connectors'
    ]
  },
  {
    id: '7',
    title: 'Guardrails 2.0 & Eval Loop',
    description: 'Self-hostable guardrail models, custom rule DSL, and a closed-loop eval system that turns incidents into new rules.',
    quarter: 'Q3 2026',
    status: 'planned',
    icon: 'solar:shield-plus-bold-duotone',
    priority: 'medium',
    features: [
      'Custom guardrail DSL',
      'Fine-tuned on-prem classifiers',
      'Incident → rule feedback loop',
      'Shadow-mode testing',
      'Per-agent guardrail bindings'
    ]
  },
  {
    id: '8',
    title: 'Observability & Cost Center',
    description: 'Unified OpenTelemetry traces across LLM, MCP, and agent steps. Cost attribution down to individual users and AD groups.',
    quarter: 'Q4 2026',
    status: 'planned',
    icon: 'solar:chart-square-bold-duotone',
    priority: 'medium',
    features: [
      'OTel traces across the full stack',
      'Per-group & per-agent cost rollups',
      'Chargeback-ready billing exports',
      'Anomaly detection on spend',
      'Grafana & Datadog integrations'
    ]
  },
];

const RoadmapTimeline: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const [activeItem, setActiveItem] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.3 }
    );

    const items = document.querySelectorAll('[data-roadmap-item]');
    items.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const getStatusBadge = (status: RoadmapItem['status']) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 transition-colors duration-200">
            <Icon icon="solar:check-circle-bold-duotone" className="w-3 h-3 mr-1" />
            Completed
          </span>
        );
      case 'in-progress':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 transition-colors duration-200">
            <Icon icon="solar:clock-circle-bold-duotone" className="w-3 h-3 mr-1" />
            In Progress
          </span>
        );
      case 'planned':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300 transition-colors duration-200">
            <Icon icon="solar:calendar-bold-duotone" className="w-3 h-3 mr-1" />
            Planned
          </span>
        );
    }
  };

  const getPriorityColor = (priority: RoadmapItem['priority']) => {
    switch (priority) {
      case 'high': return 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30';
      case 'medium': return 'border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/30';
      case 'low': return 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30';
    }
  };

  const getTimelineColor = (status: RoadmapItem['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'planned': return 'bg-slate-400';
    }
  };

  return (
    <div className="relative max-w-7xl mx-auto">
      {/* Timeline line */}
      <div className="absolute left-1/2 transform -translate-x-0.5 top-0 bottom-0 w-1 bg-slate-300 dark:bg-slate-600 transition-colors duration-200"></div>

      <div className="space-y-20">
        {roadmapData.map((item, index) => {
          const isLeft = index % 2 === 0;
          return (
            <div
              key={item.id}
              id={`roadmap-${item.id}`}
              data-roadmap-item
              className={`relative transition-all duration-700 ease-out ${
                visibleItems.has(`roadmap-${item.id}`)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Timeline dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 top-10 w-6 h-6 rounded-full bg-white dark:bg-slate-800 border-4 border-slate-300 dark:border-slate-600 z-10 transition-colors duration-200">
                <div className={`absolute inset-1 rounded-full ${getTimelineColor(item.status)}`}>
                  {item.status === 'in-progress' && (
                    <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping"></div>
                  )}
                </div>
              </div>

              {/* Content card */}
              <div className={`flex ${isLeft ? 'justify-start pr-12' : 'justify-end pl-12'}`}>
                <div className="w-full max-w-lg">
                  <div 
                    className={`bg-white dark:bg-slate-800 rounded-xl p-6 transition-colors duration-200 border-2 cursor-pointer relative ${
                      activeItem === item.id ? 'border-brand-300 dark:border-brand-500' : 'border-slate-200 dark:border-slate-700'
                    }`}
                    onClick={() => setActiveItem(activeItem === item.id ? null : item.id)}
                  >
                    {/* Arrow pointing to timeline */}
                    <div 
                      className={`absolute top-10 w-4 h-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-600 rotate-45 transform z-20 transition-colors duration-200 ${
                        isLeft 
                          ? '-right-2 border-r-transparent border-b-transparent' 
                          : '-left-2 border-l-transparent border-t-transparent'
                      }`}
                    ></div>

                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-xl border-2 ${getPriorityColor(item.priority)}`}>
                          <Icon icon={item.icon} className="w-6 h-6 text-slate-700 dark:text-slate-300 transition-colors duration-200" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 transition-colors duration-200">{item.title}</h3>
                          <div className="flex items-center space-x-3">
                            {getStatusBadge(item.status)}
                            <span className="text-sm font-medium text-slate-500 dark:text-slate-400 transition-colors duration-200">{item.quarter}</span>
                          </div>
                        </div>
                      </div>
                      <Icon 
                        icon={activeItem === item.id ? "solar:alt-arrow-up-bold-duotone" : "solar:alt-arrow-down-bold-duotone"}
                        className="w-5 h-5 text-slate-400 dark:text-slate-500 transition-all duration-200"
                      />
                    </div>

                    {/* Description */}
                    <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed transition-colors duration-200">{item.description}</p>

                    {/* Expandable features */}
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      activeItem === item.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="border-t border-slate-200 dark:border-slate-600 pt-4 transition-colors duration-200">
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 transition-colors duration-200">Key Features:</h4>
                        <div className="grid grid-cols-1 gap-2">
                          {item.features.map((feature, featureIndex) => (
                            <div 
                              key={featureIndex}
                              className="flex items-center text-sm text-slate-600 dark:text-slate-300 transition-colors duration-200"
                              style={{ 
                                animationDelay: `${featureIndex * 50}ms`,
                                animation: activeItem === item.id ? 'fadeInUp 0.3s ease-out forwards' : 'none'
                              }}
                            >
                              <Icon icon="solar:check-circle-bold-duotone" className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default RoadmapTimeline;