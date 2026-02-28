# Learn to Code Quest (React + Tailwind + Monaco)

A fantasy-themed JavaScript learning prototype inspired by Boot.dev.

## Features

- Quest engine with modular quest data and per-quest validation
- RPG progression: XP, level, health, quest completion state
- Split UI: lore/stats panel and coding forge panel
- Monaco editor for coding challenges
- Confetti celebrations for correct submissions
- Hint feedback on failures

## Stack

- React (hooks + functional components)
- Tailwind CSS
- `@monaco-editor/react`
- `react-confetti`
- Vite

## Run locally

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
npm run preview
```

## Project structure

- `src/data/QuestData.js`: quest array and validation logic
- `src/components/EditorComponent.js`: Monaco editor panel
- `src/App.js`: RPG game state + layout + core game loop
