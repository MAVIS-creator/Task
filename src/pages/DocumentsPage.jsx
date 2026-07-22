import React, { useEffect, useState } from 'react';
import {
  FileText,
  Sparkles,
  Copy,
  Check,
  Download,
  BookOpen,
  FileCode,
  Layers,
  ArrowRight,
} from 'lucide-react';
import Card from '../components/Card';

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
  const [exportNotice, setExportNotice] = useState('');

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

  const handlePdfExport = () => {
    setExportNotice('PDF Export Placeholder: Document formatted for print/PDF export.');
    setTimeout(() => setExportNotice(''), 3000);
  };

  return (
    <div className="documents-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">DOCUMENT STUDIO</p>
          <h2>Automated Project Documentation</h2>
          <p>Generate high-quality Markdown specifications, READMEs, and API documentation from project context.</p>
        </div>
      </div>

      <div className="grid">
        {/* Left Column: Templates & Form */}
        <div className="doc-form-column">
          <Card>
            <p className="eyebrow">PRE-BUILT TEMPLATES</p>
            <h3>Select Document Template</h3>
            <div className="templates-grid">
              {templates.map((tpl) => (
                <button
                  key={tpl.id}
                  className="template-card-btn"
                  onClick={() => handleSelectTemplate(tpl)}
                >
                  <FileText size={16} />
                  <span>{tpl.title}</span>
                </button>
              ))}
            </div>

            <form onSubmit={handleGenerate} className="stack mt-4">
              <label>
                Document Title
                <input
                  type="text"
                  placeholder="e.g. SYSTEM_DESIGN.md"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </label>

              <label>
                Brief &amp; Specifications
                <textarea
                  placeholder="Describe key requirements or sections..."
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  rows={4}
                  required
                />
              </label>

              <button className="button" disabled={busy} type="submit">
                <Sparkles size={16} /> {busy ? 'Generating Document...' : 'Generate with AI Studio'}
              </button>
            </form>
          </Card>

          {/* Generated History */}
          {docs.length > 0 && (
            <Card className="mt-4">
              <p className="eyebrow">DOCUMENT HISTORY</p>
              <h3>Saved Documents</h3>
              <div className="saved-docs-list">
                {docs.map((d) => (
                  <button key={d.id} className="doc-history-item" onClick={() => setOutput(d.content)}>
                    <FileText size={16} />
                    <span>{d.title}</span>
                  </button>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Right Column: Markdown Output Preview */}
        <Card className="document-preview-card">
          <div className="card-title">
            <div>
              <p className="eyebrow">MARKDOWN OUTPUT</p>
              <h3>Document Preview</h3>
            </div>

            <div className="preview-actions">
              <button className="secondary-button" onClick={handleCopyMarkdown} disabled={!output}>
                {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy Markdown'}
              </button>
              <button className="secondary-button" onClick={handlePdfExport} disabled={!output}>
                <Download size={14} /> Export PDF
              </button>
            </div>
          </div>

          {exportNotice && <div className="export-notice">{exportNotice}</div>}

          <div className="markdown-output-box">
            <pre>{output || 'Select a template or fill the brief form to generate your document...'}</pre>
          </div>
        </Card>
      </div>
    </div>
  );
}
