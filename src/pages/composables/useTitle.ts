import type { Ref } from 'vue'
import { watchEffect } from 'vue'

const useTitle = (title: Ref<string>): void => {
  watchEffect(() => {
    document.title = `${title.value} - booQ`
  })
}

export default useTitle
