import { Navigate, Route, Routes } from 'react-router-dom';
import Shell from './components/Shell';
import OverviewPage from './pages/OverviewPage';
import RepositoryPage from './pages/RepositoryPage';
import BrainPage from './pages/BrainPage';
import AssistantPage from './pages/AssistantPage';
import SettingsPage from './pages/SettingsPage';
import DeferredPage from './pages/DeferredPage';
export default function App(){return <Shell><Routes><Route path="/" element={<OverviewPage/>}/><Route path="/repository" element={<RepositoryPage/>}/><Route path="/brain" element={<BrainPage/>}/><Route path="/assistant" element={<AssistantPage/>}/><Route path="/tasks" element={<DeferredPage type="Tasks" description="Task checkpoints, progress tracking, and recommendations will connect here when the TaskPal AI repository is supplied."/>}/><Route path="/documents" element={<DeferredPage type="Documents" description="Document extraction, generation, templates, and PDF export will connect here when the NDA Platform repository is supplied."/>}/><Route path="/settings" element={<SettingsPage/>}/><Route path="*" element={<Navigate to="/" replace/>}/></Routes></Shell>}
