import { Link, Outlet, useLocation } from 'react-router-dom';
import { Bot, BrainCircuit, FileText, FolderGit2, Github, LayoutDashboard, Settings, Sparkles, ListTodo } from 'lucide-react';
import DevPalLogo from './DevPalLogo';

const nav = [
  ['/overview', 'Overview', LayoutDashboard],
  ['/repository', 'Repository', FolderGit2],
  ['/brain', 'Project Memory', BrainCircuit],
  ['/assistant', 'AI Assistant', Bot],
  ['/tasks', 'Tasks', ListTodo],
  ['/documents', 'Documents', FileText],
  ['/settings', 'Settings', Settings],
];

export default function Shell() {
  const { pathname } = useLocation();
  const title = nav.find(([to]) => to === pathname)?.[1] || 'DevPal AI';

  return (
    <div className="app">
      <aside>
        <Link className="brand" to="/overview">
          <DevPalLogo size={32} showText={true} />
        </Link>
        <p className="eyebrow">DEVELOPER INTELLIGENCE</p>
        <nav>
          {nav.map(([to, label, Icon]) => (
            <Link className={pathname === to ? 'active' : ''} to={to} key={to}>
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>
        <div className="sidebar-note">
          <Sparkles size={16} />
          <span>
            DevPal Memory Engine
            <br />
            Ready for sources
          </span>
        </div>
      </aside>
      <main>
        <header>
          <div>
            <p className="eyebrow">CONNECTED WORKSPACE</p>
            <h1>{title}</h1>
          </div>
          <Link className="settings-link" to="/settings">
            <Github size={17} /> GitHub connection
          </Link>
        </header>
        <section className="content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
