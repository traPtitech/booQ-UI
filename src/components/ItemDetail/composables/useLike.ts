import type { ComputedRef, Ref } from 'vue'
import { computed, ref } from 'vue'
import useMeasure from './useMeasure'
import type { User } from '/@/lib/apis'
import apis from '/@/lib/apis'
import { useMeStore } from '/@/store/me'
import { useToast } from '/@/store/toast'
import useMe from '/@/composables/useMe'

const useLike = (
  props: {
    likes: User[]
    itemId: number
  },
  emit: (name: 'updateLikes', users: User[]) => void
): {
  isLiked: Ref<boolean>
  toggleLike: () => Promise<void>
  balloonWidth: ComputedRef<number>
} => {
  const { id: meID } = useMe()
  const meStore = useMeStore()
  const toastStore = useToast()
  const { measureText, measureGrid } = useMeasure()

  const isLiked = ref(props.likes.some(v => meID.value === v.id))

  const toggleLike = async () => {
    try {
      if (isLiked.value) {
        await apis.removeLike(props.itemId)
        if (meID.value) {
          emit(
            'updateLikes',
            props.likes.filter(v => v.id !== meID.value)
          )
        }
      } else {
        await apis.addLike(props.itemId)
        if (meStore.me) {
          emit('updateLikes', [...props.likes, meStore.me])
        }
      }
      isLiked.value = !isLiked.value
    } catch (e) {
      toastStore.addToast({
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
