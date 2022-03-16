import { onMounted, onUnmounted } from 'vue'
import { useToast, Toast } from '/@/store/toast'

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
