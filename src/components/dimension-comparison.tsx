import React, { useState } from 'react';
import { Dimension } from '@/lib/framework-calculations';

interface DimensionComparisonProps {
  dimensions: Dimension[];
}

export function DimensionComparison({ dimensions }: DimensionComparisonProps) {
  const [selectedDimension, setSelectedDimension] = useState<string | null>(null);
  
  // Sort dimensions by gap (currentValue - targetValue)
  const sortedDimensions = [...dimensions].sort((a, b) => {
    const gapA = a.currentValue - a.targetValue;
    const gapB = b.currentValue - b.targetValue;
    return gapA - gapB; // Sort from most negative to most positive
  });
  
  // Function to get color based on gap
  const getGapColor = (current: number, target: number) => {
    const gap = current - target;
    
    if (gap === 0) return 'bg-gray-200 dark:bg-gray-600';
    if (gap < -1.5) return 'bg-red-500';
    if (gap < -0.5) return 'bg-red-400';
    if (gap < 0) return 'bg-red-300';
    if (gap > 1.5) return 'bg-green-500';
    if (gap > 0.5) return 'bg-green-400';
    return 'bg-green-300';
  };
  
  // Function to get text color based on background color
  const getTextColor = (bgColor: string) => {
    if (bgColor.includes('bg-red-500') || bgColor.includes('bg-red-400') || 
        bgColor.includes('bg-green-500') || bgColor.includes('bg-green-400') ||
        bgColor.includes('bg-gray-600')) {
      return 'text-white';
    }
    return 'text-gray-800';
  };
  
  // Calculate the maximum bar width
  const maxBarWidth = 100; // percentage
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Dimensionen im Vergleich</h3>
      
      <div className="space-y-6">
        {sortedDimensions.map(dimension => {
          const currentPercentage = (dimension.currentValue / 4) * 100;
          const targetPercentage = (dimension.targetValue / 4) * 100;
          const gap = dimension.currentValue - dimension.targetValue;
          const gapColor = getGapColor(dimension.currentValue, dimension.targetValue);
          const textColor = getTextColor(gapColor);
          const isSelected = selectedDimension === dimension.id;
          
          return (
            <div 
              key={dimension.id} 
              className={`p-4 rounded-lg transition-all duration-200 ${isSelected ? 'bg-gray-100 dark:bg-slate-700' : ''}`}
              onClick={() => setSelectedDimension(isSelected ? null : dimension.id)}
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-gray-800 dark:text-white">{dimension.name}</h4>
                <div className={`px-2 py-1 rounded ${gapColor} ${textColor} text-sm font-medium`}>
                  {gap > 0 ? '+' : ''}{gap.toFixed(1)}
                </div>
              </div>
              
              <div className="relative h-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                {/* Target value marker */}
                <div 
                  className="absolute top-0 h-full border-r-2 border-gray-500 dark:border-gray-300 z-10"
                  style={{ left: `${targetPercentage}%` }}
                >
                  <div className="absolute top-full left-0 transform -translate-x-1/2 mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Soll: {dimension.targetValue}
                  </div>
                </div>
                
                {/* Current value bar */}
                <div 
                  className={`h-full ${currentPercentage > targetPercentage ? 'bg-green-400' : 'bg-red-400'}`}
                  style={{ width: `${currentPercentage}%` }}
                >
                  <span className="absolute inset-0 flex items-center pl-2 text-white font-medium">
                    Ist: {dimension.currentValue}
                  </span>
                </div>
              </div>
              
              {isSelected && (
                <div className="mt-4 pl-4 border-l-2 border-gray-300 dark:border-gray-600">
                  <p className="text-gray-600 dark:text-gray-300 mb-3 text-sm">
                    {dimension.description}
                  </p>
                  
                  <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Subdimensionen:</h5>
                  <div className="space-y-3">
                    {dimension.subdimensions.map(sub => (
                      <div key={sub.id}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-600 dark:text-gray-400">{sub.name}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500 dark:text-gray-400">Ist: {sub.currentValue}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">Soll: {sub.targetValue}</span>
                          </div>
                        </div>
                        <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          {/* Target value marker */}
                          <div 
                            className="absolute top-0 h-full border-r-2 border-gray-500 dark:border-gray-300 z-10"
                            style={{ left: `${(sub.targetValue / 4) * 100}%` }}
                          ></div>
                          
                          {/* Current value bar */}
                          <div 
                            className={`h-full ${sub.currentValue > sub.targetValue ? 'bg-green-400' : 'bg-red-400'}`}
                            style={{ width: `${(sub.currentValue / 4) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="flex justify-center mt-6 space-x-6">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-400 mr-2"></div>
          <span className="text-sm text-gray-600 dark:text-gray-300">Unter Soll-Zustand</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-400 mr-2"></div>
          <span className="text-sm text-gray-600 dark:text-gray-300">Über Soll-Zustand</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-200 dark:bg-gray-600 mr-2"></div>
          <span className="text-sm text-gray-600 dark:text-gray-300">Im Soll-Zustand</span>
        </div>
      </div>
    </div>
  );
}
