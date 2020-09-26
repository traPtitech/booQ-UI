import { ref } from 'vue'

const useLending = (): {
  lend: () => void
  borrowItem: () => void
  returnItem: () => void
  toggleOther: () => void
} => {
  const isOpenOther = ref(false)

  const lend = () => {
    console.log('lend')
  }
  const borrowItem = () => {
    console.log('borrowItem')
  }
  const returnItem = () => {
    console.log('returnItem')
  }
  const toggleOther = () => {
    console.log('toggleOther')
  }
  return { lend, borrowItem, returnItem, toggleOther }
}

export default useLending
