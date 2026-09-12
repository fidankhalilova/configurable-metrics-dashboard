import type { IconType } from 'react-icons'
import { FiEye, FiUsers, FiDollarSign, FiActivity, FiTrendingUp, FiTrendingDown } from 'react-icons/fi'

export interface CardConfig {
  id: string
  title: string
  icon: IconType
  min: number
  max: number
  prefix?: string
  suffix?: string
}

export const cardCatalog: Record<string, CardConfig> = {
  pageViews: { id: 'pageViews', title: 'Page Views', icon: FiEye, min: 500, max: 12000 },
  followers: { id: 'followers', title: 'Followers', icon: FiUsers, min: 100, max: 8000 },
  revenue: { id: 'revenue', title: 'Revenue', icon: FiDollarSign, min: 1000, max: 45000, prefix: '$' },
  activeUsers: { id: 'activeUsers', title: 'Active Users', icon: FiActivity, min: 50, max: 3000 },
  conversionRate: { id: 'conversionRate', title: 'Conversion Rate', icon: FiTrendingUp, min: 1, max: 12, suffix: '%' },
  bounceRate: { id: 'bounceRate', title: 'Bounce Rate', icon: FiTrendingDown, min: 20, max: 75, suffix: '%' },
}