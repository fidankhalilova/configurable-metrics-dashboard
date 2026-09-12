import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi'
import { useAppState } from '../../state/StateContext'

const MODES = ['light', 'dark', 'system'] as const
const ICONS = { light: FiSun, dark: FiMoon, system: FiMonitor }

export function ThemeToggle() {
  const { state, dispatch } = useAppState()
  const Icon = ICONS[state.theme]

  const cycle = () => {
    const i = MODES.indexOf(state.theme)
    dispatch({ type: 'SET_THEME', payload: MODES[(i + 1) % MODES.length] })
  }

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`Theme: ${state.theme}. Click to switch.`}
      className="flex items-center gap-2 rounded border border-(--color-border) bg-(--color-bg-alt) px-3 py-1.5 text-sm text-(--color-text) hover:bg-(--color-bg-elevated) transition-colors"
    >
      <Icon size={16} />
      <span className="hidden sm:inline">Theme: {state.theme}</span>
    </button>
  )
}