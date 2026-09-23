import type {
  Nucleotide,
  NucleotideCounts,
  NucleotidePercentages,
  SequenceAnalysis,
} from "./types";
import { NUCLEOTIDES } from "./types";

function emptyCounts(): NucleotideCounts {
  return { A: 0, T: 0, G: 0, C: 0 };
}

function toPercentage(count: number, length: number): number {
  if (length === 0) return 0;
  return (count / length) * 100;
}

/**
 * Compute Phase 1 DNA statistics from a normalized, validated sequence.
 * Call validateDnaSequence first — this function assumes only A/T/G/C.
 */
export function analyzeDnaSequence(sequence: string): SequenceAnalysis {
  const counts = emptyCounts();

  for (const base of sequence) {
    counts[base as Nucleotide] += 1;
  }

  const length = sequence.length;
  const percentages = NUCLEOTIDES.reduce((acc, nucleotide) => {
    acc[nucleotide] = toPercentage(counts[nucleotide], length);
    return acc;
  }, emptyCounts() as NucleotidePercentages);

  const gcCount = counts.G + counts.C;
  const atCount = counts.A + counts.T;

  return {
    sequence,
    length,
    counts,
    percentages,
    gcContent: toPercentage(gcCount, length),
    atContent: toPercentage(atCount, length),
  };
}
