# Architecture

## Folder structure

```text
api/                 Vercel serverless entry point
server/              Express application and local API runner
src/components/      Shell and reusable UI
src/pages/           Route-level React pages
public/              Logo and static assets
task ui/             Supplied design references
```

```mermaid
sequenceDiagram
  participant B as Browser
  participant API as Project Brain API
  participant GH as GitHub
  B->>API: GET /api/github/connect
  API->>GH: OAuth authorize redirect
  GH->>API: callback code and state
  API->>GH: exchange code and fetch user
  API->>B: redirect /login?session=...
  B->>API: GET /api/auth/session
  API->>B: profile
```

React routes are protected client-side after a local session marker is created. API routes must still enforce authorization before production release.
