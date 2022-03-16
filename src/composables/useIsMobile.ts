import { onUnmounted, Ref, ref } from 'vue'

const MOBILE_BREAKPOINT = '768'

const mql = window.matchMedia(`(min-width: ${MOBILE_BREAKPOINT}px)`)

const useIsMobile = (): { isMobile: Ref<boolean> } => {
  const isMobile = ref(!mql.matches)

  const onChange = (e: MediaQueryListEvent) => {
    isMobile.value = !e.matches
  }

  mql.addEventListener('change', onChange)
  onUnmounted(() => {
    mql.removeEventListener('change', onChange)
  })

  return { isMobile }
}

export default useIsMobile
