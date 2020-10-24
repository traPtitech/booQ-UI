import { ref, Ref, ComputedRef, computed } from 'vue'
import apis, { ItemSummary, ItemType, Owner, LogType } from '/@/lib/apis'
import useOwners, { OwnerDetail } from './owners'
import { stringifyDate } from '/@/lib/date'

const useBorrow = (props: {
  item: ItemSummary
}): {
  details: ComputedRef<OwnerDetail[]>
  selectedOwnerName: Ref<string>
  purpose: Ref<string>
  dueDate: Ref<string>
  count: Ref<number>
  owner: ComputedRef<Owner | undefined>
  borrow: () => Promise<void>
} => {
  const { details } = useOwners(props)
  const selectedOwnerName = ref(details.value[0].userName ?? '')
  const purpose = ref('')
  const dueDate = ref(stringifyDate(new Date(), '-'))
  const count = ref(1)
  const owner = computed(() =>
    props.item.owners.find(v => v.user.name === selectedOwnerName.value)
  )

  const borrow = async () => {
    // countに空文字が入ってるときcheckValidity()をすり抜ける
    if (typeof count.value === 'string') {
      alert('個数が入力されていません')
      return
    }
    // TODO: storeにmeをおいたらadminならスルーするようにする
    if (props.item.type === ItemType.equipment) {
      // TODO: これリンクあっても押せないからモーダルかなんかにする
      const res = window.confirm(
        '役員には確認しましたか？\n倉庫に関してはこちら→https://wiki.trap.jp/general/%E5%80%89%E5%BA%AB'
      )
      if (!res) {
        return
      }
    }
    if (!owner.value) {
      alert('unexpcted error: owner information is destroyed')
      return
    }
    const log = {
      ownerId: owner.value.user.id,
      type: LogType.borrow,
      purpose: purpose.value,
      dueDate: dueDate.value,
      count: count.value
    }
    try {
      await apis.postLog(props.item.id, log)
      alert(`あなたは「${props.item.name}」を${count.value}個借りました。`)
    } catch (e) {
      alert(e)
    }
  }
  return {
    details,
    selectedOwnerName,
    purpose,
    dueDate,
    count,
    owner,
    borrow
  }
}

export default useBorrow
