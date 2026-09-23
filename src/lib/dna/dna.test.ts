import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { analyzeDnaSequence } from "./analyzer";
import { normalizeSequence, validateDnaSequence } from "./validator";

describe("normalizeSequence", () => {
  it("uppercases lowercase input", () => {
    assert.equal(normalizeSequence("atgc"), "ATGC");
  });

  it("removes spaces, tabs, and newlines", () => {
    assert.equal(normalizeSequence("AT GC\nTA\tCG"), "ATGCTACG");
  });

  it("strips common separators", () => {
    assert.equal(normalizeSequence("AT-GC_AT.GC"), "ATGCATGC");
  });
});

describe("validateDnaSequence", () => {
  it("accepts a valid sequence", () => {
    const result = validateDnaSequence("ATGC");
    assert.equal(result.valid, true);
    if (result.valid) {
      assert.equal(result.normalized, "ATGC");
    }
  });

  it("rejects empty input", () => {
    const result = validateDnaSequence("   \n\t  ");
    assert.equal(result.valid, false);
    if (!result.valid) {
      assert.equal(result.message, "Please enter a DNA sequence to analyze.");
      assert.deepEqual(result.invalidCharacters, []);
    }
  });

  it("identifies invalid characters", () => {
    const result = validateDnaSequence("ATGXCN");
    assert.equal(result.valid, false);
    if (!result.valid) {
      assert.deepEqual(result.invalidCharacters, ["N", "X"]);
      assert.match(result.message, /N, X/);
    }
  });

  it("normalizes before validating", () => {
    const result = validateDnaSequence("at gc\n");
    assert.equal(result.valid, true);
    if (result.valid) {
      assert.equal(result.normalized, "ATGC");
    }
  });
});

describe("analyzeDnaSequence", () => {
  it("analyzes ATGC correctly", () => {
    const result = analyzeDnaSequence("ATGC");

    assert.equal(result.length, 4);
    assert.deepEqual(result.counts, { A: 1, T: 1, G: 1, C: 1 });
    assert.equal(result.percentages.A, 25);
    assert.equal(result.percentages.T, 25);
    assert.equal(result.percentages.G, 25);
    assert.equal(result.percentages.C, 25);
    assert.equal(result.gcContent, 50);
    assert.equal(result.atContent, 50);
  });

  it("handles a single-nucleotide sequence", () => {
    const result = analyzeDnaSequence("AAAA");

    assert.equal(result.length, 4);
    assert.deepEqual(result.counts, { A: 4, T: 0, G: 0, C: 0 });
    assert.equal(result.percentages.A, 100);
    assert.equal(result.gcContent, 0);
    assert.equal(result.atContent, 100);
  });

  it("handles an all-GC sequence", () => {
    const result = analyzeDnaSequence("GGCC");

    assert.equal(result.gcContent, 100);
    assert.equal(result.atContent, 0);
  });

  it("counts a longer mixed sequence", () => {
    const result = analyzeDnaSequence("AAATTTGGGCCC");

    assert.equal(result.length, 12);
    assert.deepEqual(result.counts, { A: 3, T: 3, G: 3, C: 3 });
    assert.equal(result.gcContent, 50);
    assert.equal(result.atContent, 50);
  });
});
