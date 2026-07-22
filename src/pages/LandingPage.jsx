import { Link } from 'react-router-dom';
import { ArrowRight, BrainCircuit, Github, Sparkles, Terminal, Code2 } from 'lucide-react';
import DevPalLogo from '../components/DevPalLogo';

export default function LandingPage() {
  return (
    <main className="landing">
      <header>
        <Link className="brand" to="/">
          <DevPalLogo size={36} showText={true} />
        </Link>
        <nav>
          <Link to="/login">Sign in</Link>
          <Link className="button" to="/signup">
            Get started <ArrowRight size={16} />
          </Link>
        </nav>
      </header>

      <section className="landing-hero">
        <p className="eyebrow purple">
          <Sparkles size={14} /> AI WORKSPACE FOR DEVELOPERS
        </p>
        <h1>
          Every project deserves <br />
          <span className="gradient-text">an AI copilot that remembers.</span>
        </h1>
        <p>
          DevPal AI turns code commits, pull requests, issues, and architectural decisions into an intelligent project memory engine for engineering teams.
        </p>
        <div className="hero-actions">
          <Link className="button" to="/signup">
            Create your workspace <ArrowRight size={17} />
          </Link>
          <Link className="text-link" to="/login">
            I already have an account
          </Link>
        </div>
      </section>

      <section className="landing-cards">
        <article>
          <div className="icon-wrapper">
            <Github size={24} />
          </div>
          <h3>Connect GitHub</h3>
          <p>Bring commits, pull requests, issues, and your repository structure into one unified workspace.</p>
        </article>

        <article>
          <div className="icon-wrapper">
            <BrainCircuit size={24} />
          </div>
          <h3>Build Project Memory</h3>
          <p>Preserve decisions, milestones, technical debt notes, and architecture diagrams automatically.</p>
        </article>

        <article>
          <div className="icon-wrapper">
            <Sparkles size={24} />
          </div>
          <h3>AI Developer Copilot</h3>
          <p>Ask questions grounded in repo context, draft documentation, and get intelligent next-step task guidance.</p>
        </article>
      </section>
    </main>
  );
}
