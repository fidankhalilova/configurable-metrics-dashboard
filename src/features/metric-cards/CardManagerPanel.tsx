import { FiPlus, FiX, FiEye, FiEyeOff } from 'react-icons/fi'
import { useAppState } from '../../state/StateContext'
import { cardCatalog } from './cardCatalog'

export function CardManagerPanel() {
  const { state, dispatch } = useAppState()

  const isVisible = (id: string) => state.layout.includes(id)
  const isHidden = (id: string) => state.hidden.includes(id)
  const isAdded = (id: string) => isVisible(id) || isHidden(id)

  const handleAdd = (id: string) => dispatch({ type: 'ADD_CARD', payload: { id } })
  const handleRemove = (id: string) => dispatch({ type: 'REMOVE_CARD', payload: { id } })
  const handleToggleVisibility = (id: string) =>
    dispatch({ type: 'TOGGLE_CARD_VISIBILITY', payload: { id } })

  return (
    <div className="mb-6 rounded-xl border border-(--color-border) bg-(--color-bg-alt) p-4">
      <h2 className="mb-3 text-sm font-semibold text-(--color-text)">Manage Cards</h2>
      <ul className="flex flex-wrap gap-2">
        {Object.values(cardCatalog).map((config) => {
          const Icon = config.icon
          const added = isAdded(config.id)
          const hidden = isHidden(config.id)

          return (
            <li
              key={config.id}
              className="flex items-center gap-2 rounded-lg border border-(--color-border) bg-(--color-bg-elevated) px-3 py-2 text-sm"
            >
              <Icon size={14} className="text-(--color-text-muted)" />
              <span className={hidden ? 'text-(--color-text-muted) line-through' : 'text-(--color-text)'}>
                {config.title}
              </span>

              {added ? (
                <>
                  <button
                    type="button"
                    onClick={() => handleToggleVisibility(config.id)}
                    aria-label={hidden ? `Show ${config.title}` : `Hide ${config.title}`}
                    className="text-(--color-text-muted) hover:text-(--color-accent)"
                  >
                    {hidden ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(config.id)}
                    aria-label={`Remove ${config.title}`}
                    className="text-(--color-text-muted) hover:text-(--color-danger)"
                  >
                    <FiX size={15} />
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => handleAdd(config.id)}
                  aria-label={`Add ${config.title}`}
                  className="flex items-center gap-1 rounded bg-(--color-accent) px-2 py-0.5 text-xs font-medium text-white hover:bg-(--color-accent-hover)"
                >
                  <FiPlus size={12} /> Add
                </button>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}