import { onMounted, onUnmounted } from 'vue'
import type { Toast } from '/@/store/toast'
import { useToast } from '/@/store/toast'

const useAutoHide = (props: { toast: Toast }) => {
  const toastStore = useToast()
  let timer: number | undefined

  const remove = () => {
    toastStore.removeToast(props.toast.id)
  }

  onMounted(() => {
    timer = window.setTimeout(() => {
      remove()
    }, props.toast.timeout)
  })
  onUnmounted(() => {
    window.clearTimeout(timer)
  })

  return { remove }
}

export default useAutoHide
