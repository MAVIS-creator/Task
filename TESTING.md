# Testing

## Automated checks

```bash
node --check server/index.js
npm run build
```

## Manual checklist

- [ ] Landing page loads at `/`
- [ ] Sign up creates a local demo session
- [ ] GitHub sign-in redirects to GitHub when credentials are configured
- [ ] Callback returns to `/login` and enters the workspace
- [ ] Settings saves display name and can sign out
- [ ] Task checkpoint can be created
- [ ] AI next step reports a useful response when Groq is configured
- [ ] Document generation returns Markdown when Groq is configured
- [ ] Direct refresh of `/login`, `/tasks`, and `/documents` works on Vercel/Netlify
- [ ] No secret is present in source, docs, or client bundle

## Screenshot plan

Start `npm run dev:api` and `npm run dev`, then use Playwright or a browser to capture 1440px-wide screenshots of landing, login, overview, Tasks, Documents, and Settings. Store approved images in `docs/screenshots/` before Devpost submission.

## Current test limitation

The execution environment can intermittently block Vite/esbuild child processes with `spawn EPERM`. Run the checks in CI or locally when this occurs.
