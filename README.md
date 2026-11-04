# Tastebuds — Intro + Landing (designer prototype)

Mobile web prototype for Tastebuds. Part 1 is the bowl intro animation; Part 2 is the scrollable landing page from Figma. No backend.

## Run locally

```bash
npm install
npx expo start --web --port 43123
```

Open [http://127.0.0.1:43123](http://127.0.0.1:43123). On a wide desktop window the app sits in an iPhone frame. Use Chrome DevTools device mode for a full-bleed phone viewport.

## Flow

1. **Intro** — food drops, bowl physics, smile peeks and launches to the top  
2. **Landing** — blurred “you hungry…” backdrop, hero CTA, feature sections, footer  

Use **Replay intro** on the landing page to re-run Part 1.

## Tunables

- Intro motion: [`src/intro/phases.ts`](src/intro/phases.ts)  
- Landing tokens: [`src/landing/tokens.ts`](src/landing/tokens.ts)

## Stack

Expo (React Native Web) + Reanimated + Urbanist / DM Sans.
