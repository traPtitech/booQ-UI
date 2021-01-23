import apis, { ItemType } from '/@/lib/apis'
import useMe from '/@/use/me'
import { useStore } from '/@/store'
import { itemTypeToOwnerId, itemTypeToOwnerName } from '/@/lib/itemType'

const useAddOwner = (
  showSuccessToast = true
): {
  addOwner: (payload: {
    itemID: number
    ownerType: ItemType
    rentalable: boolean
    count: number
  }) => Promise<void>
} => {
  const store = useStore()
  const { id, displayName } = useMe()

  const addOwner = async (payload: {
    itemID: number
    ownerType: number
    rentalable: boolean
    count: number
  }): Promise<void> => {
    const ownerID = itemTypeToOwnerId(payload.ownerType, id.value)
    try {
      const ownerShip = {
        userId: ownerID,
        rentalable: payload.rentalable,
        count: payload.count
      }
      await apis.postItemOwners(payload.itemID, ownerShip)

      if (showSuccessToast) {
        const ownerName = itemTypeToOwnerName(
          payload.ownerType,
          displayName.value
        )
        store.commit.addToast({
          type: 'success',
          text: `所有者に ${ownerName} を追加しました。`
        })
      }
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
