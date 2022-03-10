import { defineStore, acceptHMRUpdate } from 'pinia'
import { readonly, ref } from 'vue'

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

export const useToast = defineStore('toast', () => {
  const toasts = ref<Toast[]>([])

  let toastID = 0

  const addToast = (
    toast: Omit<Toast, 'timeout' | 'id'> & { timeout?: number }
  ) => {
    toasts.value.unshift({
      ...toast,
      id: toastID,
      timeout: toast.timeout ?? DEFAULT_TOAST_TIMEOUT
    })
    toastID++
    while (MAX_TOAST_COUNT < toasts.value.length) {
      toasts.value.pop()
    }
  }
  const removeToast = (id: number) => {
    toasts.value.splice(
      toasts.value.findIndex(v => v.id === id),
      1
    )
  }

  return { toasts: readonly(toasts), addToast, removeToast }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useToast, import.meta.hot))
}
