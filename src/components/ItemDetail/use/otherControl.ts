import { Ref, computed, ComputedRef } from 'vue'
import apis, { ItemSummary, Owner } from '/@/lib/apis'
import useMe from '/@/use/me'
import { useStore } from '/@/store'

const useOtherControl = (props: {
  item: ItemSummary
}): {
  remain: ComputedRef<number>
  ownInfo: Ref<Owner | undefined>
  isAdmin: Ref<boolean>
  editItem: (payload: { rentalable: boolean; count: number }) => Promise<void>
  deleteItem: () => Promise<void>
} => {
  const { id, admin: isAdmin } = useMe()
  const ownInfo = computed(() =>
    props.item.owners.find(v => v.ownerId === id.value)
  )
  const store = useStore()
  const remain = computed(
    () =>
      props.item.latestLogs?.find(v => v.ownerId === id.value)?.count ??
      ownInfo.value?.count ??
      0
  )

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

  const editItem = async (payload: { rentalable: boolean; count: number }) => {
    if (!ownInfo.value) {
      store.commit.addToast({
        type: 'error',
        text: '物品を所有していません。'
      })
      return
    }
    // countに空文字が入ってるときcheckValidity()をすり抜ける
    if (typeof payload.count === 'string') {
      store.commit.addToast({
        type: 'error',
        text: '個数が入力されていません'
      })
      return
    }
    if (
      ownInfo.value.count === payload.count &&
      ownInfo.value.rentalable === payload.rentalable
    ) {
      store.commit.addToast({
        type: 'error',
        text: '変更されていません。'
      })
      return
    }
    try {
      const ownerShip = {
        userId: id.value,
        rentalable: payload.rentalable,
        count: payload.count
      }
      await apis.editItemOwners(props.item.id, ownerShip)

      const message = (() => {
        if (ownInfo.value.rentalable !== payload.rentalable) {
          return `物品の登録を貸し出し${payload.rentalable ? '' : '不'}可 × ${
            payload.count
          }個 に変更しました`
        }
        const diff = payload.count - ownInfo.value.count
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
  return {
    remain,
    ownInfo,
    isAdmin,
    editItem,
    deleteItem
  }
}

export default useOtherControl
