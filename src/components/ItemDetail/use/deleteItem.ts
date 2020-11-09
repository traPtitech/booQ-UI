import apis from '/@/lib/apis'
import { useStore } from '/@/store'

const useDeleteItem = (): {
  deleteItem: (payload: { itemID: number; itemName: string }) => Promise<void>
} => {
  const store = useStore()

  const deleteItem = async (payload: {
    itemID: number
    itemName: string
  }): Promise<void> => {
    try {
      if (window.confirm('本当に削除しますか？')) {
        await apis.deleteItem(payload.itemID)
        store.commit.addToast({
          type: 'success',
          text: `「${payload.itemName}」を削除しました。`
        })
      }
    } catch (e) {
      store.commit.addToast({
        type: 'error',
        text: e.toString()
      })
    }
  }
  return { deleteItem }
}

export default useDeleteItem
