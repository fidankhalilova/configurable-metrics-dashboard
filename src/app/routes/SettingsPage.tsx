import { FiBell, FiClock } from 'react-icons/fi'

export default function SettingsPage() {
  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl font-semibold text-(--color-text) mb-4">Settings</h1>

      <div className="max-w-md space-y-3">
        <div className="flex items-center justify-between rounded-lg border border-(--color-border) bg-(--color-bg-alt) p-3">
          <div className="flex items-center gap-3">
            <FiBell size={18} className="text-(--color-text-muted)" />
            <div>
              <div className="text-sm text-(--color-text)">Email notifications</div>
              <div className="text-xs text-(--color-text-muted)">Get notified about dashboard changes</div>
            </div>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked="false"
            aria-label="Toggle email notifications"
            className="relative h-6 w-11 rounded-full bg-(--color-border) transition-colors"
          >
            <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform" />
          </button>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-(--color-border) bg-(--color-bg-alt) p-3">
          <div className="flex items-center gap-3">
            <FiClock size={18} className="text-(--color-text-muted)" />
            <div>
              <div className="text-sm text-(--color-text)">Auto-refresh interval</div>
              <div className="text-xs text-(--color-text-muted)">How often metrics refresh</div>
            </div>
          </div>
          <select
            aria-label="Auto-refresh interval"
            className="rounded border border-(--color-border) bg-(--color-bg-elevated) px-2 py-1 text-sm text-(--color-text)"
          >
            <option>30s</option>
            <option>1m</option>
            <option>5m</option>
          </select>
        </div>
      </div>
    </div>
  )
}