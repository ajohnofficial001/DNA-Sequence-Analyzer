import type { SequenceAnalysis } from "@/lib/dna";
import {
  formatBasePairs,
  formatCount,
  formatPercent,
} from "@/lib/dna/format";
import { NUCLEOTIDES } from "@/lib/dna";

type SequenceOverviewProps = {
  analysis: SequenceAnalysis;
};

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--shadow-sm)] sm:p-5">
      <p className="text-xs font-medium uppercase tracking-[0.08em] text-[var(--muted)]">
        {label}
      </p>
      <p className="mt-2 font-mono text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl">
        {value}
      </p>
      {hint ? (
        <p className="mt-1 text-xs text-[var(--muted)]">{hint}</p>
      ) : null}
    </div>
  );
}

export function SequenceOverview({ analysis }: SequenceOverviewProps) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-[var(--foreground)]">
          Sequence Overview
        </h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Deterministic composition metrics computed from the normalized
          sequence.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard
          label="Sequence Length"
          value={formatBasePairs(analysis.length)}
        />
        <StatCard
          label="GC Content"
          value={formatPercent(analysis.gcContent)}
          hint="G + C / length"
        />
        <StatCard
          label="AT Content"
          value={formatPercent(analysis.atContent)}
          hint="A + T / length"
        />
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-sm)]">
        <h3 className="text-sm font-semibold text-[var(--foreground)]">
          Nucleotide Distribution
        </h3>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {NUCLEOTIDES.map((nucleotide) => (
            <li
              key={nucleotide}
              className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3"
            >
              <span className="font-mono text-base font-semibold text-[var(--foreground)]">
                {nucleotide}
              </span>
              <span className="font-mono text-sm text-[var(--muted)]">
                {formatCount(analysis.counts[nucleotide])} (
                {formatPercent(analysis.percentages[nucleotide])})
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
