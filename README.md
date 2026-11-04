# Tastebuds — Intro + Landing (designer prototype)

Mobile web prototype for Tastebuds. Part 1 is the bowl intro animation; Part 2 is the scrollable landing page from Figma. No backend.

## Run locally

```bash
npm install
npx expo start --web --port 43123
```

Open [http://127.0.0.1:43123](http://127.0.0.1:43123). On a wide desktop window the app sits in an iPhone frame. Use Chrome DevTools device mode for a full-bleed phone viewport.

## Flow

1. **Intro** — food drops, soft filled-bowl shake, smile peeks/launches, logo dissolves  
2. **Landing** — wordmark, hero, dish carousel, match card, logs graphic, sticky search  

Each landing component fades in on its own at the same time (not a whole-page fade). Use **Replay** to re-run Part 1.

## Tunables

- Intro motion: [`src/intro/phases.ts`](src/intro/phases.ts)  
- Landing tokens / entrance: [`src/landing/tokens.ts`](src/landing/tokens.ts)

## Stack

Expo (React Native Web) + Reanimated + Urbanist / DM Sans.
