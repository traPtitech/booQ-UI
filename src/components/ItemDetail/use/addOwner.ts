import apis from '/@/lib/apis'
import useMe from '/@/use/me'
import { useStore } from '/@/store'
import { OWNER_TYPES } from './otherControl'

export const addOwner = async (payload: {
  itemID: number
  ownerType: number
  rentalable: boolean
  count: number
}): Promise<void> => {
  const store = useStore()
  const { id, displayName } = useMe()

  const ownerID = payload.ownerType === 0 ? id.value : payload.ownerType
  try {
    const ownerShip = {
      userId: ownerID,
      rentalable: payload.rentalable,
      count: payload.count
    }
    await apis.postItemOwners(payload.itemID, ownerShip)

    const ownerName =
      payload.ownerType === 0
        ? displayName.value
        : OWNER_TYPES[payload.ownerType]
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
