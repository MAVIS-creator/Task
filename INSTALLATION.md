# Installation

## Requirements

- Node.js 20+
- GitHub OAuth App
- Groq API key for AI features

## Environment

Copy `.env.example` to `.env` and configure:

```env
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GROQ_API_KEY=
APP_URL=http://localhost:5173
PORT=4000
```

Set the GitHub OAuth callback to `http://localhost:5173/api/github/callback` for local development. Run `npm install`, `npm run dev:api`, and `npm run dev`.
