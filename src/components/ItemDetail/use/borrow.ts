import { ref, Ref, ComputedRef, computed, watch } from 'vue'
import apis, { ItemType, Owner, LogType, ItemDetail, Log } from '/@/lib/apis'
import useOwners, { OwnerDetail } from './owners'
import { stringifyDate } from '/@/lib/date'
import useMe from '/@/use/me'
import { useStore } from '/@/store'

const useBorrow = (props: {
  item: ItemDetail
}): {
  ownerDetails: ComputedRef<OwnerDetail[]>
  selectedOwnerName: Ref<string>
  purpose: Ref<string>
  dueDate: Ref<Date>
  count: Ref<number>
  owner: ComputedRef<Owner | undefined>
  borrow: () => Promise<Log | undefined>
} => {
  const { ownerDetails } = useOwners(props)
  const { admin } = useMe()
  const store = useStore()

  const selectedOwnerName = ref(ownerDetails.value[0]?.userName ?? '')
  const purpose = ref('')
  const dueDate = ref(new Date())
  const count = ref(1)
  const owner = computed(() =>
    props.item.owners.find(v => v.user.name === selectedOwnerName.value)
  )

  watch(
    ownerDetails,
    (newDetails, oldDetails) => {
      if ((!oldDetails || oldDetails.length === 0) && newDetails.length > 0) {
        return
      }

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      selectedOwnerName.value = newDetails[0]!.userName
    },
    { immediate: true }
  )

  const borrow = async () => {
    // countに空文字が入ってるときcheckValidity()をすり抜ける
    if (typeof count.value === 'string') {
      store.commit.addToast({
        type: 'error',
        text: '個数が入力されていません'
      })
      return
    }
    if (!admin.value && props.item.type === ItemType.equipment) {
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
      dueDate: stringifyDate(dueDate.value, '-'),
      count: count.value
    }
    try {
      const { data: newLog } = await apis.postLog(props.item.id, log)
      store.commit.addToast({
        type: 'success',
        text: `あなたは「${props.item.name}」を${count.value}個借りました。`
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
    ownerDetails,
    selectedOwnerName,
    purpose,
    dueDate,
    count,
    owner,
    borrow
  }
}

export default useBorrow
