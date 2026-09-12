import type { AppState, CardSize } from './types'

const VALID_SIZES: CardSize[] = ['sm', 'md', 'lg']

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((v) => typeof v === 'string')
}

function isNumberRecord(value: unknown): value is Record<string, number> {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.values(value).every((v) => typeof v === 'number')
  )
}

function isSizeRecord(value: unknown): value is Record<string, CardSize> {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.values(value).every((v) => typeof v === 'string' && VALID_SIZES.includes(v as CardSize))
  )
}

export function validateAppState(value: unknown): { state: AppState } | { error: string } {
  if (typeof value !== 'object' || value === null) {
    return { error: 'Not a valid object.' }
  }

  const obj = value as Record<string, unknown>

  if (typeof obj.version !== 'number') {
    return { error: 'Missing or invalid "version" field.' }
  }
  if (obj.theme !== 'light' && obj.theme !== 'dark' && obj.theme !== 'system') {
    return { error: 'Missing or invalid "theme" field (expected light/dark/system).' }
  }
  if (!isStringArray(obj.layout)) {
    return { error: 'Missing or invalid "layout" field (expected an array of strings).' }
  }
  if (!isStringArray(obj.hidden)) {
    return { error: 'Missing or invalid "hidden" field (expected an array of strings).' }
  }
  if (!isNumberRecord(obj.hiddenPositions)) {
    return { error: 'Missing or invalid "hiddenPositions" field (expected an object of numbers).' }
  }
  if (!isSizeRecord(obj.sizes)) {
    return { error: 'Missing or invalid "sizes" field (expected an object of sm/md/lg).' }
  }

  const overlap = obj.layout.filter((id) => (obj.hidden as string[]).includes(id))
  if (overlap.length > 0) {
    return { error: `Card(s) listed in both layout and hidden: ${overlap.join(', ')}` }
  }

  return {
    state: {
      version: obj.version,
      theme: obj.theme,
      layout: obj.layout,
      hidden: obj.hidden,
      hiddenPositions: obj.hiddenPositions,
      sizes: obj.sizes,
    },
  }
}