import type { Ref } from 'vue'
import { ref } from 'vue'

const useOpener = (): {
  isOpen: Ref<boolean>
  toggle: () => void
} => {
  const isOpen = ref(false)

  const toggle = () => {
    isOpen.value = !isOpen.value
  }
  return {
    isOpen,
    toggle
  }
}

export default useOpener
