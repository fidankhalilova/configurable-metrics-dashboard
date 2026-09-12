import type { AppState } from './types'
import { CURRENT_VERSION } from './types'

export const defaultState: AppState = {
  version: CURRENT_VERSION,
  theme: "system",
  layout: ["pageViews", "followers", "revenue"],
  hidden: ["activeUsers", "conversionRate", "bounceRate"],
  hiddenPositions: {},
  sizes: {},
};