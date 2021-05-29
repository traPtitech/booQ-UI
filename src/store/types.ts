import { ItemSummary } from '../lib/apis'

export const DEFAULT_TOAST_TIMEOUT = 1500
export const MAX_TOAST_COUNT = 5

export interface Toast {
  /**
   * 表示タイプ
   */
  type: 'success' | 'error' | 'info'
  /**
   * 表示する文字
   */
  text: string
  /**
   * 表示する時間 (ms)
   */
  timeout: number
  /**
   * 自動付与されるid
   */
  id: number
}

export interface CartItem {
  item: ItemSummary
  ownerId: number
  count: number
}
