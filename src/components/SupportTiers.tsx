import React from 'react';
import { Icon } from '@iconify/react';

interface SupportTier {
  name: string;
  description: string;
  price: string;
  popular?: boolean;
  features: string[];
  limitations?: string[];
  cta: {
    text: string;
    href: string;
    external?: boolean;
  };
}

const supportTiers: SupportTier[] = [
  {
    name: 'Community',
    description: 'Perfect for developers and small teams getting started with pLLM.',
    price: 'Free',
    features: [
      'GitHub Issues & Discussions',
      'Documentation and guides',
      'Best effort response time',
      'Open source under MIT license'
    ],
    limitations: [
      'No SLA guarantees',
      'Community-driven support',
      'No priority bug fixes'
    ],
    cta: {
      text: 'Get Started',
      href: 'https://github.com/andreimerfu/pllm',
      external: true
    }
  },
  {
    name: 'Professional',
    description: 'For growing businesses that need reliable support and faster issue resolution.',
    price: 'Custom',
    popular: true,
    features: [
      'Priority email support',
      'Guaranteed 24-hour response time',
      'Deployment assistance',
      'Configuration review',
      'Priority bug fixes',
      'Access to beta features'
    ],
    limitations: [
      'Business hours support only',
      'Email-based communication'
    ],
    cta: {
      text: 'Contact Sales',
      href: 'https://tally.so/r/nreKO2',
      external: true
    }
  },
  {
    name: 'Enterprise',
    description: 'Comprehensive support for mission-critical deployments with custom requirements.',
    price: 'Custom',
    features: [
      'Dedicated support engineer',
      'Custom SLA (down to 2-hour response)',
      'Phone & video call support',
      'Custom feature development',
      'Architecture consulting',
      'On-site deployment assistance',
      'Training and workshops',
      'Priority feature requests'
    ],
    cta: {
      text: 'Contact Sales',
      href: 'https://tally.so/r/nreKO2',
      external: true
    }
  }
];

const SupportTiers: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
      {supportTiers.map((tier, index) => (
        <div
          key={tier.name}
          className={`relative flex-1 bg-white dark:bg-slate-800 rounded-xl transition-colors duration-200 border-2 ${
            tier.popular
              ? 'border-brand-300 dark:border-brand-600'
              : 'border-slate-200 dark:border-slate-700'
          }`}
        >
          {tier.popular && (
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-brand-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </span>
            </div>
          )}

          <div className="p-8 flex flex-col h-full">
            {/* Header */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 transition-colors duration-200">{tier.name}</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 transition-colors duration-200">{tier.description}</p>
              <div className="text-4xl font-bold text-slate-900 dark:text-white transition-colors duration-200">
                {tier.price}
                {tier.price === 'Custom' && (
                  <span className="text-base font-normal text-slate-500 dark:text-slate-400 block transition-colors duration-200">Contact for pricing</span>
                )}
              </div>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 transition-colors duration-200">What's included:</h4>
              <ul className="space-y-3">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start text-sm text-slate-700 dark:text-slate-300 transition-colors duration-200">
                    <Icon 
                      icon="solar:check-circle-bold-duotone" 
                      className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" 
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Limitations */}
            {tier.limitations && (
              <div className="mb-8">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 transition-colors duration-200">Limitations:</h4>
                <ul className="space-y-3">
                  {tier.limitations.map((limitation, limitationIndex) => (
                    <li key={limitationIndex} className="flex items-start text-sm text-slate-500 dark:text-slate-400 transition-colors duration-200">
                      <Icon 
                        icon="solar:minus-circle-bold-duotone" 
                        className="w-5 h-5 text-slate-400 dark:text-slate-500 mr-3 flex-shrink-0 mt-0.5 transition-colors duration-200" 
                      />
                      {limitation}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA */}
            <div className="mt-auto">
              <a
                href={tier.cta.href}
                target={tier.cta.external ? "_blank" : undefined}
                rel={tier.cta.external ? "noopener noreferrer" : undefined}
                className={`w-full inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-sm transition-colors duration-200 ${
                  tier.popular
                    ? 'bg-brand-600 text-white hover:bg-brand-700'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600 border border-slate-300 dark:border-slate-600'
                }`}
              >
                {tier.cta.text}
                {tier.cta.external && (
                  <Icon icon="solar:square-arrow-right-up-bold-duotone" className="w-4 h-4 ml-2" />
                )}
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SupportTiers;