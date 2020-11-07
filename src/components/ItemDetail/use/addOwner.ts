import apis, { ItemType } from '/@/lib/apis'
import useMe from '/@/use/me'
import { useStore } from '/@/store'
import { itemTypeToStringMap } from '/@/components/RegisterForm/use/itemTypeMap'

const useAddOwner = (): {
  addOwner: (payload: {
    itemID: number
    ownerType: ItemType
    rentalable: boolean
    count: number
  }) => Promise<void>
} => {
  const addOwner = async (payload: {
    itemID: number
    ownerType: number
    rentalable: boolean
    count: number
  }): Promise<void> => {
    const store = useStore()
    const { id, displayName } = useMe()

    const ownerID =
      payload.ownerType === ItemType.individual ? id.value : payload.ownerType
    try {
      const ownerShip = {
        userId: ownerID,
        rentalable: payload.rentalable,
        count: payload.count
      }
      await apis.postItemOwners(payload.itemID, ownerShip)

      const ownerName =
        payload.ownerType === ItemType.individual
          ? displayName.value
          : itemTypeToStringMap.get(payload.ownerType)
      store.commit.addToast({
        type: 'success',
        text: `所有者に ${ownerName} を追加しました。`
      })
    } catch (e) {
      store.commit.addToast({
        type: 'error',
        text: e.toString()
      })
    }
  }
  return { addOwner }
}

export default useAddOwner
