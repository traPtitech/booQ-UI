import { ref, Ref, ComputedRef, computed } from 'vue'
import apis, { ItemSummary, Owner, LogType } from '/@/lib/apis'
import { OwnerWithCount } from './owners'
import { stringifyDateHyphen } from '/@/lib/date'

const useReturn = (props: {
  item: ItemSummary
}): {
  details: ComputedRef<OwnerWithCount[]>
  selectedOwnerName: Ref<string>
  count: Ref<number>
  owner: ComputedRef<Owner | undefined>
  returnItem: () => Promise<void>
} => {
  // TODO: storeにmeをおいたらIDにちゃんとしたやつを入れる(10は@ryoha のID)
  const details = computed(() =>
    getOwnerBorrowedFrom(10, props.item).map(v => ({
      userName: v.user.name,
      count: v.count
    }))
  )
  const selectedOwnerName = ref(details.value[0]?.userName ?? '')
  const count = ref(1)
  const owner = computed(() =>
    props.item.owners.find(v => v.user.name === selectedOwnerName.value)
  )

  const returnItem = async () => {
    const ownerId = owner.value?.user.id
    if (!ownerId) {
      alert('unexpcted error: owner information is destroyed')
      return
    }
    // countに空文字が入ってるときcheckValidity()をすり抜ける
    if (typeof count.value === 'string') {
      alert('個数が入力されていません')
      return
    }
    const log = {
      ownerId: ownerId,
      type: LogType.return,
      count: count.value,
      purpose: '',
      dueDate: stringifyDateHyphen(new Date())
    }
    try {
      await apis.postLog(props.item.id, log)
      alert(`あなたは「${props.item.name}」を${count.value}個返却しました。`)
    } catch (e) {
      alert(e)
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
