import { ref, Ref } from 'vue'

const useOpener = (): {
  isOpenDialog: Ref<boolean>
  toggleDialog: () => void
} => {
  const isOpenDialog = ref(false)

  const toggleDialog = () => {
    isOpenDialog.value = !isOpenDialog.value
  }
  return {
    isOpenDialog,
    toggleDialog
  }
}

export default useOpener
