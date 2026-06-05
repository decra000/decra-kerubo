# DECRA KERUBO ADVISORY PLATFORM — SETUP GUIDE

Follow these steps exactly, in order. Each section builds on the previous one.

---

## STEP 1 — INSTALL DEPENDENCIES

Open your terminal in the project folder and run:

```bash
npm install
```

---

## STEP 2 — SET UP SUPABASE

### 2a. Create your Supabase project
1. Go to https://supabase.com and sign up (free)
2. Click **"New Project"**
3. Name it: `decra-kerubo`
4. Choose a strong database password — save it somewhere safe
5. Region: **East US** (closest to East Africa for now; EU Frankfurt is also fine)
6. Click **"Create New Project"** and wait ~2 minutes

### 2b. Get your API keys
1. In your Supabase project, go to **Settings → API**
2. Copy:
   - **Project URL** → this is your `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → this is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → this is your `SUPABASE_SERVICE_ROLE_KEY` (keep this secret)

### 2c. Run the database schema
1. In Supabase, go to **SQL Editor**
2. Click **"New Query"**
3. Open the file `supabase/schema.sql` from this project folder
4. Copy the entire contents and paste into the SQL editor
5. Click **"Run"**
6. You should see: "Success. No rows returned"

That creates: bookings, leads, subscribers, and messages tables.

---

## STEP 3 — SET UP RESEND (EMAIL)

1. Go to https://resend.com and sign up (free tier is fine to start)
2. Go to **API Keys** → **Create API Key**
3. Name it: `decra-kerubo-platform`
4. Copy the key — this is your `RESEND_API_KEY`
5. Go to **Domains** and add your domain (e.g. decrakero.com) — follow their DNS setup instructions
6. Until domain is verified, use `onboarding@resend.dev` as your `EMAIL_FROM`

---

## STEP 4 — FILL IN YOUR .env.local

Open `.env.local` in the project root and fill in every value:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

RESEND_API_KEY=re_...
EMAIL_FROM=onboarding@resend.dev

NEXTAUTH_SECRET=any-long-random-string-here
NEXTAUTH_URL=http://localhost:3000

NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

To generate NEXTAUTH_SECRET, run in terminal:
```bash
openssl rand -base64 32
```

---

## STEP 5 — RUN LOCALLY

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

You should see the full site. Test:
- Home page loads
- Navigate to /services, /about, /insights, /case-studies, /contact
- Go to /book and complete a booking (it will save to Supabase)
- Go to /admin to see your dashboard

---

## STEP 6 — ADD YOUR PORTRAIT PHOTO

1. Add your professional photo to: `public/portrait.jpg`
2. Open `components/home/Hero.tsx`
3. Find the placeholder section (marked with a comment)
4. Replace the placeholder div with:
```jsx
import Image from "next/image";
// ...
<Image
  src="/portrait.jpg"
  alt="Decra Kerubo"
  fill
  className="object-cover object-top"
  priority
/>
```

---

## STEP 7 — DEPLOY TO VERCEL

### 7a. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit — Decra Kerubo advisory platform"
```

Create a new **private** repo on GitHub, then:
```bash
git remote add origin https://github.com/YOUR_USERNAME/decra-kerubo.git
git push -u origin main
```

### 7b. Deploy on Vercel
1. Go to https://vercel.com and sign in with GitHub
2. Click **"Add New Project"**
3. Select your `decra-kerubo` repository
4. Framework preset: **Next.js** (auto-detected)
5. Click **"Environment Variables"** and add ALL variables from your `.env.local`:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY
   - RESEND_API_KEY
   - EMAIL_FROM
   - NEXTAUTH_SECRET
   - NEXTAUTH_URL → change this to your Vercel URL (e.g. https://decra-kerubo.vercel.app)
   - NEXT_PUBLIC_SITE_URL → same as NEXTAUTH_URL
6. Click **"Deploy"**

Vercel will build and deploy automatically. Every time you push to GitHub, it redeploys.

### 7c. Add custom domain
1. In Vercel, go to your project → **Settings → Domains**
2. Add: `decrakero.com` (or whatever domain you own)
3. Follow the DNS instructions Vercel gives you
4. Update NEXTAUTH_URL and NEXT_PUBLIC_SITE_URL env vars to your final domain

---

## STEP 8 — PROTECT THE ADMIN DASHBOARD

Right now /admin is open. To add basic protection:

1. In Vercel → Settings → Password Protection (Pro plan)
   OR
2. Add a simple middleware check. Create `middleware.ts` in the root:

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const auth = request.headers.get("authorization");
    if (auth !== `Basic ${btoa("admin:YOUR_PASSWORD_HERE")}`) {
      return new NextResponse("Unauthorized", {
        status: 401,
        headers: { "WWW-Authenticate": 'Basic realm="Admin"' },
      });
    }
  }
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };
```

Replace `YOUR_PASSWORD_HERE` with a strong password of your choice.

---

## STEP 9 — CUSTOM EMAIL DOMAIN

Once your domain is connected to Vercel:
1. Go back to Resend → Domains
2. Verify your domain
3. Update EMAIL_FROM in Vercel env vars to: `hello@decrakero.com`
4. Redeploy

---

## WHAT'S BUILT

| Page | URL |
|------|-----|
| Home | / |
| Services | /services |
| About | /about |
| Insights | /insights |
| Case Studies | /case-studies |
| Contact | /contact |
| Book a Consultation | /book |
| Admin Dashboard | /admin |

| API Endpoint | Function |
|---|---|
| POST /api/book | Creates booking, saves to Supabase, sends confirmation email |
| POST /api/contact | Saves lead, sends notification to Decra |
| POST /api/newsletter | Saves subscriber, sends guide email |

---

## CONTENT YOU NEED TO UPDATE

These are placeholders in the code that you'll want to personalize:

1. **Your photo** → `public/portrait.jpg` (see Step 6)
2. **Email address** → search for `hello@decrakero.com` and replace with your actual email
3. **LinkedIn URL** → search for `linkedin.com/in/decra-kerubo` and update
4. **Stats** → in `Hero.tsx`, update "7+" years figure
5. **Blog posts** → in `InsightsPreview.tsx` and `app/insights/page.tsx` — replace placeholder articles with real ones
6. **Case studies** → in `app/case-studies/page.tsx` — update with your actual client work
7. **Testimonials** → add a testimonials section once you have real client quotes

---

## GETTING HELP

If anything breaks or you get stuck:
- Supabase docs: https://supabase.com/docs
- Vercel docs: https://vercel.com/docs
- Resend docs: https://resend.com/docs
- Next.js docs: https://nextjs.org/docs

For the booking system, time slots are currently hardcoded in `app/book/page.tsx`.
To connect real Google Calendar availability, you'll need to set up a Google Cloud project and OAuth credentials — that's an optional upgrade once the core site is live.
