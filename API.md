# API

| Route | Method | Purpose |
|---|---:|---|
| `/api/health` | GET | API/model readiness |
| `/api/github/connect` | GET | Start GitHub OAuth |
| `/api/github/callback` | GET | OAuth callback |
| `/api/auth/session` | GET | Read temporary OAuth session profile |
| `/api/github/repos` | GET | List connected GitHub repositories |
| `/api/tasks` | GET/POST | List/create lightweight tasks |
| `/api/tasks/next-step` | POST | Generate next step with Groq |
| `/api/documents` | GET | List generated documents |
| `/api/documents/generate` | POST | Generate Markdown document with Groq |

## AI workflow

```mermaid
sequenceDiagram
  participant UI as Task or Document UI
  participant API as API
  participant Groq as GPT-OSS 120B
  UI->>API: POST prompt and project context
  API->>API: validate input and secret exists
  API->>Groq: chat completion
  Groq-->>API: generated text
  API-->>UI: next step or document
```

Never send `GROQ_API_KEY` to the browser.
