import { cardCatalog } from './cardCatalog'

export interface MetricResult {
  value: number
  prefix?: string
  suffix?: string
}

export function fetchMetric(cardId: string): Promise<MetricResult> {
  return new Promise((resolve, reject) => {
    const delay = 500 + Math.random() * 800

    setTimeout(() => {
      const config = cardCatalog[cardId]

      if (!config) {
        reject(new Error(`Unknown card id "${cardId}"`))
        return
      }

      if (Math.random() < 0.15) {
        reject(new Error('Failed to fetch metric'))
        return
      }

      const value = Math.floor(config.min + Math.random() * (config.max - config.min))
      resolve({ value, prefix: config.prefix, suffix: config.suffix })
    }, delay)
  })
}