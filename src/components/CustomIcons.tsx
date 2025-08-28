import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// Performance Icon
export const PerformanceIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="url(#performanceGradient)"
    />
    <defs>
      <linearGradient id="performanceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#8B5CF6" />
      </linearGradient>
    </defs>
  </svg>
);

// Cost Efficient Icon
export const CostIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="url(#costGradient)" />
    <path d="M14.31 8l5.74 9.94M9.69 8h11.48M14.31 16l5.74-9.94M9.69 16h11.48" stroke="white" strokeWidth="2" />
    <defs>
      <linearGradient id="costGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#06B6D4" />
      </linearGradient>
    </defs>
  </svg>
);

// Low Latency Icon
export const LatencyIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="url(#latencyGradient)" />
    <polyline points="12,6 12,12 16,14" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <defs>
      <linearGradient id="latencyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#EF4444" />
      </linearGradient>
    </defs>
  </svg>
);

// Compatibility Icon
export const CompatibilityIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="url(#compatibilityGradient)" />
    <circle cx="8" cy="12" r="2" fill="white" />
    <circle cx="16" cy="12" r="2" fill="white" />
    <path d="M8 14v2M16 14v2" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <defs>
      <linearGradient id="compatibilityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
    </defs>
  </svg>
);

// Router Icon
export const RouterIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="10" width="18" height="4" rx="2" stroke="currentColor" strokeWidth="2" fill="url(#routerGradient)" />
    <circle cx="7" cy="12" r="1" fill="white" />
    <circle cx="12" cy="12" r="1" fill="white" />
    <circle cx="17" cy="12" r="1" fill="white" />
    <path d="M12 6v4M12 14v4M6 8l6 4M18 8l-6 4M6 16l6-4M18 16l-6-4" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
    <defs>
      <linearGradient id="routerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>
    </defs>
  </svg>
);

// Database Icon
export const DatabaseIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <ellipse cx="12" cy="5" rx="9" ry="3" stroke="currentColor" strokeWidth="2" fill="url(#databaseGradient)" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" stroke="currentColor" strokeWidth="2" fill="none" />
    <defs>
      <linearGradient id="databaseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#059669" />
        <stop offset="100%" stopColor="#10B981" />
      </linearGradient>
    </defs>
  </svg>
);

// Cache Icon
export const CacheIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" fill="url(#cacheGradient)" />
    <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" fill="none" />
    <circle cx="10" cy="14" r="2" fill="white" />
    <path d="M14 14h2M8 18h8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <defs>
      <linearGradient id="cacheGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#DC2626" />
        <stop offset="100%" stopColor="#EF4444" />
      </linearGradient>
    </defs>
  </svg>
);

// Monitoring Icon
export const MonitoringIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" fill="url(#monitoringGradient)" />
    <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="2" />
    <path d="M6 9l3 3 2-2 3 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="6" cy="9" r="1" fill="white" />
    <circle cx="9" cy="12" r="1" fill="white" />
    <circle cx="11" cy="10" r="1" fill="white" />
    <circle cx="14" cy="13" r="1" fill="white" />
    <defs>
      <linearGradient id="monitoringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
    </defs>
  </svg>
);

// Security Icon
export const SecurityIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" fill="url(#securityGradient)" />
    <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <defs>
      <linearGradient id="securityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7C3AED" />
        <stop offset="100%" stopColor="#A855F7" />
      </linearGradient>
    </defs>
  </svg>
);

// Round Robin Icon
export const RoundRobinIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M16 12l-4-4v8l4-4z" fill="currentColor" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
    <defs>
      <animateTransform
        attributeName="transform"
        attributeType="XML"
        type="rotate"
        from="0 12 12"
        to="360 12 12"
        dur="3s"
        repeatCount="indefinite"
      />
    </defs>
  </svg>
);

// Analytics Icon
export const AnalyticsIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="8" width="4" height="13" rx="1" fill="currentColor" opacity="0.8" />
    <rect x="10" y="4" width="4" height="17" rx="1" fill="currentColor" />
    <rect x="17" y="12" width="4" height="9" rx="1" fill="currentColor" opacity="0.6" />
    <path d="M3 3l6 6 4-4 8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Load Balancer Icon
export const LoadBalancerIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="2" y="10" width="20" height="4" rx="2" fill="currentColor" />
    <circle cx="6" cy="6" r="2" fill="currentColor" opacity="0.7" />
    <circle cx="12" cy="6" r="2" fill="currentColor" opacity="0.7" />
    <circle cx="18" cy="6" r="2" fill="currentColor" opacity="0.7" />
    <circle cx="6" cy="18" r="2" fill="currentColor" opacity="0.7" />
    <circle cx="12" cy="18" r="2" fill="currentColor" opacity="0.7" />
    <circle cx="18" cy="18" r="2" fill="currentColor" opacity="0.7" />
    <path d="M6 8v2M12 8v2M18 8v2M6 14v2M12 14v2M18 14v2" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export default {
  PerformanceIcon,
  CostIcon,
  LatencyIcon,
  CompatibilityIcon,
  RouterIcon,
  DatabaseIcon,
  CacheIcon,
  MonitoringIcon,
  SecurityIcon,
  RoundRobinIcon,
  AnalyticsIcon,
  LoadBalancerIcon,
};