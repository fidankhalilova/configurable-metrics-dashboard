export interface CardConfig {
  id: string
  title: string
}

export type ThemeMode = 'light' | 'dark' | 'system'
export type CardSize = 'sm' | 'md' | 'lg'

export interface AppState {
  version: number;
  theme: ThemeMode;
  layout: string[];
  hidden: string[];
  hiddenPositions: Record<string, number> 
  sizes: Record<string, CardSize>
}

export const CURRENT_VERSION = 1