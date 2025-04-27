"use client";

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { MetricCard } from '@/components/metric-card';
import { RadarChart } from '@/components/radar-chart';
import { SpannungsMatrix } from '@/components/spannungs-matrix';
import { Dashboard } from '@/components/dashboard';
import { DimensionComparison } from '@/components/dimension-comparison';
import { DimensionCard } from '@/components/dimension-card';
import { berechneFrameworkErgebnis } from '@/lib/framework-calculations';
import { useState } from 'react';

// Sample data for demonstration
const sampleDimensions = [
  {
    id: 'dim1',
    name: 'Führung & Governance',
    description: 'Governance-Strukturen und ethische Verankerung für KI',
    weight: 0.125,
    kmuWeight: 0.10,
    currentValue: 2.5,
    targetValue: 3.0,
    subdimensions: [
      {
        id: 'sub1',
        name: 'Entscheidungsstruktur',
        description: 'Governance-Strukturen und Entscheidungsprozesse für KI',
        weight: 0.5,
        currentValue: 2.0,
        targetValue: 3.0
      },
      {
        id: 'sub2',
        name: 'Ethikverankerung',
        description: 'Integration ethischer Prinzipien in die KI-Governance',
        weight: 0.5,
        currentValue: 3.0,
        targetValue: 3.0
      }
    ]
  },
  {
    id: 'dim2',
    name: 'Strategie & Alignment',
    description: 'Strategische Verankerung und Ressourcenbereitstellung für KI',
    weight: 0.125,
    kmuWeight: 0.10,
    currentValue: 2.0,
    targetValue: 3.5,
    subdimensions: [
      {
        id: 'sub3',
        name: 'Zielbild',
        description: 'Strategische Verankerung und Zielsetzung für KI',
        weight: 0.5,
        currentValue: 2.0,
        targetValue: 3.5
      },
      {
        id: 'sub4',
        name: 'Ressourcenverankerung',
        description: 'Bereitstellung notwendiger Ressourcen für KI-Initiativen',
        weight: 0.5,
        currentValue: 2.0,
        targetValue: 3.5
      }
    ]
  },
  {
    id: 'dim3',
    name: 'Kultur & Veränderung',
    description: 'Offenheit, Akzeptanz und Innovationsfähigkeit für KI',
    weight: 0.125,
    kmuWeight: 0.15,
    currentValue: 3.0,
    targetValue: 2.5,
    subdimensions: [
      {
        id: 'sub5',
        name: 'AI-Akzeptanz',
        description: 'Offenheit und Akzeptanz für KI in der Organisation',
        weight: 0.5,
        currentValue: 3.0,
        targetValue: 2.5
      },
      {
        id: 'sub6',
        name: 'Innovationsfähigkeit',
        description: 'Fähigkeit zur kontinuierlichen Innovation und Anpassung',
        weight: 0.5,
        currentValue: 3.0,
        targetValue: 2.5
      }
    ]
  },
  {
    id: 'dim4',
    name: 'Kompetenzen & Bildung',
    description: 'KI-bezogenes Wissen und ethisches Bewusstsein',
    weight: 0.125,
    kmuWeight: 0.175,
    currentValue: 1.5,
    targetValue: 3.0,
    subdimensions: [
      {
        id: 'sub7',
        name: 'AI Literacy',
        description: 'KI-bezogenes Wissen und Fähigkeiten in der Organisation',
        weight: 0.5,
        currentValue: 1.5,
        targetValue: 3.0
      },
      {
        id: 'sub8',
        name: 'Ethikbewusstsein',
        description: 'Verständnis für ethische Implikationen von KI',
        weight: 0.5,
        currentValue: 1.5,
        targetValue: 3.0
      }
    ]
  },
  {
    id: 'dim5',
    name: 'Datenqualität & Ethik',
    description: 'Qualität, Verfügbarkeit und ethische Nutzung von Daten',
    weight: 0.125,
    kmuWeight: 0.125,
    currentValue: 2.0,
    targetValue: 3.0,
    subdimensions: [
      {
        id: 'sub9',
        name: 'Datenmanagement',
        description: 'Qualität, Verfügbarkeit und Management von Daten',
        weight: 0.5,
        currentValue: 2.0,
        targetValue: 3.0
      },
      {
        id: 'sub10',
        name: 'Fairness & Transparenz',
        description: 'Ethische Aspekte der Datennutzung und KI-Anwendung',
        weight: 0.5,
        currentValue: 2.0,
        targetValue: 3.0
      }
    ]
  },
  {
    id: 'dim6',
    name: 'Technologieeinsatz',
    description: 'Reifegrad und Innovationszyklus der KI-Technologien',
    weight: 0.125,
    kmuWeight: 0.15,
    currentValue: 3.5,
    targetValue: 2.5,
    subdimensions: [
      {
        id: 'sub11',
        name: 'Tool-Reife',
        description: 'Reifegrad der eingesetzten KI-Technologien',
        weight: 0.5,
        currentValue: 3.5,
        targetValue: 2.5
      },
      {
        id: 'sub12',
        name: 'Innovationszyklus',
        description: 'Prozesse zur kontinuierlichen technologischen Innovation',
        weight: 0.5,
        currentValue: 3.5,
        targetValue: 2.5
      }
    ]
  },
  {
    id: 'dim7',
    name: 'Prozesse & Automatisierung',
    description: 'Integration und Überwachung von KI in Geschäftsprozessen',
    weight: 0.125,
    kmuWeight: 0.10,
    currentValue: 2.5,
    targetValue: 2.0,
    subdimensions: [
      {
        id: 'sub13',
        name: 'Automatisierung',
        description: 'Integration von KI in Geschäftsprozesse',
        weight: 0.5,
        currentValue: 2.5,
        targetValue: 2.0
      },
      {
        id: 'sub14',
        name: 'Monitoring',
        description: 'Überwachung und Steuerung von KI-Systemen',
        weight: 0.5,
        currentValue: 2.5,
        targetValue: 2.0
      }
    ]
  },
  {
    id: 'dim8',
    name: 'Wirkung & Nachhaltigkeit',
    description: 'Messbare Auswirkungen und Nachhaltigkeit der KI-Nutzung',
    weight: 0.125,
    kmuWeight: 0.10,
    currentValue: 1.5,
    targetValue: 2.0,
    subdimensions: [
      {
        id: 'sub15',
        name: 'KPI-Wirkung',
        description: 'Messbare Auswirkungen von KI auf Geschäftskennzahlen',
        weight: 0.5,
        currentValue: 1.5,
        targetValue: 2.0
      },
      {
        id: 'sub16',
        name: 'ESG-Reflexion',
        description: 'Nachhaltigkeit und gesellschaftliche Verantwortung der KI-Nutzung',
        weight: 0.5,
        currentValue: 1.5,
        targetValue: 2.0
      }
    ]
  }
];

const sampleSpannungspaare = [
  {
    id: 'sp1',
    dimensionA: 'dim6', // Technologieeinsatz
    dimensionB: 'dim1', // Führung & Governance
    weight: 0.15,
    kmuWeight: 0.15
  },
  {
    id: 'sp2',
    dimensionA: 'dim2', // Strategie & Alignment
    dimensionB: 'dim8', // Wirkung & Nachhaltigkeit
    weight: 0.12,
    kmuWeight: 0.12
  },
  {
    id: 'sp3',
    dimensionA: 'dim4', // Kompetenzen & Bildung
    dimensionB: 'dim7', // Prozesse & Automatisierung
    weight: 0.14,
    kmuWeight: 0.14
  },
  {
    id: 'sp4',
    dimensionA: 'dim3', // Kultur & Veränderung
    dimensionB: 'dim5', // Datenqualität & Ethik
    weight: 0.12,
    kmuWeight: 0.12
  },
  {
    id: 'sp5',
    dimensionA: 'dim7', // Prozesse & Automatisierung
    dimensionB: 'dim8', // Wirkung & Nachhaltigkeit
    weight: 0.11,
    kmuWeight: 0.11
  },
  {
    id: 'sp6',
    dimensionA: 'dim6', // Technologieeinsatz
    dimensionB: 'dim3', // Kultur & Veränderung
    weight: 0.14,
    kmuWeight: 0.14
  },
  {
    id: 'sp7',
    dimensionA: 'dim1', // Führung & Governance
    dimensionB: 'dim4', // Kompetenzen & Bildung
    weight: 0.12,
    kmuWeight: 0.12
  },
  {
    id: 'sp8',
    dimensionA: 'dim2', // Strategie & Alignment
    dimensionB: 'dim5', // Datenqualität & Ethik
    weight: 0.10,
    kmuWeight: 0.10
  }
];

const sampleKontextfaktoren = [
  { id: 'kf1', kategorie: 'kat1', name: 'Unternehmensgröße', value: 0.5, weight: 0.05, kmuWeight: 0.04 },
  { id: 'kf2', kategorie: 'kat1', name: 'Organisationsstruktur', value: 0.6, weight: 0.05, kmuWeight: 0.03 },
  { id: 'kf3', kategorie: 'kat1', name: 'Hierarchieebenen', value: 0.4, weight: 0.05, kmuWeight: 0.04 },
  { id: 'kf4', kategorie: 'kat1', name: 'Standorte', value: 0.3, weight: 0.05, kmuWeight: 0.04 },
  { id: 'kf5', kategorie: 'kat2', name: 'Branche', value: 0.7, weight: 0.05, kmuWeight: 0.03 },
  { id: 'kf6', kategorie: 'kat2', name: 'Regulierungsgrad', value: 0.6, weight: 0.05, kmuWeight: 0.04 },
  { id: 'kf7', kategorie: 'kat2', name: 'Compliance-Anforderungen', value: 0.5, weight: 0.05, kmuWeight: 0.03 },
  { id: 'kf8', kategorie: 'kat3', name: 'Datenvolumen', value: 0.4, weight: 0.05, kmuWeight: 0.06 },
  { id: 'kf9', kategorie: 'kat3', name: 'Datenkomplexität', value: 0.5, weight: 0.05, kmuWeight: 0.06 },
  { id: 'kf10', kategorie: 'kat3', name: 'IT-Infrastruktur', value: 0.6, weight: 0.05, kmuWeight: 0.07 },
  { id: 'kf11', kategorie: 'kat3', name: 'Technologieaffinität', value: 0.7, weight: 0.05, kmuWeight: 0.06 },
  { id: 'kf12', kategorie: 'kat4', name: 'Wettbewerbsintensität', value: 0.8, weight: 0.05, kmuWeight: 0.07 },
  { id: 'kf13', kategorie: 'kat4', name: 'Marktdynamik', value: 0.7, weight: 0.05, kmuWeight: 0.07 },
  { id: 'kf14', kategorie: 'kat4', name: 'Kundenerwartungen', value: 0.6, weight: 0.05, kmuWeight: 0.06 },
  { id: 'kf15', kategorie: 'kat5', name: 'Datenschutzrisiken', value: 0.5, weight: 0.05, kmuWeight: 0.03 },
  { id: 'kf16', kategorie: 'kat5', name: 'Sicherheitsanforderungen', value: 0.6, weight: 0.05, kmuWeight: 0.04 },
  { id: 'kf17', kategorie: 'kat5', name: 'Reputationsrisiken', value: 0.4, weight: 0.05, kmuWeight: 0.03 },
  { id: 'kf18', kategorie: 'kat6', name: 'Innovationskultur', value: 0.7, weight: 0.05, kmuWeight: 0.08 },
  { id: 'kf19', kategorie: 'kat6', name: 'Veränderungsbereitschaft', value: 0.6, weight: 0.05, kmuWeight: 0.07 }
];

const sampleKategorien = [
  { id: 'kat1', name: 'Unternehmensgröße & Struktur', weight: 0.20, kmuWeight: 0.15 },
  { id: 'kat2', name: 'Branche & Regulierung', weight: 0.15, kmuWeight: 0.10 },
  { id: 'kat3', name: 'Daten & Technologie', weight: 0.20, kmuWeight: 0.25 },
  { id: 'kat4', name: 'Markt & Wettbewerb', weight: 0.15, kmuWeight: 0.20 },
  { id: 'kat5', name: 'Risiko & Sicherheit', weight: 0.15, kmuWeight: 0.10 },
  { id: 'kat6', name: 'Unternehmenskultur', weight: 0.10, kmuWeight: 0.15 },
  { id: 'kat7', name: 'Externe Faktoren', weight: 0.05, kmuWeight: 0.05 }
];

export default function Home() {
  const [isKMU, setIsKMU] = useState(false);
  
  // Calculate framework results
  const ergebnis = berechneFrameworkErgebnis(
    sampleDimensions,
    sampleSpannungspaare,
    sampleKontextfaktoren,
    sampleKategorien,
    isKMU
  );
  
  // Prepare data for radar chart
  const radarData = sampleDimensions.map(dim => ({
    name: dim.name.split(' ')[0],
    currentValue: dim.currentValue,
    targetValue: dim.targetValue
  }));
  
  return (
    <main>
      <Header />
      
      <div className="bg-gray-50 dark:bg-slate-900 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">AIHE-Framework</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              AI: Human Equilibrium Framework für die verantwortungsvolle Integration von KI in Organisationen
            </p>
            
            <div className="mt-6 inline-flex items-center p-1 bg-gray-200 dark:bg-slate-700 rounded-full">
              <button 
                className={`px-4 py-2 rounded-full text-sm font-medium ${!isKMU ? 'bg-white dark:bg-slate-800 shadow-sm' : 'text-gray-600 dark:text-gray-300'}`}
                onClick={() => setIsKMU(false)}
              >
                Standard-Modus
              </button>
              <button 
                className={`px-4 py-2 rounded-full text-sm font-medium ${isKMU ? 'bg-white dark:bg-slate-800 shadow-sm' : 'text-gray-600 dark:text-gray-300'}`}
                onClick={() => setIsKMU(true)}
              >
                KMU-Modus
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <Dashboard ergebnis={ergebnis} />
            </div>
            <div>
              <RadarChart dimensions={radarData} />
            </div>
          </div>
          
          <div className="mb-12">
            <DimensionComparison dimensions={sampleDimensions} />
          </div>
          
          <div className="mb-12">
            <SpannungsMatrix 
              dimensions={sampleDimensions} 
              spannungen={ergebnis.spannungen}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {sampleDimensions.map((dimension, index) => (
              <DimensionCard
                key={dimension.id}
                title={dimension.name}
                description={dimension.description}
                subdimensions={dimension.subdimensions.map(sub => ({
                  name: sub.name,
                  description: sub.description
                }))}
                currentValue={dimension.currentValue}
                targetValue={dimension.targetValue}
                color={[
                  'bg-blue-500',
                  'bg-green-500',
                  'bg-yellow-500',
                  'bg-purple-500',
                  'bg-indigo-500',
                  'bg-red-500',
                  'bg-teal-500',
                  'bg-orange-500'
                ][index % 8]}
              />
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
