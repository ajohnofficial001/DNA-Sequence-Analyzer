# DNA Sequence Analyzer

A Next.js portfolio app for analyzing DNA sequences with **deterministic, programmatic** composition metrics. AI explanation is planned for a later phase and will never replace biological calculations.

## Phase 1 features

- Paste raw DNA sequences (A/T/G/C)
- Normalize case and whitespace
- Validate input and report invalid characters
- Compute length, nucleotide counts/percentages, GC content, and AT content
- Visualize nucleotide distribution with Recharts

## Stack

- Next.js (App Router) + TypeScript + React
- Tailwind CSS
- Recharts
- Node.js built-in test runner (via `tsx`)

## Project structure

```
src/
  app/                 # App Router pages and global styles
  components/          # UI (SequenceInput, SequenceOverview, NucleotideChart)
  lib/dna/             # Analysis utilities, types, and tests
```

Sequence math lives in `src/lib/dna/` so future features (complements, ORFs, FASTA, Biopython, AI) can plug in without rewriting the UI.

## Run locally

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:43127](http://127.0.0.1:43127).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server on port 43127 |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript (`tsc --noEmit`) |
| `npm test` | DNA analysis unit tests |

## Deploy on Vercel

This Phase 1 app is a standard Next.js project with no server-only bioinformatics runtime yet, so it deploys cleanly on Vercel:

1. Push the repository to GitHub/GitLab/Bitbucket
2. Import the project in Vercel
3. Use the default Next.js build settings (`npm run build`)

## Roadmap (not implemented yet)

- Phase 2: complement, reverse complement, transcription, translation
- Phase 3: motifs, ORFs, k-mers, windowed GC
- Phase 4: FASTA upload / multi-sequence
- Phase 5: richer visualization and alignment
- Phase 6: Python / Biopython where it adds real value
- Phase 7: AI interpretation of **already computed** results
