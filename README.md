# Tastebuds Intro Animation (Part 1)

Mobile web prototype of the Tastebuds splash / intro. Designed for phone browsers (later: add to home screen). No backend.

## Run locally

```bash
npm install
npm run web -- --port 43123
```

Open [http://127.0.0.1:43123](http://127.0.0.1:43123). On a **wide desktop window** the app sits in an iPhone frame so you can inspect the mobile POV. Narrow the window or use Chrome DevTools → iPhone device mode for a full-bleed phone viewport.

## What plays (bowl intro)

1. Food starts **above** the top of the viewport and falls into a tilted bowl  
2. Bowl straightens  
3. Food collapses — bowl reads empty — brief pause  
4. Orange smile peeks from the rim — brief pause  
5. Smile launches up; bowl exits down  
6. Tastebuds wordmark + search chrome hand off (Part 2 hooks here; “you hungry” is Part 2)

Tap **Replay** (top right) to re-run.

## Tunables

Edit [`src/intro/phases.ts`](src/intro/phases.ts):

- `DURATIONS` / `SPRINGS` — timing and punch  
- `FOOD_START` / `FOOD_PEEK` / `LAYOUT.foodSize` — drop layout  
- `LAYOUT.hungryFontSize` — Figma type (61)  
- Smile scales only via uniform `size` (asset aspect 53∶71)

## Stack

Expo (React Native Web) + Reanimated + Urbanist.
