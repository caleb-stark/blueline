# BlueLine

BlueLine is a React and Vite NHL stats dashboard. This starter version focuses on schedule, scores, league snapshot cards, and a standings preview.

## Setup

Install Node.js LTS first.

```bash
node -v
npm -v
```

Install project dependencies.

```bash
npm install
```

Start the app.

```bash
npm run dev
```

Open the local Vite URL shown in the terminal.

## Main Files

```txt
src
├── App.jsx
├── main.jsx
├── pages
│   └── Dashboard.jsx
├── components
│   ├── layout
│   │   ├── Navbar.jsx
│   │   ├── Navbar.css
│   │   └── PageHeader.jsx
│   ├── games
│   │   ├── GameCard.jsx
│   │   ├── GameGrid.jsx
│   │   ├── ScheduleControls.jsx
│   │   └── ScoreTicker.jsx
│   ├── stats
│   │   ├── LeagueSnapshot.jsx
│   │   └── StandingsPreview.jsx
│   └── ui
│       ├── ErrorMessage.jsx
│       └── Loading.jsx
├── styles
│   └── global.css
└── utils
    ├── api.js
    └── helpers.js
```

## Current Features

- Purple themed navigation
- Date picker for NHL games
- Refresh button
- Daily schedule cards
- Score ticker
- League snapshot stats
- Top standings preview
- Loading state
- Error retry state
- Vite proxy for NHL API requests

## NHL API Proxy

The app calls the NHL API through the local Vite proxy.

```js
const NHL_BASE_URL = "/nhl-api"
```

The proxy is configured in `vite.config.js`.

## Common Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

## If Requests Fail

Check that `vite.config.js` has this proxy key:

```js
"/nhl-api"
```

Then restart the dev server.
