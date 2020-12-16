<template>
  <button :class="$style.container" @click="toggleLike">
    <icon v-if="!isLiked" name="mdi:heart-outline" :size="32" />
    <icon v-else name="mdi:heart" :size="32" :class="$style.liked" />
  </button>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import IconButton from '/@/components/UI/IconButton.vue'
import Icon from '/@/components/UI/Icon.vue'
import apis, { User } from '/@/lib/apis'
import useMe from '/@/use/me'
import { useStore } from '/@/store'

export default defineComponent({
  name: 'LikeButton',
  components: { Icon },
  props: {
    itemId: {
      type: Number,
      required: true
    },
    likes: {
      type: Array as PropType<User[]>,
      default: []
    }
  },
  setup(props) {
    const { id: meID } = useMe()
    const isLiked = ref(props.likes.findIndex(v => meID.value === v.id) > -1)
    const toggleLike = async () => {
      try {
        if (isLiked.value) {
          await apis.removeLike(props.itemId)
        } else {
          await apis.addLike(props.itemId)
        }
        isLiked.value = !isLiked.value
      } catch (e) {
        const store = useStore()
        store.commit.addToast({
          type: 'error',
          text: '「いいね」に失敗しました'
        })
      }
    }
    return { isLiked, toggleLike }
  }
})
</script>

<style lang="scss" module>
.container {
  cursor: pointer;

  &:focus {
    outline: 0;
  }
}
.liked {
  animation: clicked 0.5s;
  color: red;
}

@keyframes clicked {
  0% {
    color: transparent;
  }
  25% {
    transform: translateY(-0.5rem);
    color: red;
  }
  50% {
    transform: translateY(0);
  }
  75% {
    transform: translateY(-0.25rem);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
