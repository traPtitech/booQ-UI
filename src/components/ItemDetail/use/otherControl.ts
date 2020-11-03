import { Ref, computed } from 'vue'
import apis, { ItemSummary, Owner } from '/@/lib/apis'
import useMe from '/@/use/me'
import { useStore } from '/@/store'

const useOtherControl = (props: {
  item: ItemSummary
}): {
  ownInfo: Ref<Owner | undefined>
  isAdmin: Ref<boolean>
  deleteItem: () => Promise<void>
} => {
  const { id, admin: isAdmin } = useMe()
  const ownInfo = computed(() =>
    props.item.owners.find(v => v.ownerId === id.value)
  )
  const store = useStore()

  const deleteItem = async () => {
    if (!isAdmin.value) {
      store.commit.addToast({
        type: 'error',
        text: '現状管理者のみ物品が削除できます。'
      })
      return
    }
    try {
      if (window.confirm('本当に削除しますか？')) {
        await apis.deleteItem(props.item.id)
        store.commit.addToast({
          type: 'success',
          text: `「${props.item.name}」を削除しました。`
        })
      }
    } catch (e) {
      store.commit.addToast({
        type: 'error',
        text: e.toString()
      })
    }
  }
  return {
    ownInfo,
    isAdmin,
    deleteItem
  }
}

export default useOtherControl
