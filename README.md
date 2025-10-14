# Automotive repair website

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/jhin1808s-projects/v0-automotive-repair-website)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/4VzpKOZBKfx)

## Overview

This repository will stay in sync with your deployed chats on [v0.app](https://v0.app).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.app](https://v0.app).

## Deployment

Your project is live at:

**[https://vercel.com/jhin1808s-projects/v0-automotive-repair-website](https://vercel.com/jhin1808s-projects/v0-automotive-repair-website)**

## Online Booking (Appointments)

This app includes a booking page at `/booking` that embeds your scheduling provider (Calendly, Cal.com, Square Appointments, etc.).

1) Set your scheduling URL

- Add the following to an `.env.local` file (or the Vercel Project > Settings > Environment Variables):

```
NEXT_PUBLIC_BOOKING_URL=https://calendly.com/your-account/auto-service
```

- Replace the URL with your provider’s booking link. Supported options include Calendly, Cal.com, and Square Appointments (any provider that exposes a public booking page URL).

2) Deploy

- Push the change or redeploy on Vercel. The page at `/booking` will automatically embed your live booking calendar.

Optional: If you prefer a custom form + email workflow instead of a scheduling provider, create an API route under `app/api/` (e.g. `app/api/appointments/route.ts`) to send confirmation emails via a provider like Resend or SendGrid, and process availability server‑side.

## Connect Your GoDaddy Domain on Vercel

If you purchased your domain on GoDaddy, you can point it to your Vercel deployment:

- In Vercel: Project > Settings > Domains > Add Domain (enter `yourdomain.com`).
- In GoDaddy: DNS Management for your domain, add/update these records:
  - A (apex/root): `@` → `76.76.21.21` (Vercel edge IP)
  - CNAME (www): `www` → `cname.vercel-dns.com.`
- Back in Vercel, wait for verification to complete (DNS propagation can take up to an hour). Set the primary domain (typically the apex) and optionally redirect `www` → apex.

Tip: If you already have records in GoDaddy that conflict, remove the old A/CNAME records before adding the Vercel ones.

## Build your app

Continue building your app on:

**[https://v0.app/chat/projects/4VzpKOZBKfx](https://v0.app/chat/projects/4VzpKOZBKfx)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository
