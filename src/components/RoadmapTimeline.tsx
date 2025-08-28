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
    title: 'Key Rotation & Secret Management',
    description: 'Automated key rotation and integration with external secret managers for enhanced security.',
    quarter: 'Q1 2025',
    status: 'in-progress',
    icon: 'mdi:key-variant',
    priority: 'high',
    features: [
      'Automated API key rotation',
      'AWS Secrets Manager integration',
      'Azure Key Vault support',
      'HashiCorp Vault connector',
      'Secret versioning & rollback'
    ]
  },
  {
    id: '2',
    title: 'Advanced Guardrails',
    description: 'Content filtering, rate limiting, and safety mechanisms to ensure responsible AI usage.',
    quarter: 'Q1 2025',
    status: 'planned',
    icon: 'mdi:shield-check',
    priority: 'high',
    features: [
      'Content filtering & moderation',
      'PII detection & redaction',
      'Toxicity & bias detection',
      'Custom prompt validation',
      'Usage policy enforcement'
    ]
  },
  {
    id: '3',
    title: 'Enhanced Audit & Logging',
    description: 'Comprehensive audit trails with retention policies and compliance reporting.',
    quarter: 'Q2 2025',
    status: 'planned',
    icon: 'mdi:file-document-outline',
    priority: 'high',
    features: [
      'Detailed audit logs',
      'Log retention policies',
      'Compliance reporting',
      'Real-time log streaming',
      'Custom log formats'
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
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <Icon icon="mdi:check-circle" className="w-3 h-3 mr-1" />
            Completed
          </span>
        );
      case 'in-progress':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Icon icon="mdi:progress-clock" className="w-3 h-3 mr-1" />
            In Progress
          </span>
        );
      case 'planned':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
            <Icon icon="mdi:calendar-clock" className="w-3 h-3 mr-1" />
            Planned
          </span>
        );
    }
  };

  const getPriorityColor = (priority: RoadmapItem['priority']) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-orange-200 bg-orange-50';
      case 'low': return 'border-blue-200 bg-blue-50';
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
      <div className="absolute left-1/2 transform -translate-x-0.5 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-slate-300"></div>

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
              <div className="absolute left-1/2 transform -translate-x-1/2 top-10 w-6 h-6 rounded-full bg-white border-4 border-slate-300 shadow-lg z-10">
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
                    className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 cursor-pointer relative ${
                      activeItem === item.id ? 'border-blue-300 shadow-2xl' : 'border-slate-200'
                    }`}
                    onClick={() => setActiveItem(activeItem === item.id ? null : item.id)}
                  >
                    {/* Arrow pointing to timeline */}
                    <div 
                      className={`absolute top-10 w-4 h-4 bg-white border-2 border-slate-200 rotate-45 transform z-20 ${
                        isLeft 
                          ? '-right-2 border-r-transparent border-b-transparent' 
                          : '-left-2 border-l-transparent border-t-transparent'
                      }`}
                    ></div>

                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-xl border-2 ${getPriorityColor(item.priority)}`}>
                          <Icon icon={item.icon} className="w-6 h-6 text-slate-700" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                          <div className="flex items-center space-x-3">
                            {getStatusBadge(item.status)}
                            <span className="text-sm font-medium text-slate-500">{item.quarter}</span>
                          </div>
                        </div>
                      </div>
                      <Icon 
                        icon={activeItem === item.id ? "mdi:chevron-up" : "mdi:chevron-down"}
                        className="w-5 h-5 text-slate-400 transition-transform duration-200"
                      />
                    </div>

                    {/* Description */}
                    <p className="text-slate-600 mb-4 leading-relaxed">{item.description}</p>

                    {/* Expandable features */}
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      activeItem === item.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="border-t border-slate-200 pt-4">
                        <h4 className="text-sm font-semibold text-slate-900 mb-3">Key Features:</h4>
                        <div className="grid grid-cols-1 gap-2">
                          {item.features.map((feature, featureIndex) => (
                            <div 
                              key={featureIndex}
                              className="flex items-center text-sm text-slate-600"
                              style={{ 
                                animationDelay: `${featureIndex * 50}ms`,
                                animation: activeItem === item.id ? 'fadeInUp 0.3s ease-out forwards' : 'none'
                              }}
                            >
                              <Icon icon="mdi:check-circle" className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
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