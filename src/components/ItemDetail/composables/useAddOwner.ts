import type { ItemType } from '/@/lib/apis'
import apis from '/@/lib/apis'
import useMe from '/@/composables/useMe'
import { useToast } from '/@/store/toast'
import { itemTypeToOwnerId, itemTypeToOwnerName } from '/@/lib/itemType'
import type { AxiosError } from 'axios'

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
  const toastStore = useToast()
  const { id, displayName } = useMe()

  const addOwner = async (payload: {
    itemID: number
    ownerType: ItemType
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
        toastStore.addToast({
          type: 'success',
          text: `所有者に ${ownerName} を追加しました。`
        })
      }
    } catch (e: unknown) {
      const err = e as AxiosError
      toastStore.addToast({
        type: 'error',
        text: err.toString()
      })
    }
  }
  return { addOwner }
}

export default useAddOwner
