"use client";

import { useRef, useEffect } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { useState } from 'react';
import { Dimension, berechneFrameworkErgebnis } from '@/lib/framework-calculations';
import { Dashboard } from '@/components/dashboard';
import { RadarChart } from '@/components/radar-chart';
import { DimensionComparison } from '@/components/dimension-comparison';
import { SpannungsMatrix } from '@/components/spannungs-matrix';
import { downloadAssessmentPDF } from '@/lib/pdf-export';

// Sample data for demonstration
const initialDimensions: Dimension[] = [
  {
    id: 'dim1',
    name: 'Führung & Governance',
    description: 'Governance-Strukturen und ethische Verankerung für KI',
    weight: 0.125,
    kmuWeight: 0.10,
    currentValue: 1,
    targetValue: 3.0,
    subdimensions: [
      {
        id: 'sub1',
        name: 'Entscheidungsstruktur',
        description: 'Governance-Strukturen und Entscheidungsprozesse für KI',
        weight: 0.5,
        currentValue: 1,
        targetValue: 3.0
      },
      {
        id: 'sub2',
        name: 'Ethikverankerung',
        description: 'Integration ethischer Prinzipien in die KI-Governance',
        weight: 0.5,
        currentValue: 1,
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
    currentValue: 1,
    targetValue: 3.0,
    subdimensions: [
      {
        id: 'sub3',
        name: 'Zielbild',
        description: 'Strategische Verankerung und Zielsetzung für KI',
        weight: 0.5,
        currentValue: 1,
        targetValue: 3.0
      },
      {
        id: 'sub4',
        name: 'Ressourcenverankerung',
        description: 'Bereitstellung notwendiger Ressourcen für KI-Initiativen',
        weight: 0.5,
        currentValue: 1,
        targetValue: 3.0
      }
    ]
  },
  {
    id: 'dim3',
    name: 'Kultur & Veränderung',
    description: 'Offenheit, Akzeptanz und Innovationsfähigkeit für KI',
    weight: 0.125,
    kmuWeight: 0.15,
    currentValue: 1,
    targetValue: 3.0,
    subdimensions: [
      {
        id: 'sub5',
        name: 'AI-Akzeptanz',
        description: 'Offenheit und Akzeptanz für KI in der Organisation',
        weight: 0.5,
        currentValue: 1,
        targetValue: 3.0
      },
      {
        id: 'sub6',
        name: 'Innovationsfähigkeit',
        description: 'Fähigkeit zur kontinuierlichen Innovation und Anpassung',
        weight: 0.5,
        currentValue: 1,
        targetValue: 3.0
      }
    ]
  },
  {
    id: 'dim4',
    name: 'Kompetenzen & Bildung',
    description: 'KI-bezogenes Wissen und ethisches Bewusstsein',
    weight: 0.125,
    kmuWeight: 0.175,
    currentValue: 1,
    targetValue: 3.0,
    subdimensions: [
      {
        id: 'sub7',
        name: 'AI Literacy',
        description: 'KI-bezogenes Wissen und Fähigkeiten in der Organisation',
        weight: 0.5,
        currentValue: 1,
        targetValue: 3.0
      },
      {
        id: 'sub8',
        name: 'Ethikbewusstsein',
        description: 'Verständnis für ethische Implikationen von KI',
        weight: 0.5,
        currentValue: 1,
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
    currentValue: 1,
    targetValue: 3.0,
    subdimensions: [
      {
        id: 'sub9',
        name: 'Datenmanagement',
        description: 'Qualität, Verfügbarkeit und Management von Daten',
        weight: 0.5,
        currentValue: 1,
        targetValue: 3.0
      },
      {
        id: 'sub10',
        name: 'Fairness & Transparenz',
        description: 'Ethische Aspekte der Datennutzung und KI-Anwendung',
        weight: 0.5,
        currentValue: 1,
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
    currentValue: 1,
    targetValue: 3.0,
    subdimensions: [
      {
        id: 'sub11',
        name: 'Tool-Reife',
        description: 'Reifegrad der eingesetzten KI-Technologien',
        weight: 0.5,
        currentValue: 1,
        targetValue: 3.0
      },
      {
        id: 'sub12',
        name: 'Innovationszyklus',
        description: 'Prozesse zur kontinuierlichen technologischen Innovation',
        weight: 0.5,
        currentValue: 1,
        targetValue: 3.0
      }
    ]
  },
  {
    id: 'dim7',
    name: 'Prozesse & Automatisierung',
    description: 'Integration und Überwachung von KI in Geschäftsprozessen',
    weight: 0.125,
    kmuWeight: 0.10,
    currentValue: 1,
    targetValue: 3.0,
    subdimensions: [
      {
        id: 'sub13',
        name: 'Automatisierung',
        description: 'Integration von KI in Geschäftsprozesse',
        weight: 0.5,
        currentValue: 1,
        targetValue: 3.0
      },
      {
        id: 'sub14',
        name: 'Monitoring',
        description: 'Überwachung und Steuerung von KI-Systemen',
        weight: 0.5,
        currentValue: 1,
        targetValue: 3.0
      }
    ]
  },
  {
    id: 'dim8',
    name: 'Wirkung & Nachhaltigkeit',
    description: 'Messbare Auswirkungen und Nachhaltigkeit der KI-Nutzung',
    weight: 0.125,
    kmuWeight: 0.10,
    currentValue: 1,
    targetValue: 3.0,
    subdimensions: [
      {
        id: 'sub15',
        name: 'KPI-Wirkung',
        description: 'Messbare Auswirkungen von KI auf Geschäftskennzahlen',
        weight: 0.5,
        currentValue: 1,
        targetValue: 3.0
      },
      {
        id: 'sub16',
        name: 'ESG-Reflexion',
        description: 'Nachhaltigkeit und gesellschaftliche Verantwortung der KI-Nutzung',
        weight: 0.5,
        currentValue: 1,
        targetValue: 3.0
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

export default function Assessment() {
  const [isKMU, setIsKMU] = useState(false);
  const [dimensions, setDimensions] = useState<Dimension[]>(initialDimensions);
  const [activeStep, setActiveStep] = useState(1);
  const [showResults, setShowResults] = useState(false);
  
  // Refs for PDF export
  const radarChartRef = useRef<HTMLDivElement>(null);
  const dimensionComparisonRef = useRef<HTMLDivElement>(null);
  const spannungsMatrixRef = useRef<HTMLDivElement>(null);
  
  // Calculate framework results
  const ergebnis = berechneFrameworkErgebnis(
    dimensions,
    sampleSpannungspaare,
    sampleKontextfaktoren,
    sampleKategorien,
    isKMU
  );
  
  // Prepare data for radar chart
  const radarData = dimensions.map(dim => ({
    name: dim.name.split(' ')[0],
    currentValue: dim.currentValue,
    targetValue: dim.targetValue
  }));
  
  // Handle dimension value change
  const handleDimensionChange = (dimensionId: string, value: number, isTarget: boolean = false) => {
    setDimensions(prevDimensions => 
      prevDimensions.map(dim => 
        dim.id === dimensionId 
          ? { 
              ...dim, 
              [isTarget ? 'targetValue' : 'currentValue']: value,
              subdimensions: dim.subdimensions.map(sub => ({
                ...sub,
                [isTarget ? 'targetValue' : 'currentValue']: value
              }))
            } 
          : dim
      )
    );
  };
  
  // Handle subdimension value change
  const handleSubdimensionChange = (dimensionId: string, subdimensionId: string, value: number, isTarget: boolean = false) => {
    setDimensions(prevDimensions => 
      prevDimensions.map(dim => {
        if (dim.id !== dimensionId) return dim;
        
        // Update the specific subdimension
        const updatedSubdimensions = dim.subdimensions.map(sub => 
          sub.id === subdimensionId 
            ? { ...sub, [isTarget ? 'targetValue' : 'currentValue']: value } 
            : sub
        );
        
        // Calculate new dimension value as average of subdimensions
        const newDimensionValue = updatedSubdimensions.reduce(
          (sum, sub) => sum + (isTarget ? sub.targetValue : sub.currentValue), 
          0
        ) / updatedSubdimensions.length;
        
        return { 
          ...dim, 
          [isTarget ? 'targetValue' : 'currentValue']: newDimensionValue,
          subdimensions: updatedSubdimensions
        };
      })
    );
  };
  
  // Reset assessment
  const resetAssessment = () => {
    setDimensions(initialDimensions);
    setActiveStep(1);
    setShowResults(false);
  };
  
  // Handle PDF export
  const handleExportPDF = () => {
    if (radarChartRef.current && dimensionComparisonRef.current && spannungsMatrixRef.current) {
      downloadAssessmentPDF(
        dimensions,
        ergebnis,
        isKMU,
        radarChartRef.current,
        dimensionComparisonRef.current,
        spannungsMatrixRef.current
      );
    } else {
      alert('Fehler beim Erstellen des PDFs. Bitte versuchen Sie es erneut.');
    }
  };
  
  return (
    <main>
      <Header />
      
      <div className="bg-gray-50 dark:bg-slate-900 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">AIHE-Framework Assessment</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Bewerten Sie die KI-Reife Ihrer Organisation und identifizieren Sie Handlungsfelder
            </p>
            
            {/* Datenschutzhinweis */}
            <div className="mt-4 mb-6 bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-800 rounded-lg p-4 max-w-3xl mx-auto">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-teal-600 dark:text-teal-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-teal-700 dark:text-teal-300 text-left">
                    <strong>Datenschutzhinweis:</strong> Alle eingegebenen Daten werden ausschließlich lokal in Ihrem Browser verarbeitet. 
                    Es findet keine Speicherung oder Übertragung Ihrer Daten an externe Server statt. 
                    Das Assessment erfolgt vollständig anonym und ohne Dokumentation Ihrer Eingaben.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 inline-flex items-center p-1 bg-gray-200 dark:bg-slate-700 rounded-full">
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
          
          {!showResults ? (
            <div className="max-w-4xl mx-auto">
              {/* Progress Steps */}
              <div className="flex justify-between mb-8">
                {[1, 2, 3].map((step) => (
                  <div 
                    key={step} 
                    className={`flex-1 text-center ${step < activeStep ? 'text-teal-600 dark:text-teal-400' : step === activeStep ? 'text-gray-800 dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}
                  >
                    <div className="relative">
                      <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 absolute top-4 left-0"></div>
                      <div 
                        className={`h-1 absolute top-4 left-0 ${step <= activeStep ? 'bg-teal-600 dark:bg-teal-400' : 'bg-gray-200 dark:bg-gray-700'}`}
                        style={{ width: step < activeStep ? '100%' : step === activeStep ? '50%' : '0%' }}
                      ></div>
                      <div 
                        className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${
                          step < activeStep 
                            ? 'bg-teal-600 dark:bg-teal-500 text-white' 
                            : step === activeStep 
                              ? 'bg-white dark:bg-slate-800 border-2 border-teal-600 dark:border-teal-400 text-teal-600 dark:text-teal-400' 
                              : 'bg-white dark:bg-slate-800 border-2 border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500'
                        }`}
                      >
                        {step < activeStep ? (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        ) : (
                          step
                        )}
                      </div>
                    </div>
                    <div className="mt-2 text-sm font-medium">
                      {step === 1 ? 'Ist-Zustand' : step === 2 ? 'Soll-Zustand' : 'Überprüfung'}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Step 1: Current State */}
              {activeStep === 1 && (
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Bewertung des Ist-Zustands</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Bewerten Sie den aktuellen Reifegrad Ihrer Organisation in den acht Dimensionen des AIHE-Frameworks.
                  </p>
                  
                  <div className="space-y-8">
                    {dimensions.map((dimension) => (
                      <div key={dimension.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">{dimension.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{dimension.description}</p>
                        
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Gesamtbewertung: {dimension.currentValue.toFixed(1)}
                          </label>
                          <input
                            type="range"
                            min="1"
                            max="4"
                            step="0.1"
                            value={dimension.currentValue}
                            onChange={(e) => handleDimensionChange(dimension.id, parseFloat(e.target.value))}
                            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                          />
                          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                            <span>1 - Initial</span>
                            <span>2 - Emerging</span>
                            <span>3 - Integrated</span>
                            <span>4 - Transformative</span>
                          </div>
                        </div>
                        
                        <div className="space-y-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Subdimensionen</h4>
                          
                          {dimension.subdimensions.map((sub) => (
                            <div key={sub.id}>
                              <div className="flex justify-between mb-1">
                                <label className="text-sm text-gray-700 dark:text-gray-300">{sub.name}</label>
                                <span className="text-sm text-gray-600 dark:text-gray-400">{sub.currentValue.toFixed(1)}</span>
                              </div>
                              <input
                                type="range"
                                min="1"
                                max="4"
                                step="0.1"
                                value={sub.currentValue}
                                onChange={(e) => handleSubdimensionChange(dimension.id, sub.id, parseFloat(e.target.value))}
                                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 flex justify-end">
                    <button
                      onClick={() => setActiveStep(2)}
                      className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors"
                    >
                      Weiter zu Soll-Zustand
                    </button>
                  </div>
                </div>
              )}
              
              {/* Step 2: Target State */}
              {activeStep === 2 && (
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Definition des Soll-Zustands</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Definieren Sie den angestrebten Reifegrad Ihrer Organisation in den acht Dimensionen des AIHE-Frameworks.
                  </p>
                  
                  <div className="space-y-8">
                    {dimensions.map((dimension) => (
                      <div key={dimension.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">{dimension.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{dimension.description}</p>
                        
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Gesamtbewertung: {dimension.targetValue.toFixed(1)}
                          </label>
                          <input
                            type="range"
                            min="1"
                            max="4"
                            step="0.1"
                            value={dimension.targetValue}
                            onChange={(e) => handleDimensionChange(dimension.id, parseFloat(e.target.value), true)}
                            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                          />
                          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                            <span>1 - Initial</span>
                            <span>2 - Emerging</span>
                            <span>3 - Integrated</span>
                            <span>4 - Transformative</span>
                          </div>
                        </div>
                        
                        <div className="space-y-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Subdimensionen</h4>
                          
                          {dimension.subdimensions.map((sub) => (
                            <div key={sub.id}>
                              <div className="flex justify-between mb-1">
                                <label className="text-sm text-gray-700 dark:text-gray-300">{sub.name}</label>
                                <span className="text-sm text-gray-600 dark:text-gray-400">{sub.targetValue.toFixed(1)}</span>
                              </div>
                              <input
                                type="range"
                                min="1"
                                max="4"
                                step="0.1"
                                value={sub.targetValue}
                                onChange={(e) => handleSubdimensionChange(dimension.id, sub.id, parseFloat(e.target.value), true)}
                                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 flex justify-between">
                    <button
                      onClick={() => setActiveStep(1)}
                      className="px-6 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium rounded-lg transition-colors"
                    >
                      Zurück zu Ist-Zustand
                    </button>
                    <button
                      onClick={() => setActiveStep(3)}
                      className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors"
                    >
                      Weiter zur Überprüfung
                    </button>
                  </div>
                </div>
              )}
              
              {/* Step 3: Review */}
              {activeStep === 3 && (
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Überprüfung und Zusammenfassung</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Überprüfen Sie Ihre Bewertungen und sehen Sie eine Vorschau der Ergebnisse.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Ist-Zustand</h3>
                      <div className="space-y-2">
                        {dimensions.map((dimension) => (
                          <div key={dimension.id} className="flex justify-between items-center">
                            <span className="text-sm text-gray-700 dark:text-gray-300">{dimension.name}</span>
                            <span className="text-sm font-medium text-gray-800 dark:text-white">{dimension.currentValue.toFixed(1)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Soll-Zustand</h3>
                      <div className="space-y-2">
                        {dimensions.map((dimension) => (
                          <div key={dimension.id} className="flex justify-between items-center">
                            <span className="text-sm text-gray-700 dark:text-gray-300">{dimension.name}</span>
                            <span className="text-sm font-medium text-gray-800 dark:text-white">{dimension.targetValue.toFixed(1)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 mb-8">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Vorläufige Ergebnisse</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-white dark:bg-slate-800 rounded-lg p-3 shadow-sm">
                        <div className="text-sm text-gray-500 dark:text-gray-400">EQI</div>
                        <div className="text-xl font-bold text-gray-800 dark:text-white">{(ergebnis.eqi * 100).toFixed(1)}%</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Balance der Entwicklung</div>
                      </div>
                      <div className="bg-white dark:bg-slate-800 rounded-lg p-3 shadow-sm">
                        <div className="text-sm text-gray-500 dark:text-gray-400">RGI</div>
                        <div className="text-xl font-bold text-gray-800 dark:text-white">{(ergebnis.rgi * 100).toFixed(1)}%</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Aktuelles Fundament</div>
                      </div>
                      <div className="bg-white dark:bg-slate-800 rounded-lg p-3 shadow-sm">
                        <div className="text-sm text-gray-500 dark:text-gray-400">SI</div>
                        <div className="text-xl font-bold text-gray-800 dark:text-white">{(ergebnis.si * 100).toFixed(1)}%</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Spannung im System</div>
                      </div>
                      <div className="bg-white dark:bg-slate-800 rounded-lg p-3 shadow-sm">
                        <div className="text-sm text-gray-500 dark:text-gray-400">SBS</div>
                        <div className="text-xl font-bold text-gray-800 dark:text-white">{(ergebnis.sbs * 100).toFixed(1)}%</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Strategischer Gesamtwert</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-between">
                    <button
                      onClick={() => setActiveStep(2)}
                      className="px-6 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium rounded-lg transition-colors"
                    >
                      Zurück zu Soll-Zustand
                    </button>
                    <button
                      onClick={() => setShowResults(true)}
                      className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors"
                    >
                      Ergebnisse anzeigen
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              {/* Results Dashboard */}
              <div className="mb-8">
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 mb-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">Ergebnisse des AIHE-Framework Assessments</h2>
                    <div className="flex space-x-4">
                      <button
                        onClick={resetAssessment}
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium rounded-lg transition-colors"
                      >
                        Neues Assessment
                      </button>
                      <button
                        onClick={handleExportPDF}
                        className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors"
                      >
                        Als PDF exportieren
                      </button>
                    </div>
                  </div>
                  
                  <Dashboard ergebnis={ergebnis} isKMU={isKMU} />
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Dimensionsübersicht</h3>
                    <div className="h-80" ref={radarChartRef}>
                      <RadarChart data={radarData} />
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Ist-Soll Vergleich</h3>
                    <div ref={dimensionComparisonRef}>
                      <DimensionComparison dimensions={dimensions} />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Spannungsmatrix</h3>
                  <div ref={spannungsMatrixRef}>
                    <SpannungsMatrix 
                      dimensions={dimensions} 
                      spannungspaare={sampleSpannungspaare} 
                      isKMU={isKMU} 
                    />
                  </div>
                </div>
                
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Handlungsempfehlungen</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Prioritäre Handlungsfelder</h4>
                      <div className="space-y-3">
                        {dimensions
                          .sort((a, b) => (b.targetValue - b.currentValue) - (a.targetValue - a.currentValue))
                          .slice(0, 3)
                          .map((dim) => (
                            <div key={dim.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                              <div className="flex justify-between items-center mb-2">
                                <h5 className="font-medium text-gray-800 dark:text-white">{dim.name}</h5>
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm text-gray-600 dark:text-gray-400">Ist: {dim.currentValue.toFixed(1)}</span>
                                  <span className="text-sm text-gray-400 dark:text-gray-500">→</span>
                                  <span className="text-sm text-gray-600 dark:text-gray-400">Soll: {dim.targetValue.toFixed(1)}</span>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{dim.description}</p>
                              <div className="space-y-2">
                                <h6 className="text-sm font-medium text-gray-700 dark:text-gray-300">Empfohlene Maßnahmen:</h6>
                                <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                  {dim.id === 'dim1' && (
                                    <>
                                      <li>Etablierung eines KI-Ethikrats mit klaren Entscheidungskompetenzen</li>
                                      <li>Entwicklung eines KI-Governance-Frameworks mit definierten Verantwortlichkeiten</li>
                                      <li>Integration ethischer Prinzipien in die KI-Strategie und -Entwicklung</li>
                                    </>
                                  )}
                                  {dim.id === 'dim2' && (
                                    <>
                                      <li>Entwicklung einer umfassenden KI-Strategie mit klaren Zielen und Metriken</li>
                                      <li>Allokation dedizierter Ressourcen für KI-Initiativen</li>
                                      <li>Alignment der KI-Strategie mit der Gesamtunternehmensstrategie</li>
                                    </>
                                  )}
                                  {dim.id === 'dim3' && (
                                    <>
                                      <li>Durchführung von Awareness-Workshops zu KI-Themen für alle Mitarbeiter</li>
                                      <li>Etablierung einer offenen Feedback-Kultur für KI-Initiativen</li>
                                      <li>Förderung von Innovation durch dedizierte Zeit und Ressourcen</li>
                                    </>
                                  )}
                                  {dim.id === 'dim4' && (
                                    <>
                                      <li>Entwicklung eines KI-Schulungsprogramms für verschiedene Zielgruppen</li>
                                      <li>Aufbau interner KI-Expertise durch gezielte Weiterbildung</li>
                                      <li>Sensibilisierung für ethische Aspekte der KI-Nutzung</li>
                                    </>
                                  )}
                                  {dim.id === 'dim5' && (
                                    <>
                                      <li>Implementierung eines systematischen Datenqualitätsmanagements</li>
                                      <li>Entwicklung von Standards für faire und transparente KI-Systeme</li>
                                      <li>Etablierung von Prozessen zur regelmäßigen Überprüfung der Datenqualität</li>
                                    </>
                                  )}
                                  {dim.id === 'dim6' && (
                                    <>
                                      <li>Evaluation und Auswahl geeigneter KI-Tools für spezifische Anwendungsfälle</li>
                                      <li>Etablierung eines strukturierten Innovationsprozesses für KI-Technologien</li>
                                      <li>Regelmäßige Bewertung neuer KI-Technologien und -Trends</li>
                                    </>
                                  )}
                                  {dim.id === 'dim7' && (
                                    <>
                                      <li>Identifikation von Prozessen mit hohem Automatisierungspotenzial</li>
                                      <li>Implementierung von KI-basierten Automatisierungslösungen</li>
                                      <li>Etablierung eines systematischen Monitorings für KI-Systeme</li>
                                    </>
                                  )}
                                  {dim.id === 'dim8' && (
                                    <>
                                      <li>Entwicklung von KPIs zur Messung der KI-Wirkung</li>
                                      <li>Integration von Nachhaltigkeitsaspekten in KI-Projekte</li>
                                      <li>Regelmäßige Evaluation der KI-Wirkung auf Geschäftsergebnisse</li>
                                    </>
                                  )}
                                </ul>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Spannungsfelder adressieren</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        Basierend auf der Spannungsanalyse sollten folgende Spannungsfelder prioritär adressiert werden:
                      </p>
                      <div className="space-y-3">
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <h5 className="font-medium text-gray-800 dark:text-white mb-2">Technologieeinsatz ↔ Führung & Governance</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                            Die Spannung zwischen technologischer Innovation und Governance-Strukturen erfordert eine Balance zwischen Flexibilität und Kontrolle.
                          </p>
                          <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-300 space-y-1">
                            <li>Entwicklung agiler Governance-Prozesse, die Innovation fördern und gleichzeitig Risiken minimieren</li>
                            <li>Etablierung eines Technology Review Boards mit Vertretern aus Technologie und Governance</li>
                            <li>Regelmäßige Überprüfung und Anpassung der Governance-Strukturen an technologische Entwicklungen</li>
                          </ul>
                        </div>
                        
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <h5 className="font-medium text-gray-800 dark:text-white mb-2">Kompetenzen & Bildung ↔ Prozesse & Automatisierung</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                            Die Spannung zwischen Kompetenzentwicklung und Automatisierung erfordert eine Balance zwischen menschlicher Expertise und automatisierten Prozessen.
                          </p>
                          <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-300 space-y-1">
                            <li>Entwicklung von Schulungsprogrammen, die Mitarbeiter auf die Zusammenarbeit mit KI-Systemen vorbereiten</li>
                            <li>Identifikation von Prozessen, die menschliche Expertise erfordern, und solchen, die automatisiert werden können</li>
                            <li>Etablierung von Feedback-Mechanismen, um kontinuierliche Verbesserungen zu ermöglichen</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Nächste Schritte</h4>
                      <ol className="list-decimal pl-5 text-sm text-gray-600 dark:text-gray-300 space-y-2">
                        <li>
                          <strong>Aktionsplan entwickeln:</strong> Erstellen Sie einen detaillierten Aktionsplan mit konkreten Maßnahmen, Verantwortlichkeiten und Zeitplänen.
                        </li>
                        <li>
                          <strong>Quick Wins identifizieren:</strong> Identifizieren Sie Maßnahmen, die mit geringem Aufwand schnell umgesetzt werden können und sichtbare Ergebnisse liefern.
                        </li>
                        <li>
                          <strong>Ressourcen allokieren:</strong> Stellen Sie sicher, dass ausreichend Ressourcen (Zeit, Budget, Personal) für die Umsetzung der Maßnahmen zur Verfügung stehen.
                        </li>
                        <li>
                          <strong>Fortschritt messen:</strong> Etablieren Sie ein regelmäßiges Monitoring des Fortschritts und passen Sie den Aktionsplan bei Bedarf an.
                        </li>
                        <li>
                          <strong>Reassessment durchführen:</strong> Führen Sie in 6-12 Monaten ein erneutes Assessment durch, um den Fortschritt zu evaluieren und neue Handlungsfelder zu identifizieren.
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
