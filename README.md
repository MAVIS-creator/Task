# Project Brain

Project Brain is an AI-powered project intelligence workspace that preserves development context across repositories, task checkpoints, and generated documents.

## Hackathon MVP

- GitHub OAuth sign-in and repository-read authorization
- Project overview, repository intelligence, project-memory, and assistant UI
- TaskPal-inspired task checkpoints with AI next-step guidance
- Groq-powered document drafting using `openai/gpt-oss-120b`
- Netlify and Vercel deployment configuration

## Quick start

```bash
cp .env.example .env
npm install
npm run dev:api
npm run dev
```

Open `http://localhost:5173`. See [INSTALLATION.md](INSTALLATION.md), [SYSTEM_DESIGN.md](SYSTEM_DESIGN.md), and [DEPLOYMENT.md](DEPLOYMENT.md).

## Screenshots

Run the app locally, then capture the landing, login, overview, Tasks, and Documents routes for Devpost. Screenshot automation is documented in [TESTING.md](TESTING.md).

## Status

The MVP keeps task/document state in server memory; durable persistence and repository intelligence ingestion are planned work, not completed claims.
