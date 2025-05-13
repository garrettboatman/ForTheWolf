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
- Link to the episode
- Episode script
- Duration
- Air date
- Scribe information
- Embed source

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technologies Used

- [Next.js](https://nextjs.org)
- [React](https://reactjs.org)
- [Fuse.js](https://fusejs.io) - Fuzzy search library
- [Tailwind CSS](https://tailwindcss.com) - For styling

## How It Works

1. Episodes are loaded from the JSON file when the page loads
2. Users can search for content in the episode scripts using the search input
3. Fuzzy search is applied by default, matching close terms
4. Advanced options allow for:
   - Exact phrase matching (disables fuzzy search)
   - Restricting search to episode titles only