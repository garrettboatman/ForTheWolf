# Jake and Amir Episode Archive

A searchable archive of Jake and Amir episodes, built with Next.js.

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

Clone, install, and then run the development server:

```bash
npm install
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technologies Used

- [NextJS](https://nextjs.org)
- [React](https://reactjs.org)
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
- [shadcn/ui](https://ui.shadcn.com/) - Radix components
- [Lucide React](https://lucide.dev/) - Icons

## How It Works

1. Episodes are loaded from the `/public/jnapi-episodes.json` file when the search is submitted
2. Uses NextJS API Route to return the episodes
