import { ref, Ref } from 'vue'

const useHover = (): {
  isHovered: Ref<boolean>
  open: () => void
  close: () => void
} => {
  const isHovered = ref(false)

  const open = () => {
    isHovered.value = true
  }

  const close = () => {
    isHovered.value = false
  }

  return {
    isHovered,
    open,
    close
  }
}

export default useHover
