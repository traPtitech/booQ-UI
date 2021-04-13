import { computed, ComputedRef, Ref, ref, SetupContext } from 'vue'
import useMeasure from './measure'
import apis, { User } from '/@/lib/apis'
import { useStore } from '/@/store'
import useMe from '/@/use/me'

const useLike = (
  props: {
    likes: User[]
    itemId: number
  },
  context: SetupContext<{ updateLikes: (users: User[]) => true }>
): {
  isLiked: Ref<boolean>
  toggleLike: () => Promise<void>
  balloonWidth: ComputedRef<number>
} => {
  const { id: meID } = useMe()
  const store = useStore()
  const { measureText, measureGrid } = useMeasure()

  const isLiked = ref(props.likes.some(v => meID.value === v.id))

  const toggleLike = async () => {
    try {
      if (isLiked.value) {
        await apis.removeLike(props.itemId)
        if (store.state.me) {
          context.emit(
            'updateLikes',
            props.likes.filter(v => v.id !== meID.value)
          )
        }
      } else {
        await apis.addLike(props.itemId)
        if (store.state.me) {
          context.emit('updateLikes', [...props.likes, store.state.me])
        }
      }
      isLiked.value = !isLiked.value
    } catch (e) {
      store.commit.addToast({
        type: 'error',
        text: '「いいね」に失敗しました'
      })
    }
  }

  const balloonWidth = computed(() =>
    props.likes.length > 0
      ? measureGrid(props.likes.length, { width: 36, height: 36 }, 4, 8).width
      : measureText('誰もいいねしていません').width
  )
  return { isLiked, toggleLike, balloonWidth }
}

export default useLike
