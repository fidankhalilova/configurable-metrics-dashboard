import { CardManagerPanel } from '../../features/metric-cards/CardManagerPanel'
import { CardGrid } from '../../features/metric-cards/CardGrid'
import { DebugPanel } from '../../features/debug/DebugPanel'

export default function DashboardPage() {
  return (
    <div className="p-4 sm:p-6">
      <h1 className="mb-4 text-xl font-semibold text-(--color-text)">Dashboard</h1>
      <CardManagerPanel />
      <DebugPanel />
      <CardGrid />
    </div>
  )
}