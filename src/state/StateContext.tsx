import { createContext, useContext, useEffect, useReducer, useState, type ReactNode } from 'react'
import { appReducer, type Action } from './reducer'
import { loadState, saveState } from './storage'
import type { AppState } from './types'
import { Loader } from '../app/Loader'

interface StateContextValue {
  state: AppState
  dispatch: React.Dispatch<Action>
}

const StateContext = createContext<StateContextValue | null>(null)

const THEME_COLORS: Record<'light' | 'dark', string> = {
  light: '#ffffff',
  dark: '#0b1220',
}

function updateMetaThemeColor(resolved: 'light' | 'dark') {
  const meta = document.querySelector('meta[name="theme-color"]')
  meta?.setAttribute('content', THEME_COLORS[resolved])
}

export function StateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, undefined, loadState)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 250)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    saveState(state)
  }, [state])

  useEffect(() => {
    const applyResolvedTheme = () => {
      const resolved: 'light' | 'dark' =
        state.theme === 'system'
          ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
          : state.theme

      document.documentElement.setAttribute('data-theme', resolved)
      document.documentElement.setAttribute('data-theme-mode', state.theme)
      updateMetaThemeColor(resolved)
    }

    applyResolvedTheme()

    if (state.theme === 'system') {
      const mql = window.matchMedia('(prefers-color-scheme: dark)')
      mql.addEventListener('change', applyResolvedTheme)
      return () => mql.removeEventListener('change', applyResolvedTheme)
    }
  }, [state.theme])

  if (!ready) return <Loader />

  return <StateContext.Provider value={{ state, dispatch }}>{children}</StateContext.Provider>
}

export function useAppState() {
  const ctx = useContext(StateContext)
  if (!ctx) throw new Error('useAppState must be used within a StateProvider')
  return ctx
}