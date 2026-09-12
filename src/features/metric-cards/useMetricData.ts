import { useCallback, useEffect, useState } from 'react'
import { fetchMetric, type MetricResult } from './mockApi'

type Status = 'loading' | 'success' | 'error'

interface State {
  status: Status
  data: MetricResult | null
  error: string | null
}

export function useMetricData(cardId: string) {
  const [state, setState] = useState<State>({ status: 'loading', data: null, error: null })

  const load = useCallback(() => {
    setState({ status: 'loading', data: null, error: null })
    fetchMetric(cardId)
      .then((data) => setState({ status: 'success', data, error: null }))
      .catch((err: Error) => setState({ status: 'error', data: null, error: err.message }))
  }, [cardId])

  useEffect(() => {
    load()
  }, [load])

  return { ...state, retry: load }
}