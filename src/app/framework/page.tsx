"use client";

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Link from 'next/link';

export default function Framework() {
  return (
    <main>
      <Header />
      
      <div className="bg-gray-50 dark:bg-slate-900 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Das AIHE-Framework</h1>
            
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Überblick</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Das AI: Human Equilibrium (AIHE) Framework ist ein umfassendes Bewertungs- und Steuerungsinstrument für die verantwortungsvolle Integration von Künstlicher Intelligenz (KI) in Organisationen. Es basiert auf acht Dimensionen, die technische, ethische, organisationale und menschliche Aspekte der KI-Integration abdecken.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Das Framework ermöglicht eine ganzheitliche Bewertung der KI-Reife einer Organisation, identifiziert Spannungsfelder zwischen verschiedenen Dimensionen und leitet konkrete Handlungsempfehlungen ab.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Das optimierte AIHE-Framework zeichnet sich durch transparente Gewichtungslogik, mathematisch korrekte Berechnungsformeln und effektive Anpassungen für kleine und mittlere Unternehmen (KMUs) aus.
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Die acht Dimensionen</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">1. Führung & Governance</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Governance-Strukturen und ethische Verankerung für KI, unterteilt in Entscheidungsstruktur und Ethikverankerung.
                  </p>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">2. Strategie & Alignment</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Strategische Verankerung und Ressourcenbereitstellung für KI, unterteilt in Zielbild und Ressourcenverankerung.
                  </p>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">3. Kultur & Veränderung</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Offenheit, Akzeptanz und Innovationsfähigkeit für KI, unterteilt in AI-Akzeptanz und Innovationsfähigkeit.
                  </p>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">4. Kompetenzen & Bildung</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    KI-bezogenes Wissen und ethisches Bewusstsein, unterteilt in AI Literacy und Ethikbewusstsein.
                  </p>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">5. Datenqualität & Ethik</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Qualität, Verfügbarkeit und ethische Nutzung von Daten, unterteilt in Datenmanagement und Fairness & Transparenz.
                  </p>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">6. Technologieeinsatz</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Reifegrad und Innovationszyklus der KI-Technologien, unterteilt in Tool-Reife und Innovationszyklus.
                  </p>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">7. Prozesse & Automatisierung</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Integration und Überwachung von KI in Geschäftsprozessen, unterteilt in Automatisierung und Monitoring.
                  </p>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">8. Wirkung & Nachhaltigkeit</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Messbare Auswirkungen und Nachhaltigkeit der KI-Nutzung, unterteilt in KPI-Wirkung und ESG-Reflexion.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Kennzahlen des Frameworks</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">EQI - Equilibrium Quality Index</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    Misst, wie gleichmäßig die Entwicklung in allen Bereichen erfolgt. Ein hoher EQI bedeutet eine ausgewogene Entwicklung über alle Dimensionen hinweg.
                  </p>
                  <div className="bg-gray-100 dark:bg-slate-700 p-3 rounded-md">
                    <code className="text-sm">1 - MIN(1, SUM(ABS(Ist_i - Soll_i)) / (N * MaxDiff))</code>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">RGI - Reifegrad-Index</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    Berechnet den gewichteten Durchschnitt der Ist-Reifegrade und gibt Auskunft über den aktuellen Entwicklungsstand.
                  </p>
                  <div className="bg-gray-100 dark:bg-slate-700 p-3 rounded-md">
                    <code className="text-sm">SUM(Ist_i * Gewicht_i) / 4</code>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">SI - Spannungsindex</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    Misst die Spannungen zwischen verschiedenen Dimensionen, die durch unterschiedliche Entwicklungsgeschwindigkeiten entstehen.
                  </p>
                  <div className="bg-gray-100 dark:bg-slate-700 p-3 rounded-md">
                    <code className="text-sm">SUM(ABS(SP_i) * Gewicht_i) / MaxSpannung</code>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">SBS - System Balance Score</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    Integriert die drei Hauptmetriken in einem aussagekräftigen Gesamtwert, der die strategische Balance des Systems bewertet.
                  </p>
                  <div className="bg-gray-100 dark:bg-slate-700 p-3 rounded-md">
                    <code className="text-sm">(EQI + (1-SI) + RGI) / 3</code>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Neue Sektion: Gewichtungslogik */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Gewichtungslogik</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Die Gewichtungslogik des AIHE-Frameworks basiert auf drei Grundprinzipien: Transparenz und Nachvollziehbarkeit, Konsistenz und Kohärenz sowie Anpassbarkeit für KMUs.
              </p>
              
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mt-6 mb-3">Dimensionsgewichtung</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Im Standardmodus erhalten alle acht Hauptdimensionen eine gleichwertige Grundgewichtung von jeweils 12,5%. Dies entspricht dem Grundprinzip des AIHE-Frameworks, dass alle Dimensionen gleichwertig zum Erfolg der KI-Integration beitragen.
              </p>
              
              <div className="overflow-x-auto mb-6">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-slate-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Dimension</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Standard</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">KMU</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-white">Führung & Governance</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">12,5%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">10,0%</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-white">Strategie & Alignment</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">12,5%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">10,0%</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-white">Kultur & Veränderung</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">12,5%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">15,0%</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-white">Kompetenzen & Bildung</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">12,5%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">17,5%</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-white">Datenqualität & Ethik</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">12,5%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">12,5%</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-white">Technologieeinsatz</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">12,5%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">15,0%</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-white">Prozesse & Automatisierung</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">12,5%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">10,0%</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-white">Wirkung & Nachhaltigkeit</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">12,5%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">10,0%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mt-6 mb-3">Spannungsachsen</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Die Auswahl und Gewichtung der Spannungspaare basiert auf vier Kriterien: Relevanz, Häufigkeit, Intensität und Auswirkung. Für KMUs werden zusätzliche Spannungspaare berücksichtigt und die Gewichtungen angepasst.
              </p>
              
              <div className="overflow-x-auto mb-6">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-slate-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Spannungspaar</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Standard</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">KMU</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-white">Technologieeinsatz ↔ Führung & Governance</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">15%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">12%</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-white">Technologieeinsatz ↔ Kultur & Veränderung</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">14%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">16%</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-white">Kompetenzen & Bildung ↔ Prozesse & Automatisierung</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">14%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">12%</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-white">Externe Expertise ↔ Interne Kompetenzentwicklung</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">-</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">10%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Neue Sektion: Berechnungsformeln */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Berechnungsformeln</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Die Berechnungsformeln des AIHE-Frameworks basieren auf drei Grundprinzipien: Mathematische Konsistenz und Robustheit, Transparenz und Nachvollziehbarkeit sowie Verständlichkeit für Nicht-Mathematiker.
              </p>
              
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mt-6 mb-3">EQI (Equilibrium Quality Index)</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                Der EQI misst, wie gleichmäßig die Entwicklung in allen Bereichen erfolgt. Die verbesserte Formel lautet:
              </p>
              <div className="bg-gray-100 dark:bg-slate-700 p-3 rounded-md mb-4">
                <code className="text-sm">EQI = 1 - MIN(1, SUM(ABS(Ist_i - Soll_i)) / (N * MaxDiff))</code>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Wobei:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
                <li>Ist_i = Ist-Reifegrad der Dimension i (1-4)</li>
                <li>Soll_i = Soll-Reifegrad der Dimension i (1-4)</li>
                <li>N = Anzahl der Dimensionen (8)</li>
                <li>MaxDiff = Maximale Differenz zwischen Ist und Soll pro Dimension (3)</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Interpretation:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
                <li>0,8-1,0 (80-100%): Exzellente Balance</li>
                <li>0,6-0,8 (60-80%): Gute Balance</li>
                <li>0,4-0,6 (40-60%): Moderate Balance</li>
                <li>0,2-0,4 (20-40%): Schwache Balance</li>
                <li>0,0-0,2 (0-20%): Kritische Unbalance</li>
              </ul>
              
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mt-6 mb-3">RGI (Reifegrad-Index)</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                Der RGI berechnet den gewichteten Durchschnitt der Ist-Reifegrade. Die verbesserte Formel lautet:
              </p>
              <div className="bg-gray-100 dark:bg-slate-700 p-3 rounded-md mb-4">
                <code className="text-sm">RGI = SUM(Ist_i * Gewicht_i) / 4</code>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Interpretation:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
                <li>0,75-1,00 (75-100%): Transformative Reife</li>
                <li>0,50-0,75 (50-75%): Integrierte Reife</li>
                <li>0,25-0,50 (25-50%): Emerging Reife</li>
                <li>0,00-0,25 (0-25%): Initiale Reife</li>
              </ul>
              
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mt-6 mb-3">SI (Spannungsindex)</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                Der SI misst die Spannungen zwischen verschiedenen Dimensionen. Die verbesserte Formel lautet:
              </p>
              <div className="bg-gray-100 dark:bg-slate-700 p-3 rounded-md mb-4">
                <code className="text-sm">SI = SUM(ABS(SP_i) * Gewicht_i) / MaxSpannung</code>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Wobei für ein einzelnes Spannungspaar gilt:
              </p>
              <div className="bg-gray-100 dark:bg-slate-700 p-3 rounded-md mb-4">
                <code className="text-sm">SP_i = (Ist_A - Soll_A) - (Ist_B - Soll_B)</code>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Interpretation:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
                <li>0,0-0,2 (0-20%): Geringe Spannung</li>
                <li>0,2-0,4 (20-40%): Moderate Spannung</li>
                <li>0,4-0,6 (40-60%): Erhöhte Spannung</li>
                <li>0,6-0,8 (60-80%): Hohe Spannung</li>
                <li>0,8-1,0 (80-100%): Kritische Spannung</li>
              </ul>
              
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mt-6 mb-3">SBS (System Balance Score)</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                Der SBS integriert die drei Hauptmetriken in einem Gesamtwert. Die verbesserte Formel lautet:
              </p>
              <div className="bg-gray-100 dark:bg-slate-700 p-3 rounded-md mb-4">
                <code className="text-sm">SBS = (EQI + (1-SI) + RGI) / 3</code>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Interpretation:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
                <li>0,8-1,0 (80-100%): Exzellente Systembalance</li>
                <li>0,6-0,8 (60-80%): Gute Systembalance</li>
                <li>0,4-0,6 (40-60%): Moderate Systembalance</li>
                <li>0,2-0,4 (20-40%): Schwache Systembalance</li>
                <li>0,0-0,2 (0-20%): Kritische Systemunbalance</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">KMU-Anpassungen</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Das optimierte AIHE-Framework bietet spezifische Anpassungen für kleine und mittlere Unternehmen (KMUs), die deren besondere Herausforderungen und Ressourcenbeschränkungen berücksichtigen:
              </p>
              
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mt-6 mb-3">Angepasste Gewichtungen</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Für KMUs werden die Gewichtungen der Dimensionen angepasst, um deren spezifische Herausforderungen zu berücksichtigen:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 mb-4">
                <li><strong>Erhöhte Gewichtung</strong> für Kultur & Veränderung (15%), Kompetenzen & Bildung (17,5%) und Technologieeinsatz (15%), da diese Faktoren für KMUs kritischer sind aufgrund begrenzter Ressourcen und der Notwendigkeit, mit weniger Personal mehr zu erreichen.</li>
                <li><strong>Reduzierte Gewichtung</strong> für Führung & Governance (10%), Strategie & Alignment (10%), Prozesse & Automatisierung (10%) und Wirkung & Nachhaltigkeit (10%), da KMUs typischerweise flachere Hierarchien, pragmatischere Strategieansätze und weniger formalisierte Prozesse haben.</li>
              </ul>
              
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mt-6 mb-3">Vereinfachte Modulstruktur</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Die Modulstruktur des Frameworks wurde für KMUs vereinfacht:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 mb-4">
                <li><strong>KMU-Basismodul</strong> mit reduziertem Fragenkatalog und fokussierten Bewertungskriterien</li>
                <li><strong>Optionale Erweiterungsmodule</strong> für spezifische Anforderungen oder Branchen</li>
                <li><strong>Schnellstart-Funktionalität</strong> mit sofortiger Basisauswertung nach minimaler Dateneingabe</li>
              </ul>
              
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mt-6 mb-3">Ressourceneffiziente Implementierung</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Die Implementierung wurde für KMUs ressourceneffizient gestaltet:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 mb-4">
                <li><strong>Minimaler Dateneingabeaufwand</strong> durch fokussierte Fragestellungen</li>
                <li><strong>Automatisierte Berechnungen</strong> und vordefinierte Auswertungen</li>
                <li><strong>Flexible Rollenkonzepte</strong>, die an flachere Hierarchien angepasst sind</li>
                <li><strong>Pragmatische Handlungsempfehlungen</strong> mit Fokus auf schnelle Umsetzbarkeit</li>
              </ul>
              
              <p className="text-gray-600 dark:text-gray-300 mt-4">
                Diese Anpassungen ermöglichen es auch kleineren Organisationen, von den Vorteilen des AIHE-Frameworks zu profitieren, ohne unverhältnismäßig viele Ressourcen einsetzen zu müssen.
              </p>
            </div>
            
            {/* Neue Sektion: Integrationsfähigkeiten */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Integrationsfähigkeiten</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Das AIHE-Framework bietet umfassende Integrationsfähigkeiten, die eine nahtlose Einbindung in bestehende Systemlandschaften und Geschäftsprozesse ermöglichen.
              </p>
              
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mt-6 mb-3">Integrationsstrategie</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Die Integrationsstrategie basiert auf drei Grundprinzipien:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 mb-4">
                <li><strong>Offene Architektur</strong> mit standardisierten Schnittstellen, dokumentierten Datenmodellen und erweiterbaren Komponenten</li>
                <li><strong>Standardkonformität</strong> durch Verwendung etablierter Datenformate (JSON, XML, CSV) und Einhaltung von Web-Standards (REST, OAuth)</li>
                <li><strong>Skalierbare Integration</strong> mit anpassbarer Integrationstiefe je nach Bedarf und stufenweiser Implementierbarkeit</li>
              </ul>
              
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mt-6 mb-3">Integrationsebenen</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 dark:text-white mb-2">Datenintegration</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Austausch und Synchronisation von Daten zwischen Systemen über APIs, Dateiimport/-export und Datenbankkonnektoren.
                  </p>
                </div>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 dark:text-white mb-2">Prozessintegration</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Einbindung des Frameworks in Geschäftsprozesse über Workflow-Engines, Event-basierte Integration und Webhooks.
                  </p>
                </div>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 dark:text-white mb-2">UI-Integration</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Nahtlose Einbindung in bestehende Benutzeroberflächen über Widgets, iFrames, Web Components und SSO-Protokolle.
                  </p>
                </div>
              </div>
              
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mt-6 mb-3">Technische Schnittstellen</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Das Framework bietet verschiedene technische Schnittstellen für die Integration:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 mb-4">
                <li><strong>API-Framework</strong> mit RESTful API, Webhook-System und GraphQL-Schnittstelle</li>
                <li><strong>Datenimport/-export</strong> über Standardformate (Excel, CSV, JSON/XML, PDF)</li>
                <li><strong>Echtzeit-Integration</strong> über WebSocket-API, Server-Sent Events und Change Data Capture</li>
                <li><strong>ETL-Konnektoren</strong> für die Integration mit Datenplattformen und Business Intelligence-Tools</li>
              </ul>
              
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mt-6 mb-3">Integration mit Unternehmensanwendungen</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Das Framework unterstützt die Integration mit verschiedenen Unternehmensanwendungen:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 mb-4">
                <li><strong>ERP-Systeme</strong> wie SAP, Microsoft Dynamics und branchenspezifische Lösungen</li>
                <li><strong>Kollaborationsplattformen</strong> wie Microsoft 365, Google Workspace und Slack/Teams</li>
                <li><strong>Projektmanagement-Tools</strong> wie Jira, Trello/Asana und Microsoft Project</li>
                <li><strong>KI-Plattformen</strong> wie Azure AI, AWS AI und Google AI</li>
                <li><strong>KMU-Software</strong> wie Sage, Lexware und Cloud-Dienste für KMUs</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Anwendung des Frameworks</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Die Anwendung des AIHE-Frameworks erfolgt in drei Phasen:
              </p>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300 font-bold text-xl">
                    1
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-1">Vorbereitungsphase</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Zusammenstellung des Projektteams, Definition des Bewertungsumfangs und Identifikation der relevanten Datenquellen.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300 font-bold text-xl">
                    2
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-1">Durchführungsphase</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Erfassung der Kontextfaktoren, Bewertung des Ist-Zustands, Definition des Soll-Zustands und Analyse der Ergebnisse.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300 font-bold text-xl">
                    3
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-1">Umsetzungsphase</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Ableitung von Handlungsempfehlungen, Priorisierung von Maßnahmen, Umsetzung und kontinuierliche Erfolgsmessung.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Link href="/assessment" className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                  Zum Assessment starten
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
