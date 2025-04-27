import React from 'react';

interface MetricCardProps {
  title: string;
  value: number;
  description: string;
  icon?: React.ReactNode;
  color: string;
  suffix?: string;
}

export function MetricCard({
  title,
  value,
  description,
  icon,
  color,
  suffix = '%'
}: MetricCardProps) {
  // Format the value as a percentage with 1 decimal place
  const formattedValue = (value * 100).toFixed(1);
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden">
      <div className={`h-2 ${color}`}></div>
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h3>
            <p className="text-3xl font-bold mt-2">
              {formattedValue}{suffix}
            </p>
          </div>
          {icon && (
            <div className={`p-3 rounded-full ${color.replace('bg-', 'bg-opacity-20 text-')}`}>
              {icon}
            </div>
          )}
        </div>
        <p className="text-gray-600 dark:text-gray-300 mt-4 text-sm">
          {description}
        </p>
      </div>
    </div>
  );
}
