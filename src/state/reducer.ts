import type { AppState, CardSize } from './types'

export type Action =
  | { type: 'SET_THEME'; payload: AppState['theme'] }
  | { type: 'REORDER_LAYOUT'; payload: string[] }
  | { type: 'TOGGLE_CARD_VISIBILITY'; payload: { id: string } }
  | { type: 'ADD_CARD'; payload: { id: string } }
  | { type: 'REMOVE_CARD'; payload: { id: string } }
  | { type: 'CYCLE_CARD_SIZE'; payload: { id: string } }
  | { type: 'IMPORT_STATE'; payload: AppState }

const SIZE_CYCLE: CardSize[] = ['sm', 'md', 'lg']

export function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload }

    case 'REORDER_LAYOUT':
      return { ...state, layout: action.payload }

    case 'TOGGLE_CARD_VISIBILITY': {
      const { id } = action.payload

      if (state.layout.includes(id)) {
        const index = state.layout.indexOf(id)
        return {
          ...state,
          layout: state.layout.filter((x) => x !== id),
          hidden: [...state.hidden, id],
          hiddenPositions: { ...state.hiddenPositions, [id]: index },
        }
      }

      if (state.hidden.includes(id)) {
        const newLayout = [...state.layout]
        const restoreIndex = state.hiddenPositions[id] ?? newLayout.length
        const clampedIndex = Math.min(Math.max(0, restoreIndex), newLayout.length)
        newLayout.splice(clampedIndex, 0, id)

        const { [id]: _removed, ...restPositions } = state.hiddenPositions

        return {
          ...state,
          hidden: state.hidden.filter((x) => x !== id),
          layout: newLayout,
          hiddenPositions: restPositions,
        }
      }

      return state
    }

    case 'ADD_CARD': {
      const { id } = action.payload
      if (state.layout.includes(id) || state.hidden.includes(id)) return state
      return { ...state, layout: [...state.layout, id] }
    }

    case 'REMOVE_CARD': {
      const { id } = action.payload
      const { [id]: _pos, ...restPositions } = state.hiddenPositions
      const { [id]: _size, ...restSizes } = state.sizes
      return {
        ...state,
        layout: state.layout.filter((x) => x !== id),
        hidden: state.hidden.filter((x) => x !== id),
        hiddenPositions: restPositions,
        sizes: restSizes,
      }
    }

    case 'CYCLE_CARD_SIZE': {
      const { id } = action.payload
      const current = state.sizes[id] ?? 'md'
      const next = SIZE_CYCLE[(SIZE_CYCLE.indexOf(current) + 1) % SIZE_CYCLE.length]
      return { ...state, sizes: { ...state.sizes, [id]: next } }
    }

    case 'IMPORT_STATE':
      return action.payload

    default:
      return state
  }
}