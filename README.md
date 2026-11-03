# Tastebuds Intro Animation (Part 1)

Designer-to-dev visual prototype of the Tastebuds splash / intro sequence. No backend — pure motion for your engineers to reference.

## Run locally

```bash
npm install
npm run web      # browser preview
npm start       # Expo Go / simulator
```

## What plays

1. Food drops into a tilted brown bowl  
2. Bowl straightens  
3. Food collapses; orange smile peeks from the rim  
4. Smile launches up; bowl exits down  
5. `"you hungryyyyyyyyyyyyyyyyyyyy?"` types on screen  
6. Text softens to beige; smile shrinks toward the top  
7. Composed **Tastebuds** wordmark appears; text blurs; search chrome fades in  

Tap **Replay** (top right) to re-run the sequence.

## Tunables

Edit [`src/intro/phases.ts`](src/intro/phases.ts):

- `DURATIONS` — phase lengths and typewriter speed  
- `SPRINGS` — punchiness of drops / launch  
- `BOWL_START_TILT`, `FOOD_START`, `FOOD_PEEK` — layout keyframes  
- `COLORS`, `HUNGRY_TEXT`, `LAYOUT` — brand tokens  

## Assets

Runtime PNGs live in `assets/intro/` (`pepper`, `leek`, `tomato`, `radish`). The smile mark is a vector component (`SmileMark`). Design keyframe screens are in `assets/intro/refs/` for comparison.

## Stack

Expo (React Native) + Reanimated + Gesture Handler + Expo Font (Nunito).

Part 2 (interactive landing) should hook `onComplete` from `IntroSequence`.
