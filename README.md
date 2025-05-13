# Jake and Amir Episode Archive

A searchable archive of Jake and Amir episodes, built with Next.js.

## Features

- Episode search with fuzzy matching
- Advanced search options:
  - Exact phrase search
  - Episode title search
- Episode listing with links to watch

## Data

Episode data is stored in `/public/jnapi-episodes.json`. The data includes:

- Episode ID
- Title
- Link to the episode on J&A website (broken links)
- Episode script
- Duration
- Air date
- Scribe information (reddit usernames)
- YouTube ID
- Alt Embed source (non-youtube)

## Getting Started

First, clone, install, and then run the development server:

```bash
npm install
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technologies Used

- [Next.js](https://nextjs.org)
- [React](https://reactjs.org)
- [Tailwind CSS](https://tailwindcss.com) - For styling

## How It Works

1. Episodes are loaded from the `/public/jnapi-episodes.json` file when the search is submitted
2. Uses NextJS API Route to return the episodes
