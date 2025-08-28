import React, { useState, useEffect } from 'react';

interface ChartData {
  label: string;
  pllm: number;
  typical: number;
  unit: string;
  color: string;
}

const performanceData: ChartData[] = [
  {
    label: 'Concurrent Connections',
    pllm: 1000,
    typical: 100,
    unit: 'connections',
    color: 'bg-blue-500'
  },
  {
    label: 'Memory Usage',
    pllm: 65,
    typical: 225,
    unit: 'MB',
    color: 'bg-green-500'
  },
  {
    label: 'Startup Time',
    pllm: 0.1,
    typical: 3.5,
    unit: 'seconds',
    color: 'bg-purple-500'
  },
  {
    label: 'Response Time',
    pllm: 0.5,
    typical: 2.1,
    unit: 'ms overhead',
    color: 'bg-orange-500'
  }
];

export default function PerformanceChart() {
  const [animatedValues, setAnimatedValues] = useState(performanceData.map(() => ({ pllm: 0, typical: 0 })));
  // Removed hover functionality

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValues(performanceData.map(item => ({ pllm: item.pllm, typical: item.typical })));
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg p-8 border border-slate-200 dark:border-slate-600 transition-colors duration-200">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 transition-colors duration-200">Performance Comparison</h3>
        <p className="text-slate-600 dark:text-slate-400 transition-colors duration-200">pLLM vs Typical Interpreted Gateway</p>
      </div>
      
      <div className="space-y-8">
        {performanceData.map((item, index) => {
          const animatedPllm = animatedValues[index].pllm;
          const animatedTypical = animatedValues[index].typical;
          const pllmPercentage = Math.min((animatedPllm / Math.max(item.pllm, item.typical)) * 100, 100);
          const typicalPercentage = Math.min((animatedTypical / Math.max(item.pllm, item.typical)) * 100, 100);
          const isLowerBetter = item.label.includes('Memory') || item.label.includes('Time');
          const improvementPercent = isLowerBetter 
            ? ((item.typical - item.pllm) / item.typical * 100).toFixed(0)
            : ((item.pllm - item.typical) / item.typical * 100).toFixed(0);
          return (
            <div 
              key={index} 
              className="space-y-4 p-4 rounded-2xl"
            >
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-900 dark:text-white text-lg transition-colors duration-200">{item.label}</h4>
                <div className="px-3 py-1 rounded-full text-sm font-bold bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 transition-colors duration-200">
                  {improvementPercent}% {isLowerBetter ? 'less' : 'more'}
                </div>
              </div>
              
              <div className="space-y-3">
                {/* pLLM Bar */}
                <div className="flex items-center space-x-4">
                  <div className="w-20 text-sm font-bold text-slate-800 dark:text-slate-200 transition-colors duration-200">pLLM</div>
                  <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-8 relative overflow-hidden shadow-inner transition-colors duration-200">
                    <div 
                      className={`h-full rounded-full transition-all duration-2000 ease-out relative ${item.color}`}
                      style={{ width: `${pllmPercentage}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center px-4">
                      <span className="text-sm font-bold text-white drop-shadow-sm">
                        {animatedPllm}{item.unit === 'seconds' ? 's' : item.unit === 'MB' ? 'MB' : item.unit === 'connections' ? '' : ` ${item.unit}`}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Typical Bar */}
                <div className="flex items-center space-x-4">
                  <div className="w-20 text-sm font-medium text-slate-500 dark:text-slate-400 transition-colors duration-200">Typical</div>
                  <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-8 relative overflow-hidden shadow-inner transition-colors duration-200">
                    <div 
                      className="h-full bg-gradient-to-r from-slate-400 to-slate-500 rounded-full transition-all duration-2000 ease-out"
                      style={{ width: `${typicalPercentage}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center px-4">
                      <span className="text-sm font-bold text-white drop-shadow-sm">
                        {animatedTypical}{item.unit === 'seconds' ? 's' : item.unit === 'MB' ? 'MB' : item.unit === 'connections' ? '' : ` ${item.unit}`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Indicator */}
              <div className="flex justify-end">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400 transition-colors duration-200">
                    {isLowerBetter ? 'Lower is better' : 'Higher is better'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 rounded-2xl border border-slate-200 dark:border-slate-600 transition-colors duration-200">
        <div className="flex items-center justify-center space-x-8 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-sm"></div>
            <span className="text-slate-800 dark:text-slate-200 font-semibold transition-colors duration-200">pLLM (Go)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gradient-to-r from-slate-400 to-slate-500 rounded-full shadow-sm"></div>
            <span className="text-slate-800 dark:text-slate-200 font-semibold transition-colors duration-200">Typical Gateway</span>
          </div>
        </div>
        <div className="text-center mt-4">
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium transition-colors duration-200">
            Performance comparison between pLLM and typical gateways
          </p>
        </div>
      </div>
    </div>
  );
}