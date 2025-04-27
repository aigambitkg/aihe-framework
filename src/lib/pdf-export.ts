// PDF Export Utility for AIHE-Framework Assessment
// This utility uses jsPDF and html2canvas to generate PDF reports from assessment results

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Dimension } from './framework-calculations';

// Types for the assessment results
interface AssessmentResult {
  eqi: number;
  rgi: number;
  si: number;
  sbs: number;
  spannungen: any[];
}

// Function to generate PDF from assessment results
export async function generateAssessmentPDF(
  dimensions: Dimension[],
  ergebnis: AssessmentResult,
  isKMU: boolean,
  radarChartElement: HTMLElement,
  dimensionComparisonElement: HTMLElement,
  spannungsMatrixElement: HTMLElement
) {
  // Create a new PDF document
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });
  
  // Set initial position
  let yPos = 15;
  
  // Add title and date
  pdf.setFontSize(18);
  pdf.setTextColor(0, 128, 128); // Teal color
  pdf.text('AIHE-Framework Assessment Bericht', 105, yPos, { align: 'center' });
  
  yPos += 10;
  pdf.setFontSize(10);
  pdf.setTextColor(100, 100, 100);
  const today = new Date();
  pdf.text(`Erstellt am: ${today.toLocaleDateString('de-DE')}`, 105, yPos, { align: 'center' });
  
  yPos += 5;
  pdf.text(`Modus: ${isKMU ? 'KMU-Modus' : 'Standard-Modus'}`, 105, yPos, { align: 'center' });
  
  // Add privacy notice
  yPos += 10;
  pdf.setFontSize(8);
  pdf.setTextColor(100, 100, 100);
  pdf.text('Datenschutzhinweis: Dieses Assessment wurde vollständig anonym durchgeführt. Es wurden keine Daten gespeichert oder übertragen.', 105, yPos, { align: 'center' });
  
  // Add key metrics
  yPos += 15;
  pdf.setFontSize(14);
  pdf.setTextColor(0, 0, 0);
  pdf.text('Kennzahlen des Assessments', 20, yPos);
  
  yPos += 10;
  const metrics = [
    { name: 'EQI - Equilibrium Quality Index', value: (ergebnis.eqi * 100).toFixed(1) + '%', description: 'Balance der Entwicklung' },
    { name: 'RGI - Reifegrad-Index', value: (ergebnis.rgi * 100).toFixed(1) + '%', description: 'Aktuelles Fundament' },
    { name: 'SI - Spannungsindex', value: (ergebnis.si * 100).toFixed(1) + '%', description: 'Spannung im System' },
    { name: 'SBS - System Balance Score', value: (ergebnis.sbs * 100).toFixed(1) + '%', description: 'Strategischer Gesamtwert' }
  ];
  
  pdf.setFontSize(10);
  metrics.forEach((metric, index) => {
    const xPos = 20 + (index % 2) * 90;
    const localYPos = yPos + Math.floor(index / 2) * 20;
    
    pdf.setTextColor(0, 0, 0);
    pdf.text(metric.name, xPos, localYPos);
    
    pdf.setFontSize(14);
    pdf.setTextColor(0, 128, 128); // Teal color
    pdf.text(metric.value, xPos, localYPos + 6);
    
    pdf.setFontSize(8);
    pdf.setTextColor(100, 100, 100);
    pdf.text(metric.description, xPos, localYPos + 12);
    
    pdf.setFontSize(10);
  });
  
  // Add dimension overview
  yPos += 45;
  pdf.setFontSize(14);
  pdf.setTextColor(0, 0, 0);
  pdf.text('Dimensionsübersicht', 20, yPos);
  
  yPos += 10;
  pdf.setFontSize(9);
  dimensions.forEach((dimension, index) => {
    const xPos = 20 + (index % 2) * 90;
    const localYPos = yPos + Math.floor(index / 2) * 25;
    
    pdf.setTextColor(0, 0, 0);
    pdf.text(dimension.name, xPos, localYPos);
    
    // Draw progress bar for current value
    pdf.setDrawColor(220, 220, 220);
    pdf.setFillColor(220, 220, 220);
    pdf.rect(xPos, localYPos + 4, 70, 4, 'F');
    
    pdf.setFillColor(0, 128, 128); // Teal color
    pdf.rect(xPos, localYPos + 4, 70 * (dimension.currentValue / 4), 4, 'F');
    
    // Draw progress bar for target value
    pdf.setDrawColor(220, 220, 220);
    pdf.setFillColor(220, 220, 220);
    pdf.rect(xPos, localYPos + 10, 70, 4, 'F');
    
    pdf.setFillColor(255, 215, 0); // Yellow color
    pdf.rect(xPos, localYPos + 10, 70 * (dimension.targetValue / 4), 4, 'F');
    
    pdf.setFontSize(8);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Ist: ${dimension.currentValue.toFixed(1)} / Soll: ${dimension.targetValue.toFixed(1)}`, xPos, localYPos + 18);
    
    pdf.setFontSize(9);
  });
  
  // Add visualizations
  // First, convert the chart elements to images
  try {
    // Add Radar Chart
    yPos += 110;
    pdf.addPage();
    yPos = 15;
    
    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0);
    pdf.text('Visualisierungen', 105, yPos, { align: 'center' });
    
    yPos += 10;
    
    // Radar Chart
    if (radarChartElement) {
      const radarCanvas = await html2canvas(radarChartElement, { scale: 2 });
      const radarImgData = radarCanvas.toDataURL('image/png');
      pdf.text('Radar Chart', 20, yPos);
      yPos += 5;
      pdf.addImage(radarImgData, 'PNG', 20, yPos, 170, 85);
      yPos += 90;
    }
    
    // Dimension Comparison
    if (dimensionComparisonElement) {
      const comparisonCanvas = await html2canvas(dimensionComparisonElement, { scale: 2 });
      const comparisonImgData = comparisonCanvas.toDataURL('image/png');
      pdf.text('Ist-Soll Vergleich', 20, yPos);
      yPos += 5;
      pdf.addImage(comparisonImgData, 'PNG', 20, yPos, 170, 85);
      yPos += 90;
    }
    
    // Add a new page for Spannungsmatrix and recommendations
    pdf.addPage();
    yPos = 15;
    
    // Spannungsmatrix
    if (spannungsMatrixElement) {
      pdf.setFontSize(14);
      pdf.text('Spannungsmatrix', 20, yPos);
      yPos += 5;
      
      const matrixCanvas = await html2canvas(spannungsMatrixElement, { scale: 2 });
      const matrixImgData = matrixCanvas.toDataURL('image/png');
      pdf.addImage(matrixImgData, 'PNG', 20, yPos, 170, 85);
      yPos += 90;
    }
  } catch (error) {
    console.error('Error generating chart images:', error);
  }
  
  // Add recommendations
  pdf.addPage();
  yPos = 15;
  
  pdf.setFontSize(16);
  pdf.setTextColor(0, 0, 0);
  pdf.text('Handlungsempfehlungen', 105, yPos, { align: 'center' });
  
  // Prioritäre Handlungsfelder
  yPos += 15;
  pdf.setFontSize(14);
  pdf.text('Prioritäre Handlungsfelder', 20, yPos);
  
  yPos += 10;
  pdf.setFontSize(10);
  
  // Sort dimensions by gap between target and current
  const priorityDimensions = [...dimensions]
    .sort((a, b) => (b.targetValue - b.currentValue) - (a.targetValue - a.currentValue))
    .slice(0, 3);
  
  priorityDimensions.forEach((dim, index) => {
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(12);
    pdf.text(`${index + 1}. ${dim.name}`, 20, yPos);
    
    yPos += 5;
    pdf.setFontSize(9);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Ist: ${dim.currentValue.toFixed(1)} → Soll: ${dim.targetValue.toFixed(1)}`, 20, yPos);
    
    yPos += 5;
    pdf.setTextColor(0, 0, 0);
    pdf.text(dim.description, 20, yPos);
    
    yPos += 7;
    pdf.setFontSize(10);
    pdf.text('Empfohlene Maßnahmen:', 20, yPos);
    
    yPos += 7;
    pdf.setFontSize(9);
    
    // Add specific recommendations based on dimension
    let recommendations: string[] = [];
    
    if (dim.id === 'dim1') { // Führung & Governance
      recommendations = [
        'Etablierung eines KI-Ethikrats mit klaren Entscheidungskompetenzen',
        'Entwicklung eines KI-Governance-Frameworks mit definierten Verantwortlichkeiten',
        'Integration ethischer Prinzipien in die KI-Strategie und -Entwicklung'
      ];
    } else if (dim.id === 'dim2') { // Strategie & Alignment
      recommendations = [
        'Entwicklung einer umfassenden KI-Strategie mit klaren Zielen und Metriken',
        'Allokation dedizierter Ressourcen für KI-Initiativen',
        'Alignment der KI-Strategie mit der Gesamtunternehmensstrategie'
      ];
    } else if (dim.id === 'dim3') { // Kultur & Veränderung
      recommendations = [
        'Durchführung von Awareness-Workshops zu KI-Themen für alle Mitarbeiter',
        'Etablierung einer offenen Feedback-Kultur für KI-Initiativen',
        'Förderung von Innovation durch dedizierte Zeit und Ressourcen'
      ];
    } else if (dim.id === 'dim4') { // Kompetenzen & Bildung
      recommendations = [
        'Entwicklung eines KI-Schulungsprogramms für verschiedene Zielgruppen',
        'Aufbau interner KI-Expertise durch gezielte Weiterbildung',
        'Sensibilisierung für ethische Aspekte der KI-Nutzung'
      ];
    } else if (dim.id === 'dim5') { // Datenqualität & Ethik
      recommendations = [
        'Implementierung eines systematischen Datenqualitätsmanagements',
        'Entwicklung von Standards für faire und transparente KI-Systeme',
        'Etablierung von Prozessen zur regelmäßigen Überprüfung der Datenqualität'
      ];
    } else if (dim.id === 'dim6') { // Technologieeinsatz
      recommendations = [
        'Evaluation und Auswahl geeigneter KI-Tools für spezifische Anwendungsfälle',
        'Etablierung eines strukturierten Innovationsprozesses für KI-Technologien',
        'Regelmäßige Bewertung neuer KI-Technologien und -Trends'
      ];
    } else if (dim.id === 'dim7') { // Prozesse & Automatisierung
      recommendations = [
        'Identifikation von Prozessen mit hohem Automatisierungspotenzial',
        'Implementierung von KI-basierten Automatisierungslösungen',
        'Etablierung eines systematischen Monitorings für KI-Systeme'
      ];
    } else if (dim.id === 'dim8') { // Wirkung & Nachhaltigkeit
      recommendations = [
        'Entwicklung von KPIs zur Messung der KI-Wirkung',
        'Integration von Nachhaltigkeitsaspekten in KI-Projekte',
        'Regelmäßige Evaluation der KI-Wirkung auf Geschäftsergebnisse'
      ];
    }
    
    recommendations.forEach((rec, i) => {
      pdf.text(`• ${rec}`, 25, yPos);
      yPos += 5;
    });
    
    yPos += 5;
  });
  
  // Add spannungsfelder recommendations
  if (yPos > 250) {
    pdf.addPage();
    yPos = 15;
  } else {
    yPos += 10;
  }
  
  pdf.setFontSize(14);
  pdf.setTextColor(0, 0, 0);
  pdf.text('Spannungsfelder adressieren', 20, yPos);
  
  yPos += 10;
  pdf.setFontSize(10);
  pdf.text('Basierend auf der Spannungsanalyse sollten folgende Spannungsfelder prioritär adressiert werden:', 20, yPos);
  
  // Add specific spannungsfelder recommendations
  yPos += 10;
  pdf.setFontSize(12);
  pdf.text('Technologieeinsatz ↔ Führung & Governance', 20, yPos);
  
  yPos += 7;
  pdf.setFontSize(9);
  pdf.text('Die Spannung zwischen technologischer Innovation und Governance-Strukturen erfordert eine Balance zwischen Flexibilität und Kontrolle.', 20, yPos);
  
  yPos += 7;
  pdf.text('• Entwicklung agiler Governance-Prozesse, die Innovation fördern und gleichzeitig Risiken minimieren', 25, yPos);
  yPos += 5;
  pdf.text('• Etablierung eines Technology Review Boards mit Vertretern aus Technologie und Governance', 25, yPos);
  yPos += 5;
  pdf.text('• Regelmäßige Überprüfung und Anpassung der Governance-Strukturen an technologische Entwicklungen', 25, yPos);
  
  yPos += 10;
  pdf.setFontSize(12);
  pdf.text('Kompetenzen & Bildung ↔ Prozesse & Automatisierung', 20, yPos);
  
  yPos += 7;
  pdf.setFontSize(9);
  pdf.text('Die Spannung zwischen Kompetenzentwicklung und Automatisierung erfordert eine Balance zwischen menschlicher Expertise und automatisierten Prozessen.', 20, yPos);
  
  yPos += 7;
  pdf.text('• Entwicklung von Schulungsprogrammen, die Mitarbeiter auf die Zusammenarbeit mit KI-Systemen vorbereiten', 25, yPos);
  yPos += 5;
  pdf.text('• Identifikation von Prozessen, die menschliche Expertise erfordern, und solchen, die automatisiert werden können', 25, yPos);
  yPos += 5;
  pdf.text('• Etablierung von Feedback-Mechanismen, um kontinuierliche Verbesserungen zu ermöglichen', 25, yPos);
  
  // Add next steps
  if (yPos > 250) {
    pdf.addPage();
    yPos = 15;
  } else {
    yPos += 15;
  }
  
  pdf.setFontSize(14);
  pdf.setTextColor(0, 0, 0);
  pdf.text('Nächste Schritte', 20, yPos);
  
  yPos += 10;
  pdf.setFontSize(10);
  
  const nextSteps = [
    { title: 'Aktionsplan entwickeln', description: 'Erstellen Sie einen detaillierten Aktionsplan mit konkreten Maßnahmen, Verantwortlichkeiten und Zeitplänen.' },
    { title: 'Quick Wins identifizieren', description: 'Identifizieren Sie Maßnahmen, die mit geringem Aufwand schnell umgesetzt werden können und sichtbare Ergebnisse liefern.' },
    { title: 'Ressourcen allokieren', description: 'Stellen Sie sicher, dass ausreichend Ressourcen (Zeit, Budget, Personal) für die Umsetzung der Maßnahmen zur Verfügung stehen.' },
    { title: 'Fortschritt messen', description: 'Etablieren Sie ein regelmäßiges Monitoring des Fortschritts und passen Sie den Aktionsplan bei Bedarf an.' },
    { title: 'Reassessment durchführen', description: 'Führen Sie in 6-12 Monaten ein erneutes Assessment durch, um den Fortschritt zu evaluieren und neue Handlungsfelder zu identifizieren.' }
  ];
  
  nextSteps.forEach((step, index) => {
    pdf.setFontSize(10);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`${index + 1}. ${step.title}:`, 20, yPos);
    
    yPos += 5;
    pdf.setFontSize(9);
    pdf.setTextColor(60, 60, 60);
    pdf.text(step.description, 25, yPos);
    
    yPos += 8;
  });
  
  // Add footer with AI Gambit branding
  const pageCount = pdf.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    pdf.setPage(i);
    pdf.setFontSize(8);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`AIHE-Framework Assessment | Seite ${i} von ${pageCount}`, 105, 285, { align: 'center' });
    pdf.text('© AI Gambit', 195, 285, { align: 'right' });
  }
  
  // Return the PDF as a blob
  return pdf.output('blob');
}

// Function to trigger PDF download
export function downloadAssessmentPDF(
  dimensions: Dimension[],
  ergebnis: AssessmentResult,
  isKMU: boolean,
  radarChartElement: HTMLElement,
  dimensionComparisonElement: HTMLElement,
  spannungsMatrixElement: HTMLElement
) {
  generateAssessmentPDF(
    dimensions,
    ergebnis,
    isKMU,
    radarChartElement,
    dimensionComparisonElement,
    spannungsMatrixElement
  ).then((pdfBlob) => {
    // Create a download link
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `AIHE-Framework-Assessment-${new Date().toISOString().split('T')[0]}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }).catch((error) => {
    console.error('Error generating PDF:', error);
    alert('Beim Erstellen des PDFs ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.');
  });
}
