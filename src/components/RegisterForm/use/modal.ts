import { ref, Ref } from 'vue'

const useModal = (): {
  modalShown: Ref<boolean>
  openModal: () => void
  closeModal: () => void
} => {
  const modalShown = ref(false)
  const openModal = () => {
    modalShown.value = true
  }
  const closeModal = () => {
    modalShown.value = false
  }

  return { modalShown, openModal, closeModal }
}

export default useModal
