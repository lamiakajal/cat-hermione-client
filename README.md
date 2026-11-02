# UnityPulse

**Live site:** https://cat-hermione-client.vercel.app

UnityPulse is a community platform where people create, join and track social service events in their own area, such as winter clothes distribution, riverbank cleanups and tree plantation drives.

## Features

- **Create and manage events.** Any logged-in user can publish an event with a title, type, thumbnail (image link or upload from the device), location, organizer details and a future date, then edit or delete only the events they created.
- **Join and leave in one click.** Every upcoming event has its own details page. Logged-in users can join it, leave it later, and see all their sign-ups sorted by date on the Joined Events page.
- **Upcoming events only.** Events whose date has passed are hidden automatically, and the events page supports search, type filter and date sorting.
- **Secure authentication.** Email and password sign-up with password rules (uppercase, lowercase, 6+ characters), GitHub and Google login, BetterAuth with the MongoDB adapter for credentials, and JWT-protected API routes. Sessions survive a page reload on every private route.
- **Profile management.** Update your display name, change your profile picture by link or upload, and change your password.
- **Light and dark theme.** One toggle switches the whole interface, and the layout is responsive from phones to wide desktops.
- **Live impact numbers.** The home page shows real counts of events hosted, upcoming events and volunteers pulled from the database.
- **Smooth experience.** Loading skeletons, a welcome loader, scroll progress bar, section animations and a friendly 404 page.

## Tech stack

Next.js (App Router), TypeScript, Tailwind CSS + DaisyUI, Express, MongoDB, BetterAuth (MongoDB adapter), JSON Web Tokens.

## Run locally

```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_API_URL
npm run dev
```

The API lives in the separate server repository: https://github.com/lamiakajal/cat-hermione-server. Point `NEXT_PUBLIC_API_URL` at it, for example `http://localhost:5000/api`.
