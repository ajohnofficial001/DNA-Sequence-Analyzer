"use client";

import { useState } from "react";
import {
  analyzeDnaSequence,
  validateDnaSequence,
  type SequenceAnalysis,
} from "@/lib/dna";
import { NucleotideChart } from "@/components/NucleotideChart";
import { SequenceInput } from "@/components/SequenceInput";
import { SequenceOverview } from "@/components/SequenceOverview";

export function AnalyzerWorkspace() {
  const [rawSequence, setRawSequence] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<SequenceAnalysis | null>(null);

  function handleAnalyze() {
    const validation = validateDnaSequence(rawSequence);

    if (!validation.valid) {
      setErrorMessage(validation.message);
      setAnalysis(null);
      return;
    }

    setErrorMessage(null);
    setAnalysis(analyzeDnaSequence(validation.normalized));
  }

  return (
    <div className="space-y-8">
      <SequenceInput
        value={rawSequence}
        onChange={(value) => {
          setRawSequence(value);
          if (errorMessage) setErrorMessage(null);
        }}
        onAnalyze={handleAnalyze}
        errorMessage={errorMessage}
      />

      {analysis ? (
        <div className="space-y-8 animate-[fade-up_0.35s_ease-out]">
          <SequenceOverview analysis={analysis} />
          <NucleotideChart analysis={analysis} />
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-[var(--border)] bg-[var(--surface-muted)] px-6 py-12 text-center">
          <p className="text-sm font-medium text-[var(--foreground)]">
            Results will appear here
          </p>
          <p className="mx-auto mt-2 max-w-md text-sm text-[var(--muted)]">
            Enter a DNA sequence and click Analyze Sequence to compute length,
            base counts, GC/AT content, and a distribution chart.
          </p>
        </div>
      )}
    </div>
  );
}
