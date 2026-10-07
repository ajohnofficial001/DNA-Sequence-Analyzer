# DNA Sequence Analyzer

A Next.js portfolio app for analyzing DNA sequences with **deterministic, programmatic** composition metrics. AI explanation is planned for a later phase and will never replace biological calculations.

**Repository:** [github.com/ajohnofficial001/DNA-Sequence-Analyzer](https://github.com/ajohnofficial001/DNA-Sequence-Analyzer)

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

Requirements: Node.js 20+ and npm.

```bash
git clone https://github.com/ajohnofficial001/DNA-Sequence-Analyzer.git
cd DNA-Sequence-Analyzer
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server (port 3000) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript (`tsc --noEmit`) |
| `npm test` | DNA analysis unit tests |

## Deploy on Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and sign in with GitHub
2. Install/configure the Vercel GitHub App so it can access this repository
3. Import `ajohnofficial001/DNA-Sequence-Analyzer`
4. Keep the default Next.js build settings and deploy

No environment variables are required for Phase 1.

## Roadmap (not implemented yet)

- Phase 2: complement, reverse complement, transcription, translation
- Phase 3: motifs, ORFs, k-mers, windowed GC
- Phase 4: FASTA upload / multi-sequence
- Phase 5: richer visualization and alignment
- Phase 6: Python / Biopython where it adds real value
- Phase 7: AI interpretation of **already computed** results
