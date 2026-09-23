import type { ValidationResult } from "./types";
import { NUCLEOTIDES } from "./types";

const VALID_BASES = new Set<string>(NUCLEOTIDES);

/**
 * Normalize raw DNA input for analysis:
 * uppercase, strip whitespace/newlines, drop common separators.
 */
export function normalizeSequence(input: string): string {
  return input
    .toUpperCase()
    .replace(/[\s\u00A0]/g, "")
    .replace(/[-_.]/g, "");
}

export function validateDnaSequence(input: string): ValidationResult {
  const normalized = normalizeSequence(input);

  if (normalized.length === 0) {
    return {
      valid: false,
      normalized,
      invalidCharacters: [],
      message: "Please enter a DNA sequence to analyze.",
    };
  }

  const invalidCharacters = [
    ...new Set(
      [...normalized].filter((character) => !VALID_BASES.has(character)),
    ),
  ].sort();

  if (invalidCharacters.length > 0) {
    const listed = invalidCharacters
      .map((character) => (character === " " ? "' '" : character))
      .join(", ");

    return {
      valid: false,
      normalized,
      invalidCharacters,
      message: `Invalid character(s) found: ${listed}. DNA sequences may only contain A, T, G, and C.`,
    };
  }

  return { valid: true, normalized };
}
