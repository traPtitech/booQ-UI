import { ref, Ref } from 'vue'

const useDevidedOpener = (): {
  isOpen: Ref<boolean>
  open: () => void
  close: () => void
} => {
  const isOpen = ref(false)

  const open = () => {
    isOpen.value = true
  }

  const close = () => {
    isOpen.value = false
  }
  return {
    isOpen,
    open,
    close
  }
}

export default useDevidedOpener
