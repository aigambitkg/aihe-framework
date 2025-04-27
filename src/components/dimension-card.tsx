import React from 'react';

interface DimensionCardProps {
  title: string;
  description: string;
  subdimensions: { name: string; description: string }[];
  currentValue: number;
  targetValue: number;
  color: string;
}

export function DimensionCard({
  title,
  description,
  subdimensions,
  currentValue,
  targetValue,
  color
}: DimensionCardProps) {
  // Calculate percentage for progress bar
  const percentage = (currentValue / 4) * 100;
  const targetPercentage = (targetValue / 4) * 100;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden">
      <div className={`h-2 ${color}`}></div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Ist-Zustand</span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{currentValue}/4</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className={`${color} h-2.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Soll-Zustand</span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{targetValue}/4</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-gray-500 dark:bg-gray-400 h-2.5 rounded-full" style={{ width: `${targetPercentage}%` }}></div>
          </div>
        </div>
        
        <div className="mt-6">
          <h4 className="text-md font-semibold text-gray-800 dark:text-white mb-2">Subdimensionen</h4>
          <ul className="space-y-2">
            {subdimensions.map((sub, index) => (
              <li key={index} className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">{sub.name}:</span> {sub.description}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
