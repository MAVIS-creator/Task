# Project Brain setup

## GitHub OAuth

1. Create a GitHub OAuth App and use `http://localhost:5173/api/github/callback` as its local callback URL.
2. Copy `.env.example` to `.env` and add `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`.
3. Run `npm install`, then run the API with `npm run dev:api` and the UI with `npm run dev`.
4. Open Settings and select **Continue with GitHub**. GitHub returns to Settings with a list of accessible repositories.

The current session store is deliberately in-memory. It supports local connection and repository selection; persistent accounts and Project Memory storage will arrive with the corresponding approved backend modules.

## Deferred modules

- **Tasks:** the UI is prepared for TaskPal checkpoints, progress, and recommendations.
- **Documents:** the UI is prepared for NDA Platform extraction, generation, templates, and PDF export.

Neither module fabricates data or functionality before its source repository is supplied.
