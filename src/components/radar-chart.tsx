import React from 'react';

interface RadarChartProps {
  dimensions: {
    name: string;
    currentValue: number;
    targetValue: number;
  }[];
}

export function RadarChart({ dimensions }: RadarChartProps) {
  // This is a placeholder component for the radar chart
  // In a real implementation, we would use a library like Recharts or Chart.js
  // For now, we'll create a simple visualization to represent the concept
  
  const maxValue = 4; // Maximum value on the scale (1-4)
  const centerX = 150; // Center X coordinate
  const centerY = 150; // Center Y coordinate
  const radius = 100; // Radius of the chart
  
  // Calculate points for each dimension
  const calculatePoint = (value: number, index: number, total: number) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const normalizedValue = value / maxValue;
    const x = centerX + radius * normalizedValue * Math.cos(angle);
    const y = centerY + radius * normalizedValue * Math.sin(angle);
    return { x, y };
  };
  
  // Generate points for current values
  const currentPoints = dimensions.map((dim, i) => 
    calculatePoint(dim.currentValue, i, dimensions.length)
  );
  
  // Generate points for target values
  const targetPoints = dimensions.map((dim, i) => 
    calculatePoint(dim.targetValue, i, dimensions.length)
  );
  
  // Generate axis lines and labels
  const axisLines = dimensions.map((dim, i) => {
    const angle = (Math.PI * 2 * i) / dimensions.length - Math.PI / 2;
    const endX = centerX + (radius + 20) * Math.cos(angle);
    const endY = centerY + (radius + 20) * Math.sin(angle);
    const labelX = centerX + (radius + 30) * Math.cos(angle);
    const labelY = centerY + (radius + 30) * Math.sin(angle);
    
    return (
      <g key={i}>
        <line 
          x1={centerX} 
          y1={centerY} 
          x2={endX} 
          y2={endY} 
          stroke="#CBD5E1" 
          strokeWidth="1" 
        />
        <text 
          x={labelX} 
          y={labelY} 
          textAnchor="middle" 
          dominantBaseline="middle" 
          fontSize="10" 
          fill="#64748B"
        >
          {dim.name}
        </text>
      </g>
    );
  });
  
  // Generate concentric circles for the scale
  const circles = [0.25, 0.5, 0.75, 1].map((scale, i) => (
    <circle 
      key={i} 
      cx={centerX} 
      cy={centerY} 
      r={radius * scale} 
      fill="none" 
      stroke="#CBD5E1" 
      strokeWidth="1" 
      strokeDasharray="2,2" 
    />
  ));
  
  // Generate path for current values
  const currentPath = `M ${currentPoints[0].x} ${currentPoints[0].y} ${currentPoints.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ')} Z`;
  
  // Generate path for target values
  const targetPath = `M ${targetPoints[0].x} ${targetPoints[0].y} ${targetPoints.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ')} Z`;
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 text-center">Dimensionen im Überblick</h3>
      <svg width="300" height="300" viewBox="0 0 300 300">
        {/* Background circles */}
        {circles}
        
        {/* Axis lines and labels */}
        {axisLines}
        
        {/* Target value polygon */}
        <path 
          d={targetPath} 
          fill="rgba(148, 163, 184, 0.2)" 
          stroke="#94A3B8" 
          strokeWidth="2" 
          strokeDasharray="5,5" 
        />
        
        {/* Current value polygon */}
        <path 
          d={currentPath} 
          fill="rgba(59, 130, 246, 0.2)" 
          stroke="#3B82F6" 
          strokeWidth="2" 
        />
        
        {/* Points for current values */}
        {currentPoints.map((point, i) => (
          <circle 
            key={i} 
            cx={point.x} 
            cy={point.y} 
            r="4" 
            fill="#3B82F6" 
          />
        ))}
      </svg>
      
      <div className="flex justify-center mt-4 space-x-6">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-500 mr-2"></div>
          <span className="text-sm text-gray-600 dark:text-gray-300">Ist-Zustand</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-slate-400 mr-2"></div>
          <span className="text-sm text-gray-600 dark:text-gray-300">Soll-Zustand</span>
        </div>
      </div>
    </div>
  );
}
