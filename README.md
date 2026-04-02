# 382-1st-Proj: STEM Professor Finder

A fast, minimal web app for students to discover and compare top-rated STEM professors by school and subject.

## What Was Built

### MVP Features (✅ Complete)

1. **Confidence-Aware Ranking Engine**
   - Bayesian scoring that avoids small-sample bias
   - Blends actual ratings with assumed prior (3.5 stars) based on rating count
   - Applies light difficulty penalties and would-take-again bonuses
   - Pure, testable functions in `utils/rankingEngine.ts`

2. **Provider-Based Data Layer**
   - Context API with `ProfessorProvider` hook
   - Filters professors by school and subject
   - Returns top 5 ranked results
   - Mock dataset: 12 professors across 3 schools (MIT, Stanford, Harvard), 5 subjects

3. **Minimal, Fast UI**
   - Clean filter buttons (school + subject)
   - Expandable professor cards showing:
     - Name, school, subject, department
     - Rating (0-5), rating count
     - Difficulty (if available)
     - Would-take-again % (if available)
     - Highest and lowest rated comments with dates
   - Ranking display (1-5 with calculated scores)

4. **Polish**
   - Rating distribution chart with stats (avg, total, count)
   - Loading, empty, and error states
   - Responsive design (mobile-friendly)
   - No animations, no bloat—pure Tailwind CSS utility classes
   - TypeScript strict mode with type safety

## Project Structure

```
src/
├── types/
│   └── professor.ts          # Core interfaces: Professor, Comment, RankingScore
├── data/
│   └── mockProfessors.ts      # 12 professors with ratings, comments, metadata
├── utils/
│   └── rankingEngine.ts       # Ranking logic (pure functions, testable)
├── hooks/
│   └── useProfessors.tsx      # Context provider + hook for data management
├── components/
│   ├── FilterControls.tsx     # School/subject filter buttons
│   ├── ProfessorCard.tsx      # Expandable professor detail card
│   ├── ProfessorResults.tsx   # Top 5 results list
│   └── RatingDistribution.tsx # Simple chart + stats
├── App.tsx                    # Main layout
├── main.tsx                   # React entry point
└── index.css                  # Tailwind directives

Config:
├── vite.config.ts             # Vite build config
├── tailwind.config.js         # Tailwind CSS setup
├── postcss.config.js          # PostCSS + Tailwind plugin
├── tsconfig.json              # TypeScript strict mode
└── package.json               # Dependencies (React 19, Vite, Tailwind)
```

## How the Ranking Algorithm Works

**File:** `src/utils/rankingEngine.ts`

The algorithm uses Bayesian weighting to prevent bias from small sample sizes:

1. **Base Score** (0-5): The professor's actual rating
2. **Confidence Adjustment**: 
   - With <30 ratings: Blend toward 3.5 (assumed average)
   - With 100+ ratings: Trust the actual rating more
   - Example: 4.8 rating with 10 reviews → ~3.8 adjusted (regressed toward mean)
   - Example: 4.8 rating with 150 reviews → ~4.75 adjusted (mostly trusted)

3. **Difficulty Penalty**: -0.05 per 1 point (max -0.25 for difficulty 5.0)
4. **Would-Take-Again Bonus**: +(0.2 × percentage/100) (max +0.2 for 100%)

**Result:** Top 5 professors ranked by final score.

## Running the App

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# Opens at http://localhost:5173/

# Build for production
npm run build

# Preview production build
npm run preview
```

## Stack

- **React 19** — Modern UI framework
- **TypeScript** — Type safety (strict mode enabled)
- **Vite** — Lightning-fast dev server & build
- **Tailwind CSS** — Minimal utility-first styling (no custom CSS)
- **Context API** — State management (no Redux, no complex libs)

## Size

- **JS Bundle:** 205 KB (63.86 KB gzipped)
- **CSS Bundle:** 3.69 KB (1.15 KB gzipped)
- **Modules:** 23

## Design Philosophy

✅ **Fast:** No animations, no lazy loading complexity—just instant results  
✅ **Minimal:** Only 4 components, ~800 lines of code  
✅ **Reliable:** Confidence-aware scoring, pure functions, type-safe  
✅ **Clean:** Tailwind only, no custom CSS, readable component props

## Next Phase Ideas (Post-MVP)

1. **Persist Data**
   - Backend API integration (mock first, then real)
   - Real professor data from RateMyProfessor or university APIs

2. **Advanced Filtering**
   - Search by professor name
   - Filter by minimum ratings / difficulty
   - Sort options (rating, difficulty, would-take-again)

3. **Student Review Submission**
   - Add rating + comment form
   - Local storage or API backend

4. **Enhanced Visualization**
   - Rating scatter plot (rating vs difficulty)
   - Word cloud from comment text
   - Department comparison charts

5. **Performance**
   - Add React Query for server state
   - Pagination for large result sets
   - Search index for fast filtering

6. **Mobile App**
   - React Native version
   - Deep links for sharing professors

---

**Status:** MVP complete ✅  
**Build:** Passing ✅  
**Deployment Ready:** Yes (static export to `dist/`)
