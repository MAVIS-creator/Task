import React, { useEffect, useState } from 'react';

const templates = [
  { id: 'readme', title: 'README.md Overview', brief: 'Create a comprehensive README for DevPal AI detailing repository architecture, setup steps, and features.' },
  { id: 'architecture', title: 'Architecture Specification', brief: 'Document the frontend React 19 structure, Express API, Groq LLM integration, and Memory Engine graph.' },
  { id: 'api', title: 'API Endpoint Docs', brief: 'Document /api/health, /api/github/connect, /api/tasks, /api/documents/generate endpoints.' },
  { id: 'changelog', title: 'Release Notes (v1.1.0)', brief: 'Highlight DevPal AI branding, Command Palette (Ctrl+K), UI/UX redesign, and task continuity.' },
];

export default function DocumentsPage() {
  const [title, setTitle] = useState('');
  const [brief, setBrief] = useState('');
  const [docs, setDocs] = useState([]);
  const [output, setOutput] = useState('');
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch('/api/documents')
      .then((r) => r.json())
      .then((d) => setDocs(d.documents || []))
      .catch(() => {});
  }, []);

  const handleSelectTemplate = (tpl) => {
    setTitle(tpl.title);
    setBrief(tpl.brief);
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!title.trim() || !brief.trim()) return;

    setBusy(true);
    try {
      const res = await fetch('/api/documents/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, brief }),
      });
      const data = await res.json();
      if (data.document) {
        setDocs([data.document, ...docs]);
        setOutput(data.document.content);
      }
    } catch (e) {
      setOutput(`# ${title}\n\n${brief}\n\nGenerated via DevPal AI Studio.`);
    } finally {
      setBusy(false);
    }
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(output || '# DevPal AI Document');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      <div className="mb-4">
        <p className="text-primary font-display font-medium tracking-widest text-xs uppercase mb-1">
          DOCUMENT STUDIO
        </p>
        <h1 className="font-display text-3xl font-bold text-on-surface">Automated Project Documentation</h1>
        <p className="text-on-surface-variant text-sm mt-1">
          Generate high-quality Markdown specifications, READMEs, and API documentation from project context.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 space-y-4">
            <h3 className="font-display font-semibold text-lg text-on-surface">Document Templates</h3>
            <div className="grid grid-cols-2 gap-2">
              {templates.map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => handleSelectTemplate(tpl)}
                  className="p-3 rounded-xl bg-surface-container hover:bg-surface-container-high border border-outline/20 text-xs text-left font-medium text-on-surface-variant hover:text-on-surface transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-base text-primary">description</span>
                  <span className="truncate">{tpl.title}</span>
                </button>
              ))}
            </div>

            <form onSubmit={handleGenerate} className="space-y-3 pt-2">
              <input
                type="text"
                placeholder="Document title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-surface-container border border-outline/30 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none"
                required
              />

              <textarea
                placeholder="Brief & specifications..."
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                rows={4}
                className="w-full bg-surface-container border border-outline/30 rounded-xl p-3 text-sm text-on-surface focus:outline-none"
                required
              />

              <button
                type="submit"
                disabled={busy}
                className="w-full bg-primary hover:bg-primary-container text-on-primary font-display font-semibold py-3 rounded-xl text-sm transition-all flex items-center justify-center gap-2 glow-indigo"
              >
                <span className="material-symbols-outlined text-lg">auto_awesome</span>
                <span>{busy ? 'Generating Document...' : 'Generate with AI Studio'}</span>
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel p-6 space-y-4 min-h-[440px] flex flex-col">
            <div className="flex justify-between items-center">
              <h3 className="font-display font-semibold text-lg text-on-surface">Markdown Preview</h3>
              <button
                onClick={handleCopyMarkdown}
                disabled={!output}
                className="bg-surface-container hover:bg-surface-container-high border border-outline/30 text-on-surface font-semibold px-4 py-2 rounded-xl text-xs transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">{copied ? 'check' : 'content_copy'}</span>
                <span>{copied ? 'Copied' : 'Copy Markdown'}</span>
              </button>
            </div>

            <div className="flex-1 bg-[#0a0a0c] border border-white/10 rounded-xl p-4 font-code text-xs text-zinc-300 overflow-y-auto leading-relaxed">
              <pre className="whitespace-pre-wrap">
                {output || 'Select a template or fill the brief form to generate your document...'}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
