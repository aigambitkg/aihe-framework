import React, { useState } from 'react';
import { FrameworkErgebnis } from '@/lib/framework-calculations';

interface GaugeChartProps {
  value: number;
  title: string;
  description: string;
  color: string;
  min?: number;
  max?: number;
  thresholds?: { value: number; label: string; color: string }[];
}

export function GaugeChart({
  value,
  title,
  description,
  color,
  min = 0,
  max = 1,
  thresholds = [
    { value: 0.2, label: 'Kritisch', color: 'text-red-500' },
    { value: 0.4, label: 'Schwach', color: 'text-orange-500' },
    { value: 0.6, label: 'Moderat', color: 'text-yellow-500' },
    { value: 0.8, label: 'Gut', color: 'text-green-500' },
    { value: 1.0, label: 'Exzellent', color: 'text-emerald-500' }
  ]
}: GaugeChartProps) {
  const [hoveredThreshold, setHoveredThreshold] = useState<number | null>(null);
  
  // Calculate percentage for the gauge
  const percentage = ((value - min) / (max - min)) * 100;
  
  // Calculate rotation angle for the needle (from -90 to 90 degrees)
  const needleRotation = -90 + (percentage * 180) / 100;
  
  // Find the current threshold
  const currentThreshold = thresholds.findIndex(t => value <= t.value);
  const thresholdLabel = currentThreshold >= 0 ? thresholds[currentThreshold].label : thresholds[thresholds.length - 1].label;
  const thresholdColor = currentThreshold >= 0 ? thresholds[currentThreshold].color : thresholds[thresholds.length - 1].color;
  
  // Format value as percentage
  const formattedValue = `${(value * 100).toFixed(1)}%`;
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{description}</p>
      </div>
      
      <div className="relative h-40 w-full">
        {/* Gauge background */}
        <div className="absolute top-0 left-0 w-full h-full flex justify-center">
          <div className="w-full h-[8rem] overflow-hidden relative">
            <div className="absolute bottom-0 left-0 w-full h-full rounded-t-full bg-gray-200 dark:bg-gray-700"></div>
          </div>
        </div>
        
        {/* Threshold markers */}
        {thresholds.map((threshold, index) => {
          const markerPercentage = ((threshold.value - min) / (max - min)) * 100;
          const markerRotation = -90 + (markerPercentage * 180) / 100;
          
          return (
            <div 
              key={index}
              className="absolute bottom-0 left-1/2 origin-bottom h-[7.5rem] w-[2px]"
              style={{ transform: `translateX(-50%) rotate(${markerRotation}deg)` }}
              onMouseEnter={() => setHoveredThreshold(index)}
              onMouseLeave={() => setHoveredThreshold(null)}
            >
              <div className="h-[0.5rem] w-[2px] bg-gray-400 dark:bg-gray-300"></div>
              {hoveredThreshold === index && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full bg-white dark:bg-slate-700 shadow-md p-1 rounded text-xs whitespace-nowrap z-10">
                  {threshold.label}: {(threshold.value * 100).toFixed(0)}%
                </div>
              )}
            </div>
          );
        })}
        
        {/* Colored gauge fill */}
        <div className="absolute top-0 left-0 w-full h-full flex justify-center">
          <div className="w-full h-[8rem] overflow-hidden relative">
            <div 
              className={`absolute bottom-0 left-0 h-full rounded-t-full ${color}`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
        
        {/* Gauge needle */}
        <div 
          className="absolute bottom-0 left-1/2 origin-bottom h-[7.8rem] w-[3px] bg-gray-800 dark:bg-white"
          style={{ transform: `translateX(-50%) rotate(${needleRotation}deg)` }}
        >
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gray-800 dark:bg-white"></div>
        </div>
        
        {/* Needle base */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-600 border-2 border-gray-800 dark:border-white"></div>
      </div>
      
      <div className="mt-6 text-center">
        <div className="text-3xl font-bold mb-1">{formattedValue}</div>
        <div className={`text-lg font-medium ${thresholdColor}`}>{thresholdLabel}</div>
      </div>
    </div>
  );
}

interface DashboardProps {
  ergebnis: FrameworkErgebnis;
}

export function Dashboard({ ergebnis }: DashboardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <GaugeChart 
        value={ergebnis.eqi}
        title="EQI - Equilibrium Quality Index"
        description="Balance der Entwicklung"
        color="bg-blue-500"
        thresholds={[
          { value: 0.2, label: 'Kritische Unbalance', color: 'text-red-500' },
          { value: 0.4, label: 'Schwache Balance', color: 'text-orange-500' },
          { value: 0.6, label: 'Moderate Balance', color: 'text-yellow-500' },
          { value: 0.8, label: 'Gute Balance', color: 'text-green-500' },
          { value: 1.0, label: 'Exzellente Balance', color: 'text-emerald-500' }
        ]}
      />
      
      <GaugeChart 
        value={ergebnis.rgi}
        title="RGI - Reifegrad-Index"
        description="Unser aktuelles Fundament"
        color="bg-green-500"
        thresholds={[
          { value: 0.25, label: 'Initiale Reife', color: 'text-red-500' },
          { value: 0.5, label: 'Emerging Reife', color: 'text-orange-500' },
          { value: 0.75, label: 'Integrierte Reife', color: 'text-green-500' },
          { value: 1.0, label: 'Transformative Reife', color: 'text-emerald-500' }
        ]}
      />
      
      <GaugeChart 
        value={1 - ergebnis.si} // Invert SI for the gauge (lower is better)
        title="SI - Spannungsindex"
        description="Spannung im System"
        color="bg-amber-500"
        thresholds={[
          { value: 0.2, label: 'Kritische Spannung', color: 'text-red-500' },
          { value: 0.4, label: 'Hohe Spannung', color: 'text-orange-500' },
          { value: 0.6, label: 'Erhöhte Spannung', color: 'text-yellow-500' },
          { value: 0.8, label: 'Moderate Spannung', color: 'text-green-500' },
          { value: 1.0, label: 'Geringe Spannung', color: 'text-emerald-500' }
        ]}
      />
      
      <GaugeChart 
        value={ergebnis.sbs}
        title="SBS - System Balance Score"
        description="Strategischer Gesamtwert"
        color="bg-purple-500"
        thresholds={[
          { value: 0.2, label: 'Kritische Systemunbalance', color: 'text-red-500' },
          { value: 0.4, label: 'Schwache Systembalance', color: 'text-orange-500' },
          { value: 0.6, label: 'Moderate Systembalance', color: 'text-yellow-500' },
          { value: 0.8, label: 'Gute Systembalance', color: 'text-green-500' },
          { value: 1.0, label: 'Exzellente Systembalance', color: 'text-emerald-500' }
        ]}
      />
      
      <GaugeChart 
        value={ergebnis.kontextscore}
        title="Kontextscore"
        description="Komplexitätsgrad unserer Umgebung"
        color="bg-indigo-500"
        thresholds={[
          { value: 0.2, label: 'Sehr geringe Komplexität', color: 'text-emerald-500' },
          { value: 0.4, label: 'Geringe Komplexität', color: 'text-green-500' },
          { value: 0.6, label: 'Mittlere Komplexität', color: 'text-yellow-500' },
          { value: 0.8, label: 'Hohe Komplexität', color: 'text-orange-500' },
          { value: 1.0, label: 'Sehr hohe Komplexität', color: 'text-red-500' }
        ]}
      />
      
      <GaugeChart 
        value={ergebnis.kernradius}
        title="Kernradius"
        description="Spielraum für Standardlösungen"
        color="bg-teal-500"
        thresholds={[
          { value: 0.2, label: 'Sehr geringer Spielraum', color: 'text-red-500' },
          { value: 0.4, label: 'Geringer Spielraum', color: 'text-orange-500' },
          { value: 0.6, label: 'Mittlerer Spielraum', color: 'text-yellow-500' },
          { value: 0.8, label: 'Hoher Spielraum', color: 'text-green-500' },
          { value: 1.0, label: 'Sehr hoher Spielraum', color: 'text-emerald-500' }
        ]}
      />
    </div>
  );
}
