/**
 * AIHE-Framework Berechnungslogik
 * 
 * Dieses Modul implementiert die optimierten Berechnungsformeln des AIHE-Frameworks.
 */

// Typdefinitionen
export interface Dimension {
  id: string;
  name: string;
  description: string;
  weight: number;
  kmuWeight: number;
  currentValue: number;
  targetValue: number;
  subdimensions: Subdimension[];
}

export interface Subdimension {
  id: string;
  name: string;
  description: string;
  weight: number;
  currentValue: number;
  targetValue: number;
}

export interface SpannungsPaar {
  id: string;
  dimensionA: string;
  dimensionB: string;
  weight: number;
  kmuWeight: number;
}

export interface Kontextfaktor {
  id: string;
  kategorie: string;
  name: string;
  value: number;
  weight: number;
  kmuWeight: number;
}

export interface KontextfaktorKategorie {
  id: string;
  name: string;
  weight: number;
  kmuWeight: number;
}

export interface FrameworkErgebnis {
  eqi: number;
  rgi: number;
  si: number;
  sbs: number;
  kontextscore: number;
  kernradius: number;
  dimensionen: Dimension[];
  spannungen: SpannungsErgebnis[];
}

export interface SpannungsErgebnis {
  paarId: string;
  dimensionA: string;
  dimensionB: string;
  wert: number;
  intensitaet: number;
  richtung: number;
  gewichtet: number;
}

/**
 * Berechnet den EQI (Equilibrium Quality Index) / "Balance der Entwicklung"
 * 
 * Formel: 1 - MIN(1, SUM(ABS(Ist_i - Soll_i)) / (N * MaxDiff))
 * 
 * @param dimensionen Array der Dimensionen mit Ist- und Soll-Werten
 * @returns EQI-Wert zwischen 0 und 1
 */
export function berechneEQI(dimensionen: Dimension[]): number {
  const n = dimensionen.length;
  const maxDiff = 3; // Maximale Differenz zwischen Ist und Soll pro Dimension (1-4 Skala)
  
  let summeAbweichungen = 0;
  
  for (const dimension of dimensionen) {
    const abweichung = Math.abs(dimension.currentValue - dimension.targetValue);
    summeAbweichungen += abweichung;
  }
  
  const normierteAbweichung = summeAbweichungen / (n * maxDiff);
  const eqi = 1 - Math.min(1, normierteAbweichung);
  
  return eqi;
}

/**
 * Berechnet den RGI (Reifegrad-Index) / "Unser aktuelles Fundament"
 * 
 * Formel: SUM(Ist_i * Gewicht_i) / 4
 * 
 * @param dimensionen Array der Dimensionen mit Ist-Werten und Gewichtungen
 * @param isKMU Flag, ob KMU-spezifische Gewichtungen verwendet werden sollen
 * @returns RGI-Wert zwischen 0 und 1
 */
export function berechneRGI(dimensionen: Dimension[], isKMU: boolean = false): number {
  let gewichteterReifegrad = 0;
  let summeGewichte = 0;
  
  for (const dimension of dimensionen) {
    const gewicht = isKMU ? dimension.kmuWeight : dimension.weight;
    gewichteterReifegrad += dimension.currentValue * gewicht;
    summeGewichte += gewicht;
  }
  
  // Normierung auf Skala 0-1 (Reifegradstufen sind 1-4)
  const rgi = gewichteterReifegrad / (4 * summeGewichte);
  
  return rgi;
}

/**
 * Berechnet den SI (Spannungsindex) / "Spannung im System"
 * 
 * Formel für ein Spannungspaar: (Ist_A - Soll_A) - (Ist_B - Soll_B)
 * Formel für den Gesamt-Spannungsindex: SUM(ABS(SP_i) * Gewicht_i) / MaxSpannung
 * 
 * @param dimensionen Array der Dimensionen mit Ist- und Soll-Werten
 * @param spannungspaare Array der Spannungspaare mit Gewichtungen
 * @param isKMU Flag, ob KMU-spezifische Gewichtungen verwendet werden sollen
 * @returns Objekt mit SI-Wert und detaillierten Spannungsergebnissen
 */
export function berechneSI(
  dimensionen: Dimension[], 
  spannungspaare: SpannungsPaar[], 
  isKMU: boolean = false
): { si: number, spannungen: SpannungsErgebnis[] } {
  const maxSpannung = 6; // Maximale theoretische Spannung (bei Skala 1-4)
  const dimensionenMap = new Map(dimensionen.map(d => [d.id, d]));
  
  let gewichteteSpannungssumme = 0;
  let summeGewichte = 0;
  const spannungen: SpannungsErgebnis[] = [];
  
  for (const paar of spannungspaare) {
    const dimensionA = dimensionenMap.get(paar.dimensionA);
    const dimensionB = dimensionenMap.get(paar.dimensionB);
    
    if (!dimensionA || !dimensionB) continue;
    
    const gapA = dimensionA.currentValue - dimensionA.targetValue;
    const gapB = dimensionB.currentValue - dimensionB.targetValue;
    const spannung = gapA - gapB;
    
    const spannungsIntensitaet = Math.abs(spannung);
    const spannungsRichtung = Math.sign(spannung);
    
    const gewicht = isKMU ? paar.kmuWeight : paar.weight;
    const gewichteteSpannung = spannungsIntensitaet * gewicht;
    
    gewichteteSpannungssumme += gewichteteSpannung;
    summeGewichte += gewicht;
    
    spannungen.push({
      paarId: paar.id,
      dimensionA: paar.dimensionA,
      dimensionB: paar.dimensionB,
      wert: spannung,
      intensitaet: spannungsIntensitaet,
      richtung: spannungsRichtung,
      gewichtet: gewichteteSpannung
    });
  }
  
  // Normierung auf Skala 0-1
  const si = gewichteteSpannungssumme / (maxSpannung * summeGewichte);
  
  return { si, spannungen };
}

/**
 * Berechnet den SBS (System Balance Score) / "Strategischer Gesamtwert"
 * 
 * Formel: (EQI + (1-SI) + RGI) / 3
 * 
 * @param eqi EQI-Wert
 * @param si SI-Wert
 * @param rgi RGI-Wert
 * @returns SBS-Wert zwischen 0 und 1
 */
export function berechneSBS(eqi: number, si: number, rgi: number): number {
  return (eqi + (1 - si) + rgi) / 3;
}

/**
 * Berechnet den Kontextscore / "Komplexitätsgrad unserer Umgebung"
 * 
 * Formel: SUM(Kontextfaktor_i * Gewicht_i)
 * 
 * @param kontextfaktoren Array der Kontextfaktoren mit Werten und Gewichtungen
 * @param kategorien Array der Kontextfaktorkategorien mit Gewichtungen
 * @param isKMU Flag, ob KMU-spezifische Gewichtungen verwendet werden sollen
 * @returns Kontextscore-Wert zwischen 0 und 1
 */
export function berechneKontextscore(
  kontextfaktoren: Kontextfaktor[], 
  kategorien: KontextfaktorKategorie[],
  isKMU: boolean = false
): number {
  const kategorienMap = new Map(kategorien.map(k => [k.id, k]));
  const faktoren = new Map<string, number[]>();
  
  // Gruppiere Faktoren nach Kategorie
  for (const faktor of kontextfaktoren) {
    if (!faktoren.has(faktor.kategorie)) {
      faktoren.set(faktor.kategorie, []);
    }
    faktoren.get(faktor.kategorie)?.push(faktor.value);
  }
  
  let gewichteterKontextscore = 0;
  let summeGewichte = 0;
  
  // Berechne gewichteten Durchschnitt pro Kategorie
  for (const [kategorieId, werte] of faktoren.entries()) {
    const kategorie = kategorienMap.get(kategorieId);
    if (!kategorie) continue;
    
    const mittelwert = werte.reduce((sum, val) => sum + val, 0) / werte.length;
    const gewicht = isKMU ? kategorie.kmuWeight : kategorie.weight;
    
    gewichteterKontextscore += mittelwert * gewicht;
    summeGewichte += gewicht;
  }
  
  // Normierung auf Skala 0-1
  const kontextscore = gewichteterKontextscore / summeGewichte;
  
  return kontextscore;
}

/**
 * Berechnet den Kernradius / "Spielraum für Standardlösungen"
 * 
 * Formel: 1 - Kontextscore
 * 
 * @param kontextscore Kontextscore-Wert
 * @returns Kernradius-Wert zwischen 0 und 1
 */
export function berechneKernradius(kontextscore: number): number {
  return 1 - kontextscore;
}

/**
 * Berechnet alle Framework-Kennzahlen
 * 
 * @param dimensionen Array der Dimensionen
 * @param spannungspaare Array der Spannungspaare
 * @param kontextfaktoren Array der Kontextfaktoren
 * @param kategorien Array der Kontextfaktorkategorien
 * @param isKMU Flag, ob KMU-spezifische Gewichtungen verwendet werden sollen
 * @returns Objekt mit allen Framework-Kennzahlen
 */
export function berechneFrameworkErgebnis(
  dimensionen: Dimension[],
  spannungspaare: SpannungsPaar[],
  kontextfaktoren: Kontextfaktor[],
  kategorien: KontextfaktorKategorie[],
  isKMU: boolean = false
): FrameworkErgebnis {
  const eqi = berechneEQI(dimensionen);
  const rgi = berechneRGI(dimensionen, isKMU);
  const { si, spannungen } = berechneSI(dimensionen, spannungspaare, isKMU);
  const sbs = berechneSBS(eqi, si, rgi);
  const kontextscore = berechneKontextscore(kontextfaktoren, kategorien, isKMU);
  const kernradius = berechneKernradius(kontextscore);
  
  return {
    eqi,
    rgi,
    si,
    sbs,
    kontextscore,
    kernradius,
    dimensionen,
    spannungen
  };
}
