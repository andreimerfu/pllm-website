import React, { useEffect } from 'react';

const HeroIllustration: React.FC = () => {
  return (
    <div className="relative w-full max-w-5xl mx-auto mt-16 mb-8">
      <svg
        viewBox="0 0 900 450"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          
          <linearGradient id="secondaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
          
          <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#EF4444" />
          </linearGradient>
          
          {/* Glow filter */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Clean Background */}
        <rect width="100%" height="100%" fill="transparent" />

        {/* Data Flow Animations */}
        <g>
          {/* Data particles flowing from client to gateway */}
          <circle cx="120" cy="225" r="3" fill="#3B82F6" opacity="0.8">
            <animate
              attributeName="cx"
              values="120;350;120"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="140" cy="205" r="2" fill="#8B5CF6" opacity="0.6">
            <animate
              attributeName="cx"
              values="140;370;140"
              dur="2.5s"
              repeatCount="indefinite"
            />
          </circle>
        </g>

        {/* Client Requests */}
        <g transform="translate(50, 175)">
          <rect
            width="100"
            height="80"
            rx="16"
            fill="url(#primaryGradient)"
            filter="url(#glow)"
          />
          <text
            x="50"
            y="45"
            textAnchor="middle"
            fill="white"
            className="text-lg font-bold"
          >
            Clients
          </text>
          
          {/* Request indicators */}
          <g transform="translate(15, 55)">
            <circle cx="10" cy="8" r="2.5" fill="white" opacity="0.8" />
            <circle cx="25" cy="8" r="2.5" fill="white" opacity="0.6" />
            <circle cx="40" cy="8" r="2.5" fill="white" opacity="0.9" />
            <circle cx="55" cy="8" r="2.5" fill="white" opacity="0.4" />
            <circle cx="70" cy="8" r="2.5" fill="white" opacity="0.7" />
          </g>
        </g>

        {/* pLLM Gateway - Central Hub */}
        <g transform="translate(320, 130)">
          {/* Main Gateway Container */}
          <rect
            width="260"
            height="160"
            rx="20"
            fill="url(#primaryGradient)"
            stroke="#1E293B"
            strokeWidth="2"
            filter="url(#glow)"
          />
          
          {/* Gateway Title */}
          <text
            x="130"
            y="30"
            textAnchor="middle"
            fill="white"
            className="text-xl font-bold"
          >
            pLLM Gateway
          </text>
          
          {/* Internal Components */}
          <g transform="translate(20, 45)">
            <rect width="65" height="25" rx="6" fill="white" opacity="0.2" />
            <text x="32.5" y="16" textAnchor="middle" fill="white" className="text-sm">
              Router
            </text>
          </g>
          
          <g transform="translate(95, 45)">
            <rect width="65" height="25" rx="6" fill="white" opacity="0.2" />
            <text x="32.5" y="16" textAnchor="middle" fill="white" className="text-sm">
              Auth
            </text>
          </g>
          
          <g transform="translate(170, 45)">
            <rect width="65" height="25" rx="6" fill="white" opacity="0.2" />
            <text x="32.5" y="16" textAnchor="middle" fill="white" className="text-sm">
              Cache
            </text>
          </g>
          
          {/* Load Balancer */}
          <g transform="translate(20, 85)">
            <rect width="220" height="50" rx="8" fill="white" opacity="0.15" />
            <text x="110" y="20" textAnchor="middle" fill="white" className="text-sm font-semibold">
              Intelligent Load Balancer
            </text>
            <text x="110" y="38" textAnchor="middle" fill="white" className="text-xs" opacity="0.8">
              Round Robin • Least Busy • Weighted
            </text>
          </g>
        </g>

        {/* Provider Hub - Grouped layout */}
        <g transform="translate(650, 130)">
          {/* Hub container */}
          <rect 
            width="200" 
            height="160" 
            rx="20" 
            fill="white" 
            stroke="#e2e8f0" 
            strokeWidth="2"
            filter="url(#glow)"
          />
          
          <text x="100" y="25" textAnchor="middle" fill="#1e293b" className="text-lg font-semibold">
            AI Providers
          </text>
          
          {/* Provider icons in circular arrangement with better spacing */}
          {/* OpenAI - Top Left */}
          <g transform="translate(80, 45)">
            <foreignObject x="-15" y="-15" width="30" height="30">
              <div className="w-7 h-7 flex items-center justify-center">
                <iconify-icon icon="simple-icons:openai" style={{color: '#00a67e', fontSize: '28px'}}></iconify-icon>
              </div>
            </foreignObject>
            <text x="-10" y="32" textAnchor="middle" fill="#1e293b" className="text-sm font-medium">OpenAI</text>
          </g>
          
          {/* Anthropic - Top Right */}
          <g transform="translate(120, 45)">
            <foreignObject x="-15" y="-15" width="30" height="30">
              <div className="w-7 h-7 flex items-center justify-center">
                <iconify-icon icon="simple-icons:anthropic" style={{color: '#d97706', fontSize: '28px'}}></iconify-icon>
              </div>
            </foreignObject>
            <text x="10" y="32" textAnchor="middle" fill="#1e293b" className="text-sm font-medium">Claude</text>
          </g>
          
          {/* Azure - Right */}
          <g transform="translate(160, 90)">
            <foreignObject x="-15" y="-15" width="30" height="30">
              <div className="w-7 h-7 flex items-center justify-center">
                <iconify-icon icon="simple-icons:microsoftazure" style={{color: '#0078d4', fontSize: '28px'}}></iconify-icon>
              </div>
            </foreignObject>
            <text x="0" y="32" textAnchor="middle" fill="#1e293b" className="text-sm font-medium">Azure</text>
          </g>
          
          {/* AWS Bedrock - Bottom */}
          <g transform="translate(100, 125)">
            <foreignObject x="-15" y="-15" width="30" height="30">
              <div className="w-7 h-7 flex items-center justify-center">
                <iconify-icon icon="simple-icons:amazonaws" style={{color: '#ff9900', fontSize: '28px'}}></iconify-icon>
              </div>
            </foreignObject>
            <text x="0" y="32" textAnchor="middle" fill="#1e293b" className="text-sm font-medium">Bedrock</text>
          </g>
          
          {/* Google Vertex - Left */}
          <g transform="translate(40, 90)">
            <foreignObject x="-15" y="-15" width="30" height="30">
              <div className="w-7 h-7 flex items-center justify-center">
                <iconify-icon icon="simple-icons:googlecloud" style={{color: '#4285f4', fontSize: '28px'}}></iconify-icon>
              </div>
            </foreignObject>
            <text x="0" y="32" textAnchor="middle" fill="#1e293b" className="text-sm font-medium">Vertex</text>
          </g>
          
          {/* Internal connection lines between providers */}
          <g stroke="#3b82f6" strokeWidth="1" fill="none" opacity="0.4">
            {/* Center hub connections */}
            <circle cx="100" cy="85" r="3" fill="#3b82f6">
              <animate
                attributeName="opacity"
                values="0.4;1;0.4"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
            
            {/* Animated connections to center */}
            <path d="M 80 45 L 100 85" strokeDasharray="2,2">
              <animate
                attributeName="stroke-dashoffset"
                values="0;4"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </path>
            <path d="M 120 45 L 100 85" strokeDasharray="2,2">
              <animate
                attributeName="stroke-dashoffset"
                values="0;4"
                dur="1.7s"
                repeatCount="indefinite"
              />
            </path>
            <path d="M 160 90 L 100 85" strokeDasharray="2,2">
              <animate
                attributeName="stroke-dashoffset"
                values="0;4"
                dur="1.9s"
                repeatCount="indefinite"
              />
            </path>
            <path d="M 100 125 L 100 85" strokeDasharray="2,2">
              <animate
                attributeName="stroke-dashoffset"
                values="0;4"
                dur="1.3s"
                repeatCount="indefinite"
              />
            </path>
            <path d="M 40 90 L 100 85" strokeDasharray="2,2">
              <animate
                attributeName="stroke-dashoffset"
                values="0;4"
                dur="1.6s"
                repeatCount="indefinite"
              />
            </path>
          </g>
        </g>

        {/* Connection Lines with animated data flow - Simplified */}
        <g stroke="#3b82f6" strokeWidth="2" fill="none" opacity="0.7">
          {/* Client to Gateway */}
          <path d="M 150 215 L 320 215" strokeDasharray="8,4">
            <animate
              attributeName="stroke-dashoffset"
              values="0;12"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </path>
          
          {/* Gateway to Provider Hub - Single connection */}
          <path d="M 580 210 L 650 210" strokeDasharray="8,4">
            <animate
              attributeName="stroke-dashoffset"
              values="0;12"
              dur="1.8s"
              repeatCount="indefinite"
            />
          </path>
        </g>

        {/* Performance Metrics - Better positioned */}
        <g transform="translate(100, 370)">
          <text className="text-sm font-semibold fill-slate-700">
            High Performance Metrics:
          </text>
          <text x="0" y="20" className="text-sm fill-slate-600">
            • 1000+ concurrent requests
          </text>
          <text x="220" y="20" className="text-sm fill-slate-600">
            • &lt;100ms startup time
          </text>
          <text x="420" y="20" className="text-sm fill-slate-600">
            • 50-80MB memory usage
          </text>
        </g>

        {/* Circuit Breaker Indicator - Better positioned */}
        <g transform="translate(580, 320)">
          <circle cx="25" cy="25" r="18" fill="#EF4444" opacity="0.2" />
          <circle cx="25" cy="25" r="10" fill="#EF4444">
            <animate
              attributeName="opacity"
              values="0.5;1;0.5"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
          <text x="25" y="50" textAnchor="middle" className="text-xs fill-slate-600">
            Circuit Breaker
          </text>
        </g>
      </svg>
    </div>
  );
};

export default HeroIllustration;