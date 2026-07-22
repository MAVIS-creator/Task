# System Design

## Context

DevPal AI is a React workspace with an Express API. GitHub provides identity and repository access. Groq powers task suggestions and document drafts.

```mermaid
flowchart LR
  U[Developer] --> W[React + Vite workspace]
  W --> A[Express API]
  A --> G[GitHub OAuth and API]
  A --> L[Groq GPT-OSS 120B]
  A --> M[In-memory MVP state]
```

## Components

| Component | Responsibility |
|---|---|
| Web client | Public landing, auth UI, dashboard, task and document workflows |
| API | OAuth exchange, GitHub queries, task/document endpoints |
| GitHub | OAuth identity and repository metadata |
| Groq | AI next-step and Markdown document generation |

## Technical debt

In-memory sessions/tasks/documents reset on cold starts. Production needs encrypted token storage, persistent database, CSRF/session hardening, rate limiting, and observability.
