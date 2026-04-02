# STEM Professor Finder - MVP

shy25 Sio Hang Yiu https://github.com/leslie291/382-1st-Proj
A lightweight web app for students to find and compare top-rated STEM professors by school and subject.

## ⚡ Quick Start

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## 🎯 MVP Features

**Completed & Working:**
- ✅ School selector (MIT, Stanford, Harvard)
- ✅ STEM subject selector (Math, Physics, Chemistry, CS, Biology)
- ✅ Top 5 ranked professors (confidence-aware scoring)
- ✅ Expandable professor cards with:
  - Name, school, department, subject
  - Rating (0-5) and rating count
  - Difficulty score (if available)
  - Would-take-again percentage (if available)
  - Best review (highest rated comment)
  - Worst review (lowest rated comment)
- ✅ Rating distribution chart
- ✅ Loading/empty/error states
- ✅ TypeScript strict mode
- ✅ Mobile-responsive Tailwind CSS

**Not in Scope (Phase 2+):**
- Student review submission form
- Backend database
- Live API integration
- Advanced filtering/sorting
- Animations
- Department comparisons

## 📊 How Ranking Works

The app uses **Bayesian confidence-aware scoring** to rank professors fairly:

- Professors with <30 ratings: Adjusted toward 3.5-star average (avoid bias)
- Professors with 100+ ratings: Rating mostly trusted
- Difficulty penalty: -0.05 per point (max -0.25)
- Would-take-again bonus: up to +0.2 (based on percentage)

**Example:**
- Dr. Chen: 4.8 rating, 142 reviews → Score ≈ 4.75 (trusted)
- Dr. Wilson: 4.6 rating, 20 reviews → Score ≈ 3.95 (regressed to mean)

## 📁 Project Structure

```
src/
├── types/professor.ts           # Type definitions
├── data/mockProfessors.ts        # 12 professors + reviews
├── utils/rankingEngine.ts        # Ranking algorithm
├── hooks/useProfessors.tsx       # Context provider & filtering
├── components/
│   ├── FilterControls.tsx        # School/subject buttons
│   ├── ProfessorCard.tsx         # Expandable professor card
│   ├── ProfessorResults.tsx      # Top 5 results list
│   └── RatingDistribution.tsx    # Chart + stats
├── App.tsx                       # Main layout
└── index.css                     # Tailwind CSS
```

## 🗂 Tech Stack

| Tool | Purpose |
|------|---------|
| React 19 | UI framework |
| TypeScript | Type safety (strict mode) |
| Vite | Fast build & dev server |
| Tailwind CSS | Styling (no custom CSS) |
| Context API | State management |

## 📦 Bundle Size

- JavaScript: 205 KB (63.86 KB gzipped)
- CSS: 3.69 KB (1.15 KB gzipped)
- Modules: 23

## 🚀 Deployment to Vercel

### 1. Push to GitHub

```bash
# Make sure you're in the project directory
cd /Users/yiu_sio_hang/Desktop/382-1st-Proj

# Add all files
git add -A

# Commit
git commit -m "MVP ready for submission and deployment"

# Push to your GitHub repo
git push origin main
```

### 2. Deploy on Vercel

**Option A: Via Vercel Dashboard (Fastest)**

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New..."** → **"Project"**
3. Select your GitHub repository
4. Vercel will auto-detect:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
5. Click **"Deploy"** — done in ~1 minute!

**Option B: Via Vercel CLI**

```bash
# Install Vercel CLI globally (one time)
npm i -g vercel

# Deploy from project directory
vercel

# Follow prompts (default settings work)
# Link to existing project or create new one
# Deploy! 🚀
```

### 3. Verify Deployment

- Vercel gives you a URL like `https://your-project.vercel.app`
- Click it to verify the app is live
- Try filters:
  - Select "MIT" → see professors from MIT
  - Select "Physics" → see physics professors
  - Click professor card → expand to see reviews
  - Rating chart should update dynamically

## ✅ Submission Checklist

- [ ] `npm install` runs without errors
- [ ] `npm run dev` starts server on localhost:5173
- [ ] Filters (school/subject) work
- [ ] Professor cards expand/collapse
- [ ] `npm run build` completes with ✓
- [ ] `dist/` folder is created
- [ ] App is live on Vercel
- [ ] Vercel URL works in browser

## 🔗 Links

- **GitHub:** [Your repo URL]
- **Live Demo:** [Your Vercel URL]
- **Dev Server:** `npm run dev` → http://localhost:5173

## 📝 Notes for Class

This project demonstrates:
- **Frontend Architecture:** Context API + hooks for clean state management
- **Ranking Algorithm:** Bayesian scoring to prevent small-sample bias
- **Type Safety:** TypeScript strict mode throughout
- **Build Optimization:** Vite + Tailwind for fast builds
- **Responsive Design:** Mobile-first Tailwind CSS
- **Deployment:** Static export ready for Vercel

**Time to Build:** ~2 hours (from scratch to Vercel)  
**Code Quality:** Production-ready, no linting errors, fully typed

---

**Status:** ✅ MVP Complete & Deployment Ready
