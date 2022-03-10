import { ref, Ref, ComputedRef, computed } from 'vue'
import apis, { ItemSummary, Owner, LogType, Log, ItemDetail } from '/@/lib/apis'
import { OwnerWithCount } from './owners'
import { stringifyDate } from '/@/lib/date'
import useMe from '/@/use/me'
import { useToast } from '/@/store/toast'
import { getRentalUserBorrowedFrom } from '/@/lib/item'
import { AxiosError } from 'axios'

const useReturn = (props: {
  item: ItemSummary | ItemDetail
}): {
  details: ComputedRef<OwnerWithCount[]>
  selectedOwnerName: Ref<string>
  count: Ref<number>
  owner: ComputedRef<Owner | undefined>
  returnItem: () => Promise<Log | undefined>
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
  const toastStore = useToast()

  const returnItem = async () => {
    const ownerId = owner.value?.user.id
    if (!ownerId) {
      alert('unexpcted error: owner information is destroyed')
      return
    }
    // countに空文字が入ってるときcheckValidity()をすり抜ける
    if (typeof count.value === 'string') {
      toastStore.addToast({
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
      toastStore.addToast({
        type: 'success',
        text: `あなたは「${props.item.name}」を${count.value}個返却しました。`
      })
      return newLog
    } catch (e: unknown) {
      const err = e as AxiosError
      toastStore.addToast({
        type: 'error',
        text: err.toString()
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
