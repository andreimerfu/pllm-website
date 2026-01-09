import React from 'react';
import {
  Plug,
  Globe,
  Target,
  Rocket,
  Shield,
  DollarSign,
  Zap,
  HardDrive,
  Timer,
  Activity,
  Lock,
  Layers,
  BarChart3,
  type LucideIcon,
} from 'lucide-react';

// Feature icons mapping (replaces emojis)
export const FeatureIconMap = {
  compatibility: Plug,
  multiProvider: Globe,
  routing: Target,
  performance: Rocket,
  security: Shield,
  cost: DollarSign,
  latency: Zap,
  memory: HardDrive,
  startup: Timer,
  circuitBreaker: Activity,
  auth: Lock,
  cache: Layers,
  analytics: BarChart3,
} as const;

export type FeatureIconName = keyof typeof FeatureIconMap;

// Size mappings
const sizeMap = {
  sm: 'w-5 h-5',
  md: 'w-6 h-6',
  lg: 'w-7 h-7',
  xl: 'w-8 h-8',
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
  const IconComponent = FeatureIconMap[name];
  return <IconComponent className={`${sizeMap[size]} ${className}`} strokeWidth={1.5} />;
};

// Icon with box container
interface IconBoxProps {
  name: FeatureIconName;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'brand' | 'accent' | 'success' | 'warning';
  className?: string;
}

const variantStyles = {
  brand: 'bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400',
  accent: 'bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400',
  success: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
  warning: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
};

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
  variant = 'brand',
  className = '',
}) => {
  return (
    <div
      className={`flex items-center justify-center rounded-xl ${boxSizeMap[size]} ${variantStyles[variant]} ${className}`}
    >
      <FeatureIcon name={name} size={iconInBoxSizeMap[size]} />
    </div>
  );
};

export default FeatureIcon;
