import { computed, watch, readonly } from 'vue'
import { useRouter } from 'vue-router'
import useOpener from '/@/composables/useOpener'
import useIsMobile from './useIsMobile'

const useNavigationShown = () => {
  const router = useRouter()
  const { isOpen, toggle: toggleNavigationShown } = useOpener()
  const { isMobile } = useIsMobile()

  const isNavigationShown = computed(() => !isMobile.value || isOpen.value)
  watch(isMobile, isMobile => {
    isOpen.value = !isMobile
  })
  router.afterEach(() => {
    isOpen.value = false
  })

  return {
    isNavigationShown,
    canToggleNavigationShown: readonly(isMobile),
    toggleNavigationShown
  }
}

export default useNavigationShown
