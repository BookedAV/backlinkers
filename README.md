# Backlink Blog — Free Deployment Guide

## What This Does
Automatically displays all blog posts your bot uploads to Supabase as real web pages that Google can crawl and index.

---

## Step-by-Step Setup (10 minutes)

### 1. Create a GitHub Account (skip if you have one)
- Go to https://github.com and sign up

### 2. Upload This Project to GitHub
- Go to https://github.com/new
- Name it `backlink-blog` (or whatever you want)
- Set it to **Private**
- Click **Create repository**
- Click **"uploading an existing file"** link
- Drag the entire contents of this folder into the upload area
- Click **Commit changes**

### 3. Deploy to Vercel (Free)
- Go to https://vercel.com and sign up with your GitHub account
- Click **"Add New Project"**
- Import your `backlink-blog` repository
- Before deploying, click **Environment Variables** and add these 4:

  | Name | Value |
  |------|-------|
  | `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
  | `NEXT_PUBLIC_SUPABASE_KEY` | Your Supabase anon/publishable key |
  | `NEXT_PUBLIC_SITE_NAME` | Whatever blog name you want |
  | `NEXT_PUBLIC_SITE_DESC` | A short description for the blog |

- Click **Deploy**
- Done! Vercel gives you a free URL like `backlink-blog-xyz.vercel.app`

### 4. Update robots.txt
- After deployment, edit `public/robots.txt` and replace `yoursite.vercel.app` with your actual Vercel URL
- Also add `NEXT_PUBLIC_SITE_URL` as an environment variable in Vercel with your full URL

---

## How It Works
- Your bot posts articles to Supabase → they appear on the site within 60 seconds
- Every blog post gets its own URL: `yoursite.vercel.app/blog/article-slug`
- Google can crawl and index every page
- Built-in sitemap at `/sitemap.xml` for search engines
- Fully automatic — no manual work after setup

## Optional: Custom Domain
In Vercel dashboard → your project → Settings → Domains → add your own domain.
