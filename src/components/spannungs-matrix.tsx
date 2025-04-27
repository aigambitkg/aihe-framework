import React, { useState } from 'react';
import { Dimension } from '@/lib/framework-calculations';

interface SpannungsmatrixProps {
  dimensions: Dimension[];
  spannungen: {
    dimensionA: string;
    dimensionB: string;
    wert: number;
    intensitaet: number;
    richtung: number;
  }[];
}

export function SpannungsMatrix({ dimensions, spannungen }: SpannungsmatrixProps) {
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);
  
  // Create a map for quick dimension lookup
  const dimensionMap = new Map(dimensions.map(d => [d.id, d]));
  
  // Create a map for quick tension lookup
  const spannungMap = new Map<string, { wert: number; intensitaet: number; richtung: number }>();
  spannungen.forEach(s => {
    const key = `${s.dimensionA}-${s.dimensionB}`;
    spannungMap.set(key, { wert: s.wert, intensitaet: s.intensitaet, richtung: s.richtung });
    // Also set the reverse key with negative values
    const reverseKey = `${s.dimensionB}-${s.dimensionA}`;
    spannungMap.set(reverseKey, { 
      wert: -s.wert, 
      intensitaet: s.intensitaet, 
      richtung: -s.richtung 
    });
  });
  
  // Function to get color based on tension value
  const getSpannungColor = (intensitaet: number, richtung: number) => {
    if (intensitaet === 0) return 'bg-gray-100 dark:bg-gray-700';
    
    const intensity = Math.min(Math.round(intensitaet * 5), 5); // Scale from 0-5
    
    if (richtung > 0) {
      // Positive tension (red)
      return `bg-red-${intensity}00`;
    } else {
      // Negative tension (blue)
      return `bg-blue-${intensity}00`;
    }
  };
  
  // Function to get text color based on background color
  const getTextColor = (bgColor: string) => {
    if (bgColor.includes('bg-red-500') || bgColor.includes('bg-blue-500') || 
        bgColor.includes('bg-red-400') || bgColor.includes('bg-blue-400') ||
        bgColor.includes('bg-gray-700')) {
      return 'text-white';
    }
    return 'text-gray-800';
  };
  
  // Function to format tension value
  const formatSpannungValue = (wert: number) => {
    return wert.toFixed(2);
  };
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 overflow-x-auto">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 text-center">Spannungsmatrix</h3>
      
      <div className="relative">
        {hoveredCell && (
          <div className="absolute top-0 right-0 bg-white dark:bg-slate-700 shadow-md p-3 rounded-md text-sm z-10">
            <p className="font-semibold">{hoveredCell}</p>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Spannungswert zeigt die Differenz zwischen den Abweichungen vom Soll-Zustand.
            </p>
          </div>
        )}
        
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="p-2 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-700"></th>
              {dimensions.map(dim => (
                <th 
                  key={dim.id} 
                  className="p-2 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-gray-300 font-medium"
                >
                  {dim.name.split(' ')[0]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dimensions.map(rowDim => (
              <tr key={rowDim.id}>
                <th 
                  className="p-2 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-gray-300 font-medium text-left"
                >
                  {rowDim.name.split(' ')[0]}
                </th>
                {dimensions.map(colDim => {
                  const key = `${rowDim.id}-${colDim.id}`;
                  const spannung = spannungMap.get(key);
                  
                  // Don't show tension with self
                  if (rowDim.id === colDim.id) {
                    return (
                      <td 
                        key={key}
                        className="p-2 border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800"
                      >
                        -
                      </td>
                    );
                  }
                  
                  if (!spannung) {
                    return (
                      <td 
                        key={key}
                        className="p-2 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-700"
                      >
                        N/A
                      </td>
                    );
                  }
                  
                  const bgColor = getSpannungColor(spannung.intensitaet, spannung.richtung);
                  const textColor = getTextColor(bgColor);
                  
                  return (
                    <td 
                      key={key}
                      className={`p-2 border border-gray-200 dark:border-gray-700 ${bgColor} ${textColor} text-center`}
                      onMouseEnter={() => setHoveredCell(`${rowDim.name} → ${colDim.name}: ${formatSpannungValue(spannung.wert)}`)}
                      onMouseLeave={() => setHoveredCell(null)}
                    >
                      {formatSpannungValue(spannung.wert)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-center mt-6 space-x-6">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-400 mr-2"></div>
          <span className="text-sm text-gray-600 dark:text-gray-300">Positive Spannung</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-400 mr-2"></div>
          <span className="text-sm text-gray-600 dark:text-gray-300">Negative Spannung</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-100 dark:bg-gray-700 mr-2"></div>
          <span className="text-sm text-gray-600 dark:text-gray-300">Keine Spannung</span>
        </div>
      </div>
    </div>
  );
}
