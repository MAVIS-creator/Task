import 'dotenv/config';
import crypto from 'node:crypto';
import express from 'express';

const app = express();
const port = process.env.PORT || 4000;
const sessions = new Map();
const clientId = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;
const appUrl = process.env.APP_URL || 'http://localhost:5173';
app.use(express.json());

app.get('/api/github/status', (_req, res) => res.json({ configured: Boolean(clientId && clientSecret), connected: false, message: clientId && clientSecret ? 'GitHub OAuth is ready to connect.' : 'Add GitHub OAuth credentials to enable connection.' }));
app.get('/api/github/connect', (_req, res) => {
  if (!clientId || !clientSecret) return res.status(503).json({ message: 'GitHub OAuth credentials are not configured.' });
  const state = crypto.randomUUID(); sessions.set(state, { createdAt: Date.now() });
  const params = new URLSearchParams({ client_id: clientId, redirect_uri: `${appUrl}/api/github/callback`, scope: 'read:user repo', state });
  res.redirect(`https://github.com/login/oauth/authorize?${params}`);
});
app.get('/api/github/callback', async (req, res) => {
  const session = sessions.get(req.query.state); sessions.delete(req.query.state);
  if (!session || !req.query.code) return res.redirect(`${appUrl}/settings?github=failed`);
  try {
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', { method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code: req.query.code }) });
    const token = (await tokenResponse.json()).access_token; if (!token) throw new Error('No access token');
    const profileResponse = await fetch('https://api.github.com/user', { headers: { Accept: 'application/vnd.github+json', Authorization: `Bearer ${token}`, 'User-Agent': 'Project-Brain' } });
    const profile = await profileResponse.json(); const id = crypto.randomUUID(); sessions.set(id, { token, profile, createdAt: Date.now() });
    res.redirect(`${appUrl}/settings?github=connected&session=${id}`);
  } catch { res.redirect(`${appUrl}/settings?github=failed`); }
});
app.get('/api/github/repos', async (req, res) => {
  const session = sessions.get(req.query.session); if (!session?.token) return res.status(401).json({ message: 'Connect GitHub first.' });
  const response = await fetch('https://api.github.com/user/repos?sort=updated&per_page=100', { headers: { Accept: 'application/vnd.github+json', Authorization: `Bearer ${session.token}`, 'User-Agent': 'Project-Brain' } });
  if (!response.ok) return res.status(response.status).json({ message: 'Unable to read repositories.' });
  const repos = await response.json(); res.json({ profile: session.profile, repos: repos.map(({ id, full_name, name, private: isPrivate, description, language, updated_at, default_branch }) => ({ id, full_name, name, private: isPrivate, description, language, updated_at, default_branch })) });
});
app.listen(port, () => console.log(`Project Brain API running on ${port}`));
