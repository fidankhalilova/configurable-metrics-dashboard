import { FiRefreshCw } from 'react-icons/fi'
import { cardCatalog } from './cardCatalog'
import { useMetricData } from './useMetricData'
import type { CardSize } from '../../state/types'

interface MetricCardProps {
  cardId: string
  size?: CardSize
}

const VALUE_TEXT_CLASSES: Record<CardSize, string> = {
  sm: 'text-lg',
  md: 'text-2xl',
  lg: 'text-3xl',
}

const PADDING_CLASSES: Record<CardSize, string> = {
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-5',
}

export function MetricCard({ cardId, size = 'md' }: MetricCardProps) {
  const config = cardCatalog[cardId]
  const { status, data, retry } = useMetricData(cardId)

  if (!config) {
    return (
      <div className="rounded-xl border border-(--color-border) bg-(--color-bg-elevated) p-4 text-sm text-(--color-danger)">
        Unknown card: {cardId}
      </div>
    )
  }

  const Icon = config.icon

  return (
    <div className={`h-full rounded-xl border border-(--color-border) bg-(--color-bg-elevated) shadow-sm ${PADDING_CLASSES[size]}`}>
      <div className="mb-3 flex items-center gap-2 text-(--color-text-muted)">
        <Icon size={16} />
        <span className="text-xs font-medium uppercase tracking-wide">{config.title}</span>
      </div>

      {status === 'loading' && (
        <div className="h-7 w-24 animate-pulse rounded bg-(--color-border)" />
      )}

      {status === 'success' && data && (
        <div className={`font-semibold text-(--color-text) ${VALUE_TEXT_CLASSES[size]}`}>
          {data.prefix}
          {data.value.toLocaleString()}
          {data.suffix}
        </div>
      )}

      {status === 'error' && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-(--color-danger)">Failed to load</span>
          <button
            type="button"
            onClick={retry}
            className="flex items-center gap-1 text-sm underline text-(--color-accent) hover:text-(--color-accent-hover)"
          >
            <FiRefreshCw size={12} /> Retry
          </button>
        </div>
      )}
    </div>
  )
}