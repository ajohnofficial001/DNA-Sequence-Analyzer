import { AnalyzerWorkspace } from "@/components/AnalyzerWorkspace";

export default function Home() {
  return (
    <div className="relative flex min-h-full flex-1 flex-col">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] -z-10"
        style={{ background: "var(--hero-glow)" }}
      />

      <header className="border-b border-[var(--border)]/70">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-[var(--accent)]">
            Portfolio · Phase 1
          </p>
          <p className="text-xs text-[var(--muted)]">Deterministic analysis</p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
        <section className="mb-10 max-w-2xl animate-[fade-up_0.4s_ease-out]">
          <h1 className="text-4xl font-semibold tracking-tight text-[var(--foreground)] sm:text-5xl">
            DNA Sequence Analyzer
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-[var(--muted)] sm:text-xl">
            Analyze, visualize, and understand biological sequences.
          </p>
        </section>

        <AnalyzerWorkspace />
      </main>

      <footer className="border-t border-[var(--border)]/70">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-1 px-4 py-6 text-xs text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>Biological metrics are computed programmatically — not by AI.</p>
          <p>Built for incremental expansion (FASTA, ORFs, Biopython, AI).</p>
        </div>
      </footer>
    </div>
  );
}
