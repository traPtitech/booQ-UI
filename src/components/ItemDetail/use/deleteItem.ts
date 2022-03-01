import { AxiosError } from 'axios'
import apis from '/@/lib/apis'
import { useStore } from '/@/store'

const useDeleteItem = (): {
  deleteItem: (payload: {
    itemID: number
    itemName: string
  }) => Promise<boolean>
} => {
  const store = useStore()

  const deleteItem = async (payload: {
    itemID: number
    itemName: string
  }): Promise<boolean> => {
    if (!window.confirm('本当にこの物品を削除しますか？')) {
      return false
    }

    try {
      await apis.deleteItem(payload.itemID)
      store.commit.addToast({
        type: 'success',
        text: `「${payload.itemName}」を削除しました。`
      })
      return true
    } catch (e: unknown) {
      const err = e as AxiosError
      store.commit.addToast({
        type: 'error',
        text: err.toString()
      })
    }
    return false
  }
  return { deleteItem }
}

export default useDeleteItem
