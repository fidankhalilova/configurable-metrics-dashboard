import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { FiMove, FiMaximize2 } from 'react-icons/fi'
import { MetricCard } from './MetricCard'
import { cardCatalog } from './cardCatalog'
import { useAppState } from '../../state/StateContext'
import type { CardSize } from '../../state/types'

interface SortableCardProps {
  id: string
}

const SPAN_CLASSES: Record<CardSize, string> = {
  sm: 'col-span-1',
  md: 'col-span-1',
  lg: 'col-span-1 sm:col-span-2',
}

export function SortableCard({ id }: SortableCardProps) {
  const { state, dispatch } = useAppState()
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })
  const config = cardCatalog[id]
  const size = state.sizes[id] ?? 'md'

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1, 
  }

  const cycleSize = () => dispatch({ type: 'CYCLE_CARD_SIZE', payload: { id } })

  return (
    <div ref={setNodeRef} style={style} className={`relative ${SPAN_CLASSES[size]}`}>
      <div className="absolute right-2 top-2 z-10 flex gap-1">
        <button
          type="button"
          onClick={cycleSize}
          aria-label={`Resize ${config?.title ?? id}, current size ${size}`}
          className="rounded p-1 text-(--color-text-muted) hover:bg-(--color-bg-alt) hover:text-(--color-text)"
        >
          <FiMaximize2 size={13} />
        </button>
        <button
          type="button"
          {...attributes}
          {...listeners}
          aria-label={`Drag to reorder ${config?.title ?? id}`}
          className="cursor-grab touch-none rounded p-1 text-(--color-text-muted) hover:bg-(--color-bg-alt) hover:text-(--color-text) active:cursor-grabbing"
        >
          <FiMove size={13} />
        </button>
      </div>
      <MetricCard cardId={id} size={size} />
    </div>
  )
}