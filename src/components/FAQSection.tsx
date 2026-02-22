import React, { useState } from 'react';
import { Icon } from '@iconify/react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'technical' | 'enterprise' | 'pricing';
}

const faqData: FAQItem[] = [
  {
    id: '1',
    question: 'Is pLLM really free for commercial use?',
    answer: 'Yes, pLLM is completely free and open source under the MIT license. This means you can use it in commercial applications, modify the code, and deploy it anywhere without licensing fees. The only costs you\'ll incur are your infrastructure expenses (servers, cloud resources) and API costs from the LLM providers themselves (OpenAI, Anthropic, etc.).',
    category: 'pricing'
  },
  {
    id: '2',
    question: 'How does pLLM compare to other LLM gateways?',
    answer: 'pLLM is built in Go for superior performance and lower resource usage compared to Python-based solutions. Key advantages include: sub-millisecond routing overhead, native compilation for better performance, 3-6x lower memory usage, 20-50x faster startup times, and true parallel processing without GIL limitations. Plus, it\'s 100% OpenAI API compatible, requiring zero code changes to integrate.',
    category: 'technical'
  },
  {
    id: '3',
    question: 'What LLM providers are supported?',
    answer: 'pLLM supports all major LLM providers including OpenAI (GPT-3.5, GPT-4, GPT-4 Turbo), Anthropic Claude, Azure OpenAI, AWS Bedrock, Google Vertex AI, Groq, and Cohere. The unified API interface means you can switch between providers or use multiple providers simultaneously with intelligent routing and automatic failover.',
    category: 'technical'
  },
  {
    id: '4',
    question: 'Do you offer enterprise support and custom features?',
    answer: 'Yes, we provide comprehensive enterprise support including dedicated support engineers, custom SLA agreements (down to 2-hour response times), priority bug fixes, custom feature development, architecture consulting, on-site deployment assistance, and training workshops. Enterprise support is available through custom pricing based on your specific requirements.',
    category: 'enterprise'
  },
  {
    id: '5',
    question: 'Can pLLM be deployed on-premise or in air-gapped environments?',
    answer: 'Absolutely. pLLM is designed for flexible deployment scenarios including on-premise installations, air-gapped environments, and hybrid cloud setups. We provide Kubernetes manifests, Docker containers, and can assist with custom deployment configurations. The gateway can run entirely within your infrastructure while connecting to external LLM APIs or internal models.',
    category: 'enterprise'
  },
  {
    id: '6',
    question: 'How does authentication and security work?',
    answer: 'pLLM includes comprehensive security features: JWT-based authentication, Role-Based Access Control (RBAC), audit logging for compliance, OAuth/OIDC integration through Dex (supporting Google, Microsoft, LDAP, Active Directory), API key management, rate limiting, and request monitoring. All communications use TLS encryption, and we support enterprise identity providers.',
    category: 'technical'
  },
  {
    id: '7',
    question: 'What kind of performance can I expect?',
    answer: 'pLLM is optimized for high-performance scenarios: handles thousands of concurrent connections, sub-millisecond routing overhead, efficient memory usage (50-80MB typical), fast startup times (<100ms), and intelligent caching to reduce API costs. The Go-based architecture provides significant performance advantages over interpreted language solutions.',
    category: 'technical'
  },
  {
    id: '8',
    question: 'Is there a community or documentation available?',
    answer: 'Yes! We have comprehensive documentation, GitHub discussions for community support, and regular updates on our roadmap. The open-source community actively contributes features and bug fixes. For enterprise customers, we provide dedicated documentation, training materials, and direct access to our engineering team.',
    category: 'general'
  }
];

const FAQSection: React.FC = () => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const getCategoryColor = (category: FAQItem['category']) => {
    switch (category) {
      case 'general': return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-600';
      case 'technical': return 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-600';
      case 'enterprise': return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-600';
      case 'pricing': return 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-600';
      default: return 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-600';
    }
  };

  const getCategoryBadge = (category: FAQItem['category']) => {
    const badges = {
      general: { label: 'General', color: 'bg-blue-100 dark:bg-blue-800/30 text-blue-800 dark:text-blue-300' },
      technical: { label: 'Technical', color: 'bg-purple-100 dark:bg-purple-800/30 text-purple-800 dark:text-purple-300' },
      enterprise: { label: 'Enterprise', color: 'bg-green-100 dark:bg-green-800/30 text-green-800 dark:text-green-300' },
      pricing: { label: 'Pricing', color: 'bg-orange-100 dark:bg-orange-800/30 text-orange-800 dark:text-orange-300' }
    };

    const badge = badges[category];
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}>
        {badge.label}
      </span>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {faqData.map((item) => (
        <div
          key={item.id}
          className={`rounded-xl border-2 transition-all duration-200 ${
            openItems.has(item.id) 
              ? `${getCategoryColor(item.category)} shadow-md` 
              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 hover:shadow-sm transition-colors duration-200'
          }`}
        >
          <button
            onClick={() => toggleItem(item.id)}
            className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 pr-4">
                <div className="flex items-center mb-2">
                  {getCategoryBadge(item.category)}
                </div>
                <h4 className="text-lg font-semibold text-slate-900 dark:text-white leading-tight transition-colors duration-200">
                  {item.question}
                </h4>
              </div>
              <div className="flex-shrink-0">
                <Icon 
                  icon={openItems.has(item.id) ? "solar:alt-arrow-up-bold-duotone" : "solar:alt-arrow-down-bold-duotone"}
                  className="w-6 h-6 text-slate-400 dark:text-slate-300 transition-all duration-200"
                />
              </div>
            </div>
          </button>
          
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
            openItems.has(item.id) ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'
          }`}>
            <div className="px-6">
              <div className="border-t border-slate-200 dark:border-slate-600 pt-4 transition-colors duration-200">
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed transition-colors duration-200">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQSection;