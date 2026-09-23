export type Nucleotide = "A" | "T" | "G" | "C";

export const NUCLEOTIDES: readonly Nucleotide[] = ["A", "T", "G", "C"] as const;

export interface NucleotideCounts {
  A: number;
  T: number;
  G: number;
  C: number;
}

export interface NucleotidePercentages {
  A: number;
  T: number;
  G: number;
  C: number;
}

/** Deterministic analysis result — never produced by an LLM. */
export interface SequenceAnalysis {
  sequence: string;
  length: number;
  counts: NucleotideCounts;
  percentages: NucleotidePercentages;
  gcContent: number;
  atContent: number;
}

export interface ValidationSuccess {
  valid: true;
  normalized: string;
}

export interface ValidationFailure {
  valid: false;
  normalized: string;
  invalidCharacters: string[];
  message: string;
}

export type ValidationResult = ValidationSuccess | ValidationFailure;
