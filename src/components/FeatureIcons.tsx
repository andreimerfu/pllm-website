import React from 'react';
import { Icon } from '@iconify/react';

// Solar bold-duotone icon mapping with per-concept colors
export const FeatureIconMap = {
  compatibility: { icon: 'solar:plug-circle-bold-duotone', color: 'text-brand-600 dark:text-brand-400' },
  multiProvider: { icon: 'solar:earth-bold-duotone', color: 'text-blue-600 dark:text-blue-400' },
  routing: { icon: 'solar:routing-2-bold-duotone', color: 'text-emerald-600 dark:text-emerald-400' },
  performance: { icon: 'solar:rocket-bold-duotone', color: 'text-amber-600 dark:text-amber-400' },
  security: { icon: 'solar:shield-check-bold-duotone', color: 'text-rose-600 dark:text-rose-400' },
  cost: { icon: 'solar:wallet-money-bold-duotone', color: 'text-emerald-600 dark:text-emerald-400' },
  latency: { icon: 'solar:bolt-circle-bold-duotone', color: 'text-amber-600 dark:text-amber-400' },
  memory: { icon: 'solar:cpu-bolt-bold-duotone', color: 'text-blue-600 dark:text-blue-400' },
  startup: { icon: 'solar:stopwatch-bold-duotone', color: 'text-brand-600 dark:text-brand-400' },
  circuitBreaker: { icon: 'solar:restart-circle-bold-duotone', color: 'text-rose-600 dark:text-rose-400' },
  auth: { icon: 'solar:lock-keyhole-bold-duotone', color: 'text-brand-600 dark:text-brand-400' },
  cache: { icon: 'solar:layers-bold-duotone', color: 'text-blue-600 dark:text-blue-400' },
  analytics: { icon: 'solar:chart-square-bold-duotone', color: 'text-emerald-600 dark:text-emerald-400' },
} as const;

export type FeatureIconName = keyof typeof FeatureIconMap;

// Size mappings
const sizeMap = {
  sm: 20,
  md: 24,
  lg: 28,
  xl: 32,
};

interface FeatureIconProps {
  name: FeatureIconName;
  size?: keyof typeof sizeMap;
  className?: string;
}

export const FeatureIcon: React.FC<FeatureIconProps> = ({
  name,
  size = 'md',
  className = '',
}) => {
  const entry = FeatureIconMap[name];
  return (
    <Icon
      icon={entry.icon}
      width={sizeMap[size]}
      height={sizeMap[size]}
      className={`${entry.color} ${className}`}
    />
  );
};

// Icon with box container
interface IconBoxProps {
  name: FeatureIconName;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const boxSizeMap = {
  sm: 'w-10 h-10',
  md: 'w-12 h-12',
  lg: 'w-14 h-14',
};

const iconInBoxSizeMap = {
  sm: 'md' as const,
  md: 'lg' as const,
  lg: 'xl' as const,
};

export const IconBox: React.FC<IconBoxProps> = ({
  name,
  size = 'md',
  className = '',
}) => {
  return (
    <div
      className={`flex items-center justify-center rounded-lg ${boxSizeMap[size]} ${className}`}
    >
      <FeatureIcon name={name} size={iconInBoxSizeMap[size]} />
    </div>
  );
};

export default FeatureIcon;
