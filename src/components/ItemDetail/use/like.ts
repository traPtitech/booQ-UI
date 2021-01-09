import { computed, ComputedRef, Ref, ref } from 'vue'
import useMeasure from './measure'
import apis, { User } from '/@/lib/apis'
import { useStore } from '/@/store'
import useMe from '/@/use/me'

const useLike = (props: {
  likes: User[]
  itemId: number
}): {
  isLiked: Ref<boolean>
  toggleLike: () => Promise<void>
  balloonWidth: ComputedRef<number>
} => {
  const { id: meID } = useMe()
  const isLiked = ref(props.likes.findIndex(v => meID.value === v.id) > -1)
  const toggleLike = async () => {
    try {
      if (isLiked.value) await apis.removeLike(props.itemId)
      else await apis.addLike(props.itemId)
      isLiked.value = !isLiked.value
    } catch (e) {
      const store = useStore()
      store.commit.addToast({
        type: 'error',
        text: '「いいね」に失敗しました'
      })
    }
  }

  const { measureText, measureGrid } = useMeasure()
  const balloonWidth = computed(() =>
    props.likes.length > 0
      ? measureGrid(props.likes.length, { width: 36, height: 36 }, 4, 8).width
      : measureText('誰もいいねしていません').width
  )
  return { isLiked, toggleLike, balloonWidth }
}

export default useLike
