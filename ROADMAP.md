# Roadmap

## Completed features

- UI shell and supplied visual design direction
- Landing, local demo auth, and GitHub OAuth sign-in route
- Account settings and sign-out
- Task creation/checkpoint UI and AI next-step endpoint
- AI document draft endpoint and display UI
- Vercel and Netlify deployment configuration

## Current features

- GitHub OAuth uses temporary in-memory sessions
- Tasks/documents persist only for the active server process
- AI calls target Groq `openai/gpt-oss-120b` when configured

## Missing features

- Persistent users, projects, tasks, documents, and memory
- Repository selection after OAuth and background ingestion
- File upload/extraction and PDF export
- Password authentication, secure sessions, rate limiting, audit logs
- Automated tests and production monitoring

## Future work

1. Integrate TaskPal Supabase schema for microsteps, materials, and durable checkpoints.
2. Build Project Memory engine from repository activity and decisions.
3. Add NDA platform document templates, extraction, and PDF export.
4. Add GitHub webhooks and repository analysis jobs.
5. Add team collaboration and role controls.
