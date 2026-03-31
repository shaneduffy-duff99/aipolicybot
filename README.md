# AIPolicyBot — Vercel Deployment Guide

## Project Structure
```
aipolicybot/
├── api/
│   └── chat.js          ← Secure backend (API key lives here)
├── public/
│   └── index.html       ← Frontend app
├── vercel.json          ← Vercel config
├── package.json
└── README.md
```

---

## Deploy in 5 Minutes

### Step 1 — Get your Anthropic API Key
1. Go to https://console.anthropic.com/
2. Click **API Keys** → **Create Key**
3. Copy the key (starts with `sk-ant-...`)

### Step 2 — Deploy to Vercel
1. Go to https://vercel.com and sign up (free)
2. Click **Add New Project**
3. Choose **"Upload"** or connect GitHub (see below)
4. Upload this entire `aipolicybot` folder

### Step 3 — Add your API Key as an Environment Variable
1. In Vercel dashboard → your project → **Settings**
2. Click **Environment Variables**
3. Add:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** `sk-ant-your-key-here`
4. Click **Save**
5. Go to **Deployments** → click **Redeploy**

### Step 4 — Done!
Your app is live at `https://your-project.vercel.app`

---

## Optional: Deploy via GitHub (recommended)

1. Create a free GitHub account at github.com
2. Create a new repository called `aipolicybot`
3. Upload all files to the repo
4. In Vercel → **Add New Project** → **Import Git Repository**
5. Select your repo → Vercel auto-deploys on every push

---

## Add Stripe Payments (when ready)

In `public/index.html`, find this line:
```js
function handleUpgrade() {
  // 👉 In production: replace with Stripe payment link
  // window.location.href = 'https://buy.stripe.com/your-link';
```

Replace with your Stripe payment link:
```js
function handleUpgrade() {
  window.location.href = 'https://buy.stripe.com/your-actual-link';
```

Get your Stripe link at: https://dashboard.stripe.com/payment-links

---

## Custom Domain
1. Vercel dashboard → your project → **Settings → Domains**
2. Add `aipolicybot.ai` (or whatever domain you own)
3. Follow the DNS instructions

---

## Security Notes
- ✅ API key is stored in Vercel environment variables (never visible to users)
- ✅ All AI calls go through `/api/chat` backend route
- ✅ Frontend never sees the API key
- ⚠️  For production, add rate limiting to `api/chat.js` to prevent abuse
