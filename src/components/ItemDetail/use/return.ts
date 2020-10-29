import { ref, Ref, ComputedRef, computed } from 'vue'
import apis, { ItemSummary, Owner, LogType } from '/@/lib/apis'
import { OwnerWithCount } from './owners'
import { stringifyDate } from '/@/lib/date'
import useMe from '/@/use/me'
import { useStore } from '/@/store'

const useReturn = (props: {
  item: ItemSummary
}): {
  details: ComputedRef<OwnerWithCount[]>
  selectedOwnerName: Ref<string>
  count: Ref<number>
  owner: ComputedRef<Owner | undefined>
  returnItem: () => Promise<void>
} => {
  const { id: myId } = useMe()

  const details = computed(() =>
    props.item.rentalUsers
      .filter(v => v.userId === myId.value && v.count !== 0)
      .map(v => ({
        userName: v.owner.name,
        count: v.count * -1
      }))
  )
  const selectedOwnerName = ref(details.value[0]?.userName ?? '')
  const count = ref(1)
  const owner = computed(() =>
    props.item.owners.find(v => v.user.name === selectedOwnerName.value)
  )
  const store = useStore()

  const returnItem = async () => {
    const ownerId = owner.value?.user.id
    if (!ownerId) {
      alert('unexpcted error: owner information is destroyed')
      return
    }
    // countに空文字が入ってるときcheckValidity()をすり抜ける
    if (typeof count.value === 'string') {
      store.commit.addToast({
        type: 'error',
        text: '個数が入力されていません'
      })
      return
    }
    const log = {
      ownerId: ownerId,
      type: LogType.return,
      count: count.value,
      purpose: '',
      dueDate: stringifyDate(new Date(), '-')
    }
    try {
      await apis.postLog(props.item.id, log)
      store.commit.addToast({
        type: 'success',
        text: `あなたは「${props.item.name}」を${count.value}個返却しました。`
      })
    } catch (e) {
      store.commit.addToast({
        type: 'error',
        text: e.toString()
      })
    }
  }
  return {
    details,
    selectedOwnerName,
    count,
    owner,
    returnItem
  }
}

export const getOwnerBorrowedFrom = (
  userID: number,
  item: ItemSummary
): Owner[] => {
  return item.owners.filter(owner =>
    item.rentalUsers.some(
      v => owner.user.id === v.ownerId && userID === v.userId && v.count !== 0
    )
  )
}

export default useReturn
