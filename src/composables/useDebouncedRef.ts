import type { Ref } from 'vue'
import { customRef } from 'vue'

const useDebouncedRef = <T>(value: T, delay = 200): Ref<T> => {
  let timeout: number | undefined
  return customRef((track, trigger) => ({
    get() {
      track()
      return value
    },
    set(newValue: T) {
      window.clearTimeout(timeout)
      timeout = window.setTimeout(() => {
        value = newValue
        trigger()
      }, delay)
    }
  }))
}

export default useDebouncedRef
