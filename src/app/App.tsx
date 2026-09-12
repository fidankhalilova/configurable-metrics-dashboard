import { Routes, Route } from 'react-router'
import { TopNav } from '../features/sidebar/TapNav.tsx'
import DashboardPage from './routes/DashboardPage.tsx'
import SettingsPage from './routes/SettingsPage.tsx'
import NotFoundPage from './routes/NotFoundPage.tsx'

export default function App() {
  return (
    <div className="min-h-screen bg-(--color-bg)">
      <TopNav />
      <main>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  )
}