import { useState } from 'react'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable'
import { useAppState } from '../../state/StateContext'
import { SortableCard } from './SortableCard'
import { MetricCard } from './MetricCard'

export function CardGrid() {
  const { state, dispatch } = useAppState()
  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id))
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null)
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = state.layout.indexOf(String(active.id))
    const newIndex = state.layout.indexOf(String(over.id))
    if (oldIndex === -1 || newIndex === -1) return

    const reordered = arrayMove(state.layout, oldIndex, newIndex)
    dispatch({ type: 'REORDER_LAYOUT', payload: reordered })
  }

  if (state.layout.length === 0) {
    return (
      <div className="flex min-h-50 items-center justify-center rounded-xl border border-dashed border-(--color-border) text-sm text-(--color-text-muted)">
        No cards visible. Add or show a card above.
      </div>
    )
  }

  const activeSize = activeId ? state.sizes[activeId] ?? 'md' : 'md'

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={state.layout} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {state.layout.map((id) => (
            <SortableCard key={id} id={id} />
          ))}
        </div>
      </SortableContext>

      <DragOverlay dropAnimation={{ duration: 200, easing: 'cubic-bezier(0.2, 0, 0, 1)' }}>
        {activeId ? (
          <div className="scale-105 shadow-xl">
            <MetricCard cardId={activeId} size={activeSize} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}