<template>
  <div :class="$style.container">
    <button
      :class="$style.button"
      @click="toggleLike"
      @mouseenter="toggleHover"
      @mouseleave="toggleHover"
    >
      <icon v-if="!isLiked" name="mdi:heart-outline" :size="32" />
      <icon v-else name="mdi:heart" :size="32" :class="$style.liked" />
    </button>
    <transition name="fade">
      <like-button-balloon
        v-if="isHover"
        :likes="likes"
        :right="(32 + 8 * 2) / 2"
      />
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import Icon from '/@/components/UI/Icon.vue'
import apis, { User } from '/@/lib/apis'
import useMe from '/@/use/me'
import { useStore } from '/@/store'
import LikeButtonBalloon from './LikeButtonBalloon.vue'

export default defineComponent({
  name: 'LikeButton',
  components: { Icon, LikeButtonBalloon },
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
    const isHover = ref(false)
    const toggleHover = () => (isHover.value = !isHover.value)
    return { isLiked, toggleLike, isHover, toggleHover }
  }
})
</script>

<style lang="scss" module>
.container {
  position: relative;
  display: flex;
  align-items: center;
}

.button {
  cursor: pointer;
  background-color: $color-background;
  border: 0;
  padding: 8px;

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
