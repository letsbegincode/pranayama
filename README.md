# Yoga Guide

Step-by-step yoga sessions with timed fullscreen guidance. Built with Next.js and ready to deploy on Vercel.

## Features

- **Monthly plans** — Month 1, 2, and 3 schedules from your fitness map
- **Fullscreen timer** — Each section runs with countdown, auto-advance, skip, and exit
- **Custom sequence** — Add exercises, drag to reorder, set custom timers
- **Technique guide** — Surya Namaskar cues, pranayama notes, and rules

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import the repo — Vercel auto-detects Next.js
4. Click **Deploy**

Or use the Vercel CLI:

```bash
npm i -g vercel
vercel
```

## Project structure

```
app/
  page.tsx              Home — choose monthly or custom
  months/               Month selection and schedule preview
  custom/               Custom sequence builder
  session/              Fullscreen timer sessions
  guide/                Yoga technique reference
components/
  TimerSession.tsx      Fullscreen countdown + skip/exit
  CustomBuilder.tsx     Drag-and-drop sequence editor
lib/
  data.ts               Schedules and exercise library
```
