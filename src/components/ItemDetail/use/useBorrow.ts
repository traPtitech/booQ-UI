import { ref, Ref, ComputedRef, computed } from 'vue'
import apis, { ItemSummary, ItemType, Owner } from '/@/lib/apis'
import useOwners, { OwnerDetail } from './useOwners'
import { stringifyDate } from '/@/lib/date'

const useBorrow = (props: {
  item: ItemSummary
}): {
  details: ComputedRef<OwnerDetail[]>
  selectedOwnerName: Ref<string>
  selectOwner: (e: InputEvent) => void
  purpose: Ref<string>
  dueDate: Ref<string>
  count: Ref<number>
  owner: ComputedRef<Owner | undefined>
  borrow: () => Promise<void>
} => {
  const { details } = useOwners(props)
  const selectedOwnerName = ref(details.value[0].userName ?? '')
  const purpose = ref('')
  const dueDate = ref(stringifyDate(new Date()).replace(/\//g, '-'))
  const count = ref(1)
  const owner = computed(() =>
    props.item.owners.find(v => v.user.name === selectedOwnerName.value)
  )

  const selectOwner = (e: InputEvent) => {
    selectedOwnerName.value = (e.target as HTMLInputElement)?.value
  }
  const borrow = async () => {
    if (props.item.type === ItemType.equipment && purpose.value === '') {
      alert('目的を入力してください')
      throw 'purpose is empty'
    }
    // TODO: storeにmeをおいたらadminならスルーするようにする
    if (props.item.type === ItemType.equipment) {
      const res = window.confirm(
        '役員には確認しましたか？\n倉庫に関してはこちら→https://wiki.trapti.tech/general/%E5%80%89%E5%BA%AB'
      )
      if (!res) {
        throw 'not confirmed'
      }
    }
    if (!owner.value) {
      alert('unexpcted error: owner information is destroyed')
      throw 'unexpcted error: owner information is destroyed'
    }
    const log = {
      ownerId: owner.value.userId,
      type: 0,
      purpose: purpose.value,
      dueDate: dueDate.value,
      count: count.value
    }
    try {
      await apis.postLog(props.item.id, log)
      alert(`あなたは「${props.item.name}」を${count.value}個借りました。`)
    } catch (e) {
      alert(e)
      throw e
    }
  }
  return {
    details,
    selectedOwnerName,
    selectOwner,
    purpose,
    dueDate,
    count,
    owner,
    borrow
  }
}

export default useBorrow
