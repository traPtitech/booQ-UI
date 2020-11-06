import apis, { Owner } from '/@/lib/apis'
import useMe from '/@/use/me'
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
  const editItem = async (payload: {
    itemID: number
    userID: number
    ownInfo: Owner
    rentalable: boolean
    count: number
  }): Promise<void> => {
    const store = useStore()
    const { id: meID } = useMe()
    const id = payload.userID ?? meID.value
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
        userId: id,
        rentalable: payload.rentalable,
        count: payload.count
      }
      await apis.editItemOwners(payload.itemID, ownerShip)

      const message = (() => {
        if (payload.ownInfo.rentalable !== payload.rentalable) {
          return `物品の登録を貸し出し${payload.rentalable ? '可' : '不可'} × ${
            payload.count
          }個 に変更しました`
        }
        const diff = payload.count - payload.ownInfo.count
        return `${Math.abs(diff)}個 ${diff > 0 ? '追加' : '減ら'}しました。`
      })()
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
