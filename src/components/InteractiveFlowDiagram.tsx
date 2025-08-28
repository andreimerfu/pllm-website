import React, { useState, useCallback, useEffect } from 'react';
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  Handle,
  Position,
  MarkerType,
  type Node,
  type Edge,
  type OnConnect,
} from '@xyflow/react';
import { Icon } from '@iconify/react';
import '@xyflow/react/dist/style.css';

// Custom Node Components
const RequestNode = ({ data }: { data: any }) => (
  <div className="px-4 py-3 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full font-bold text-sm shadow-lg">
    <Handle type="target" position={Position.Left} />
    {data.label}
    <Handle type="source" position={Position.Right} />
  </div>
);

const GatewayNode = ({ data }: { data: any }) => (
  <div className="px-6 py-4 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg font-semibold shadow-lg border-2 border-purple-400">
    <Handle type="target" position={Position.Left} />
    <div className="text-center">
      <div className="font-bold">{data.label}</div>
      <div className="text-xs mt-1 opacity-90">Intelligent Routing</div>
    </div>
    <Handle type="source" position={Position.Right} />
  </div>
);

const ProviderNode = ({ data }: { data: any }) => (
  <div className={`px-4 py-3 text-white rounded-lg font-semibold shadow-lg ${data.bgColor} border-2 ${data.borderColor}`}>
    <Handle type="target" position={Position.Left} />
    <div className="text-center">
      <div className="flex items-center justify-center mb-2">
        <Icon icon={data.icon} className="w-6 h-6 mr-2" />
        <div className="font-bold text-sm">{data.label}</div>
      </div>
      <div className="flex justify-center items-center">
        <div className={`w-2 h-2 rounded-full ${data.status === 'healthy' ? 'bg-green-300' : data.status === 'degraded' ? 'bg-yellow-300' : 'bg-red-300'}`}></div>
        <span className="text-xs ml-1">{data.status}</span>
      </div>
    </div>
    <Handle type="source" position={Position.Right} />
  </div>
);

const CircuitBreakerNode = ({ data }: { data: any }) => (
  <div className="px-4 py-3 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-lg font-semibold shadow-lg border-2 border-red-400">
    <Handle type="target" position={Position.Left} />
    <div className="text-center">
      <div className="font-bold text-sm">{data.label}</div>
      <div className="flex justify-center items-center mt-2">
        <div className={`w-3 h-3 rounded-full ${data.active ? 'bg-red-300' : 'bg-gray-300'} animate-pulse`}></div>
      </div>
    </div>
  </div>
);

const nodeTypes = {
  request: RequestNode,
  gateway: GatewayNode,
  provider: ProviderNode,
  circuitBreaker: CircuitBreakerNode,
};

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'request',
    position: { x: 50, y: 200 },
    data: { label: 'Client Request' },
    sourcePosition: Position.Right,
  },
  {
    id: '2',
    type: 'gateway',
    position: { x: 350, y: 200 },
    data: { label: 'pLLM Gateway' },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '3',
    type: 'provider',
    position: { x: 650, y: 80 },
    data: { 
      label: 'OpenAI', 
      icon: 'simple-icons:openai',
      status: 'healthy',
      bgColor: 'bg-gradient-to-br from-green-500 to-green-600',
      borderColor: 'border-green-400'
    },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
  },
  {
    id: '4',
    type: 'provider',
    position: { x: 650, y: 160 },
    data: { 
      label: 'Anthropic', 
      icon: 'simple-icons:anthropic',
      status: 'degraded',
      bgColor: 'bg-gradient-to-br from-orange-500 to-orange-600',
      borderColor: 'border-orange-400'
    },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
  },
  {
    id: '5',
    type: 'provider',
    position: { x: 650, y: 240 },
    data: { 
      label: 'Google', 
      icon: 'simple-icons:google',
      status: 'healthy',
      bgColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
      borderColor: 'border-blue-400'
    },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
  },
  {
    id: '6',
    type: 'circuitBreaker',
    position: { x: 650, y: 320 },
    data: { label: 'Circuit Breaker', active: false },
    targetPosition: Position.Left,
  },
  {
    id: '7',
    type: 'request',
    position: { x: 950, y: 200 },
    data: { label: 'Response' },
    targetPosition: Position.Left,
  },
];

const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    animated: true,
    style: { stroke: '#3B82F6', strokeWidth: 3 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#3B82F6',
    },
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    animated: true,
    style: { stroke: '#10B981', strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#10B981',
    },
  },
  {
    id: 'e2-4',
    source: '2',
    target: '4',
    style: { stroke: '#F59E0B', strokeWidth: 2, strokeDasharray: '5,5' },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#F59E0B',
    },
  },
  {
    id: 'e2-5',
    source: '2',
    target: '5',
    style: { stroke: '#6B7280', strokeWidth: 1, strokeDasharray: '8,8' },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#6B7280',
    },
  },
  {
    id: 'e2-6',
    source: '2',
    target: '6',
    style: { stroke: '#EF4444', strokeWidth: 2, strokeDasharray: '3,3' },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#EF4444',
    },
  },
  {
    id: 'e3-7',
    source: '3',
    target: '7',
    animated: true,
    style: { stroke: '#8B5CF6', strokeWidth: 3 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#8B5CF6',
    },
  },
  {
    id: 'e4-7',
    source: '4',
    target: '7',
    style: { stroke: '#F59E0B', strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#F59E0B',
    },
  },
  {
    id: 'e5-7',
    source: '5',
    target: '7',
    style: { stroke: '#6B7280', strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#6B7280',
    },
  },
];

const InteractiveFlowDiagram: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [simulationMode, setSimulationMode] = useState<'healthy' | 'degraded' | 'failed'>('healthy');

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Simulate different routing scenarios
  useEffect(() => {
    const updateSimulation = () => {
      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.type === 'provider') {
            let newStatus = 'healthy';
            let newBgColor = 'bg-gradient-to-br from-green-500 to-green-600';
            let newBorderColor = 'border-green-400';

            if (simulationMode === 'degraded' && node.id === '3') {
              newStatus = 'degraded';
              newBgColor = 'bg-gradient-to-br from-orange-500 to-orange-600';
              newBorderColor = 'border-orange-400';
            } else if (simulationMode === 'failed' && (node.id === '3' || node.id === '4')) {
              newStatus = 'failed';
              newBgColor = 'bg-gradient-to-br from-red-500 to-red-600';
              newBorderColor = 'border-red-400';
            }

            return {
              ...node,
              data: {
                ...node.data,
                status: newStatus,
                bgColor: newBgColor,
                borderColor: newBorderColor,
              },
            };
          } else if (node.type === 'circuitBreaker') {
            return {
              ...node,
              data: {
                ...node.data,
                active: simulationMode === 'failed',
              },
            };
          }
          return node;
        })
      );

      // Update edge animations based on simulation mode
      setEdges((edges) =>
        edges.map((edge) => {
          let animated = false;
          let strokeWidth = 1;

          if (simulationMode === 'healthy' && (edge.id === 'e1-2' || edge.id === 'e2-3' || edge.id === 'e3-7')) {
            animated = true;
            strokeWidth = 3;
          } else if (simulationMode === 'degraded' && (edge.id === 'e1-2' || edge.id === 'e2-4' || edge.id === 'e4-7')) {
            animated = true;
            strokeWidth = 2;
          } else if (simulationMode === 'failed' && (edge.id === 'e1-2' || edge.id === 'e2-5' || edge.id === 'e5-7')) {
            animated = true;
            strokeWidth = 2;
          }

          return {
            ...edge,
            animated,
            style: {
              ...edge.style,
              strokeWidth,
            },
          };
        })
      );
    };

    updateSimulation();
  }, [simulationMode, setNodes, setEdges]);

  // Auto-iterate through simulation modes
  useEffect(() => {
    const interval = setInterval(() => {
      setSimulationMode(current => {
        switch (current) {
          case 'healthy':
            return 'degraded';
          case 'degraded':
            return 'failed';
          case 'failed':
            return 'healthy';
          default:
            return 'healthy';
        }
      });
    }, 3000); // Change mode every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[500px] bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
      <div className="h-full relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={() => {}}
          onEdgesChange={() => {}}
          onConnect={() => {}}
          nodeTypes={nodeTypes}
          fitView
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          panOnScroll={false}
          panOnDrag={false}
          className="bg-gradient-to-br from-slate-50 to-slate-100"
        >
          <Background color="#e2e8f0" gap={20} />
        </ReactFlow>
        
        {/* Simulation Controls */}
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 border border-slate-200">
          <div className="text-sm font-semibold text-slate-700 mb-2">Simulation Mode</div>
          <div className="flex gap-2">
            <button
              onClick={() => setSimulationMode('healthy')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                simulationMode === 'healthy'
                  ? 'bg-green-100 text-green-700 border border-green-300'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Healthy
            </button>
            <button
              onClick={() => setSimulationMode('degraded')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                simulationMode === 'degraded'
                  ? 'bg-orange-100 text-orange-700 border border-orange-300'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Degraded
            </button>
            <button
              onClick={() => setSimulationMode('failed')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                simulationMode === 'failed'
                  ? 'bg-red-100 text-red-700 border border-red-300'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Failed
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-3 border border-slate-200">
          <div className="text-xs font-semibold text-slate-700 mb-2">Status Legend</div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-slate-600">Healthy</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-xs text-slate-600">Degraded</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-xs text-slate-600">Failed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveFlowDiagram;