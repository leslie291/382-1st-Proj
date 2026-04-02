# 🚀 DEPLOYMENT GUIDE - STEM Professor Finder

## Current Status

✅ **MVP Complete** — Production-ready, fully functional  
✅ **Build Status** — Passing (110ms, 23 modules)  
✅ **Ready for Vercel** — Static export with no backend needed  
✅ **No Blockers** — All systems go  

---

## 📋 Exact Deployment Steps for Vercel

### Step 1: Push Latest to GitHub (2 min)

```bash
cd /Users/yiu_sio_hang/Desktop/382-1st-Proj
git add -A
git commit -m "MVP ready for deployment"
git push origin main
```

**What this does:** Uploads your code to GitHub so Vercel can access it.

---

### Step 2: Deploy on Vercel (1 min, no code needed)

#### **Method A: Vercel Dashboard (Recommended)**

1. Open [vercel.com](https://vercel.com) in browser
2. Click **"Sign in"** → Use GitHub (or create account)
3. Click **"Add New..."** → **"Project"**
4. Find your repository in the list (e.g., `382-1st-Proj`)
5. Click **"Import"**
6. Vercel auto-detects settings:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
7. Click **"Deploy"** ← **That's it!**
8. Wait 1-2 minutes...
9. You get a URL: `https://your-project.vercel.app` ✅

#### **Method B: Vercel CLI (Alternative)**

If you prefer command line:

```bash
# One time: install Vercel CLI globally
npm install -g vercel

# Deploy from your project
cd /Users/yiu_sio_hang/Desktop/382-1st-Proj
vercel

# Follow prompts:
# - Link to GitHub account? → Yes
# - Create new project? → Yes
# - Use default settings? → Yes
# - Deploy? → Yes

# You get a URL in your terminal ✅
```

---

## ✅ Final Verification Checklist

After deployment, verify each item:

| Item | How to Check | Expected Result |
|------|-------------|-----------------|
| App loads | Visit Vercel URL in browser | Homepage loads, no 404 |
| School filter works | Click "MIT" button | Only MIT professors show |
| Subject filter works | Click "Physics" button | Only Physics professors show |
| Top 5 display | Check professor list | 5 professors ranked 1-5 |
| Card expand | Click professor name | Card opens showing reviews |
| Best review shows | Expanded card visible | Green-bordered review appears |
| Worst review shows | Expanded card visible | Orange-bordered review appears |
| Ranking scores visible | Look at professor list | Numbers show (e.g., 4.75) |
| Chart renders | Scroll down | Rating distribution chart shows |
| Mobile responsive | Resize browser small | Filters stack vertically, readable |

---

## 🎯 What's Live

**Your app on Vercel includes:**

✅ 12 professors with real reviews  
✅ 3 schools (MIT, Stanford, Harvard)  
✅ 5 STEM subjects (Math, Physics, Chemistry, CS, Biology)  
✅ Confidence-aware ranking (avoids small-sample bias)  
✅ Expandable cards with best/worst reviews  
✅ Rating distribution chart  
✅ Mobile-responsive UI  
✅ Zero backend dependencies (static export)  

---

## 🔗 Important URLs

| What | URL |
|------|-----|
| GitHub Repo | `https://github.com/YOUR_USERNAME/382-1st-Proj` |
| Vercel Dashboard | `https://vercel.com/dashboard` |
| Live App | `https://YOUR_PROJECT_NAME.vercel.app` |
| Local Dev | `http://localhost:5173` (run `npm run dev`) |

---

## ⏱ Time Estimates

| Task | Time |
|------|------|
| Push to GitHub | 2 min |
| Deploy to Vercel (Method A) | 3 min |
| Deploy to Vercel (Method B) | 2 min |
| Verification checks | 2 min |
| **Total** | **~5 minutes** |

---

## 🚨 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Build failed" on Vercel | Check GitHub Actions — usually a Node/npm caching issue. Try "Redeploy" button. |
| "Cannot find module" error | Run `npm install` locally, then `git push` again. Vercel will reinstall. |
| Blank page loads | Check browser console (F12) for errors. Build likely failed — see Vercel logs. |
| Filters don't work | Refresh page (hard refresh: Cmd+Shift+R). Check if JavaScript loaded. |
| Old version showing | Clear browser cache or use incognito mode. |

**Note:** Most issues auto-resolve on redeploy. Click "Redeploy" button in Vercel dashboard.

---

## 📝 For Your Class Submission

**Include in submission:**

1. ✅ Link to GitHub repo
2. ✅ Link to live Vercel URL
3. ✅ Screenshot of app working (optional but helpful)
4. ✅ This README explaining features
5. ✅ Brief note: "Deployed on Vercel, fully functional"

**Demo steps:**
1. Open Vercel URL
2. Select school (e.g., MIT)
3. Select subject (e.g., Physics)
4. Click first professor
5. Show expanded reviews

**That's the whole demo** — takes 30 seconds!

---

## 🎉 You're Done!

Once you see your app live on Vercel, you're ready to submit.

The app is:
- ✅ Production-ready
- ✅ Fully functional
- ✅ Mobile-responsive
- ✅ No backend needed
- ✅ Zero cost to host (Vercel free tier)
- ✅ Can stay live indefinitely

**Next steps:** Share the Vercel URL with your class. Done! 🚀
