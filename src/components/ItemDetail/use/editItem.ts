import apis, { Owner } from '/@/lib/apis'
import { useStore } from '/@/store'

const useEditItem = (): {
  editItem: (payload: {
    itemID: number
    userID: number
    ownInfo: Owner
    rentalable: boolean
    count: number
  }) => Promise<void>
} => {
  const store = useStore()

  const editItem = async (payload: {
    itemID: number
    userID: number
    ownInfo: Owner
    rentalable: boolean
    count: number
  }): Promise<void> => {
    // countに空文字が入ってるときcheckValidity()をすり抜ける
    if (typeof payload.count === 'string') {
      store.commit.addToast({
        type: 'error',
        text: '個数が入力されていません'
      })
      return
    }
    try {
      const ownerShip = {
        userId: payload.userID,
        rentalable: payload.rentalable,
        count: payload.count
      }
      await apis.editItemOwners(payload.itemID, ownerShip)

      let message = ''
      if (payload.ownInfo.rentalable !== payload.rentalable) {
        message = `物品の登録を貸し出し${
          payload.rentalable ? '可' : '不可'
        } × ${payload.count}個 に変更しました`
      } else {
        const diff = payload.count - payload.ownInfo.count
        message = `${Math.abs(diff)}個 ${diff > 0 ? '追加' : '減ら'}しました。`
      }
      store.commit.addToast({
        type: 'success',
        text: message
      })
    } catch (e) {
      store.commit.addToast({
        type: 'error',
        text: e.toString()
      })
    }
  }
  return { editItem }
}

export default useEditItem
