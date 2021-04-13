import { ref, Ref, ComputedRef, computed } from 'vue'
import apis, { ItemSummary, Owner, LogType, Log } from '/@/lib/apis'
import { OwnerWithCount } from './owners'
import { stringifyDate } from '/@/lib/date'
import useMe from '/@/use/me'
import { useStore } from '/@/store'
import { getRentalUserBorrowedFrom } from '/@/lib/item'

const useReturn = (props: {
  item: ItemSummary
}): {
  details: ComputedRef<OwnerWithCount[]>
  selectedOwnerName: Ref<string>
  count: Ref<number>
  owner: ComputedRef<Owner | undefined>
  returnItem: () => Promise<void | Log>
} => {
  const { id: myId } = useMe()

  const details = computed(() =>
    getRentalUserBorrowedFrom(myId.value, props.item.rentalUsers).map(v => ({
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
      const { data: newLog } = await apis.postLog(props.item.id, log)
      store.commit.addToast({
        type: 'success',
        text: `あなたは「${props.item.name}」を${count.value}個返却しました。`
      })
      return newLog
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

export default useReturn
