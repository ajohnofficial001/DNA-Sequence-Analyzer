"use client";

type SequenceInputProps = {
  value: string;
  onChange: (value: string) => void;
  onAnalyze: () => void;
  disabled?: boolean;
  errorMessage?: string | null;
};

export function SequenceInput({
  value,
  onChange,
  onAnalyze,
  disabled = false,
  errorMessage = null,
}: SequenceInputProps) {
  return (
    <section className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-sm)] sm:p-6">
      <div className="mb-4 flex flex-col gap-1">
        <label
          htmlFor="dna-sequence"
          className="text-sm font-semibold tracking-wide text-[var(--foreground)]"
        >
          DNA Sequence
        </label>
        <p className="text-sm text-[var(--muted)]">
          Paste a raw sequence containing A, T, G, and C. Whitespace and case
          are normalized automatically.
        </p>
      </div>

      <textarea
        id="dna-sequence"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={8}
        spellCheck={false}
        placeholder="ATGCGATACGCTTAGCGATCGATCG"
        className="w-full resize-y rounded-lg border border-[var(--border)] bg-[var(--input-bg)] px-4 py-3 font-mono text-sm leading-relaxed text-[var(--foreground)] outline-none transition placeholder:text-[var(--placeholder)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]"
        aria-invalid={Boolean(errorMessage)}
        aria-describedby={errorMessage ? "sequence-error" : undefined}
      />

      {errorMessage ? (
        <p
          id="sequence-error"
          role="alert"
          className="mt-3 rounded-lg border border-[var(--danger-border)] bg-[var(--danger-bg)] px-3 py-2 text-sm text-[var(--danger)]"
        >
          {errorMessage}
        </p>
      ) : null}

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-[var(--muted)]">
          Phase 1 analyzes composition only. Complements, ORFs, and FASTA upload
          come later.
        </p>
        <button
          type="button"
          onClick={onAnalyze}
          disabled={disabled}
          className="inline-flex h-11 items-center justify-center rounded-lg bg-[var(--accent)] px-5 text-sm font-semibold text-[var(--accent-fg)] transition hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Analyze Sequence
        </button>
      </div>
    </section>
  );
}
