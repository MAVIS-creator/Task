import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Github } from 'lucide-react';
import { useEffect, useState } from 'react';
import DevPalLogo from '../components/DevPalLogo';

export default function AuthPage({ mode, onAuth }) {
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const signup = mode === 'signup';

  useEffect(() => {
    const session = query.get('session');
    if (query.get('github') === 'failed') setError('GitHub sign-in did not finish. Please try again.');
    if (session) {
      fetch(`/api/auth/session?session=${encodeURIComponent(session)}`)
        .then((r) => r.json())
        .then((d) => {
          if (!d.user) throw new Error();
          localStorage.setItem('devpal-ai-user', JSON.stringify(d.user));
          onAuth();
          navigate('/overview');
        })
        .catch(() => setError('Your GitHub session expired. Please sign in again.'));
    }
  }, [query, navigate, onAuth]);

  function submit(e) {
    e.preventDefault();
    const user = { name: name || email.split('@')[0], email, login: email.split('@')[0] };
    localStorage.setItem('devpal-ai-user', JSON.stringify(user));
    onAuth();
    navigate('/overview');
  }

  return (
    <main className="auth">
      <Link className="brand" to="/">
        <DevPalLogo size={36} showText={true} />
      </Link>

      <form onSubmit={submit}>
        <p className="eyebrow">{signup ? 'CREATE YOUR WORKSPACE' : 'WELCOME BACK'}</p>
        <h1>{signup ? 'Start with DevPal AI context.' : 'Sign in to DevPal AI.'}</h1>
        <p className="muted">
          {signup
            ? 'Create an account to connect your first repository.'
            : 'Continue with GitHub or use a local developer account.'}
        </p>

        <a className="github-login" href="/api/github/connect">
          <Github size={18} /> Continue with GitHub
        </a>

        <div className="auth-divider">
          <span>or</span>
        </div>

        {signup && (
          <label>
            Name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
            />
          </label>
        )}

        <label>
          Email
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            type="email"
            required
          />
        </label>

        <label>
          Password
          <input placeholder="••••••••" type="password" required minLength={6} />
        </label>

        <button className="button">{signup ? 'Create account' : 'Sign in'}</button>

        {error && <p className="error">{error}</p>}

        <p className="switch">
          {signup ? 'Already have an account?' : 'New to DevPal AI?'}{' '}
          <Link to={signup ? '/login' : '/signup'}>{signup ? 'Sign in' : 'Create one'}</Link>
        </p>
      </form>
    </main>
  );
}
