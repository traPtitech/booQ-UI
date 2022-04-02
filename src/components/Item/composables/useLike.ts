import { computed, ref } from 'vue'
import type { ItemSummary } from '/@/lib/apis'
import apis from '/@/lib/apis'

const useLike = (props: { item: ItemSummary }) => {
  const isLiked = ref(props.item.isLiked)
  // 自分がいいねしたときのlikeCount
  const maxCount = computed(
    () => props.item.likeCounts + Number(!props.item.isLiked)
  )
  const likeCount = computed(() => maxCount.value - Number(!isLiked.value))
  const toggleLike = async () => {
    if (isLiked.value) {
      await apis.removeLike(props.item.id)
      isLiked.value = false
    } else {
      await apis.addLike(props.item.id)
      isLiked.value = true
    }
  }
  return { isLiked, likeCount, toggleLike }
}

export default useLike
