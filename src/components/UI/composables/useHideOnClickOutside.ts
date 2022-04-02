import type { Ref } from 'vue'
import { onBeforeUnmount, onMounted } from 'vue'

const useHideOnClickOutside = (
  scopeId: string,
  isOpen: Ref<boolean>,
  toggle: () => void
) => {
  const onClickBody = (e: MouseEvent) => {
    // 外側をクリックしたときは閉じる動作しかしない
    if (!isOpen.value) return
    if (!e.target) return

    const popupElement = (e.target as Element).closest(`#${scopeId}`)
    // クリックした箇所の親にポップアップを持たないとき
    if (!popupElement) {
      toggle()
    }
  }
  onMounted(() => {
    document.body.addEventListener('click', onClickBody)
  })
  onBeforeUnmount(() => {
    document.body.removeEventListener('click', onClickBody)
  })
}

export default useHideOnClickOutside
