import { ref } from 'vue'

const useLending = (): {
  rent: () => void
  borrowItem: () => void
  returnItem: () => void
  toggleOther: () => void
} => {
  const isOpenOther = ref(false)

  const rent = () => {
    console.log('rent')
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
  return { rent, borrowItem, returnItem, toggleOther }
}

export default useLending
