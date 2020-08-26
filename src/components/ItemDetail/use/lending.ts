import { ref, Ref } from 'vue'

const useLending = (): {
  isOpenBorrowDialog: Ref<boolean>
  toggleBorrowDialog: () => void
} => {
  const isOpenBorrowDialog = ref(false)

  const toggleBorrowDialog = () => {
    isOpenBorrowDialog.value = !isOpenBorrowDialog.value
  }
  return {
    isOpenBorrowDialog,
    toggleBorrowDialog
  }
}

export default useLending
