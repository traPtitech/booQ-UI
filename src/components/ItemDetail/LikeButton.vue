<template>
  <div :class="$style.container" @mouseenter="enter" @mouseleave="leave">
    <button :class="$style.button" @click="toggleLike">
      <icon v-show="!isLiked" name="mdi:heart-outline" :size="32" />
      <icon
        v-show="isLiked"
        name="mdi:heart"
        :size="32"
        :class="$style.liked"
      />
      <transition name="fade">
        <like-button-balloon
          v-if="isHover"
          :hamidashi-right="36 / 2 + 20"
          :width="balloonWidth"
          :left="HEART_CONTAINER_SIZE / 2"
          :top="HEART_CONTAINER_SIZE"
          @click.stop
        >
          <div :class="likes.length ? $style.userContainer : ''">
            <div v-if="likes.length === 0">誰もいいねしていません</div>
            <user-icon v-for="u in likes" :key="u.id" :user-name="u.name" />
          </div>
        </like-button-balloon>
      </transition>
    </button>
    <div>{{ likes.length }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import { User } from '/@/lib/apis'
import Icon from '/@/components/UI/Icon.vue'
import LikeButtonBalloon from './LikeButtonBalloon.vue'
import UserIcon from '/@/components/UI/UserIcon.vue'
import useLike from './use/like'

const HEART_CONTAINER_SIZE = 32 + 8 * 2

export default defineComponent({
  name: 'LikeButton',
  components: { Icon, LikeButtonBalloon, UserIcon },
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
    const { isLiked, toggleLike, balloonWidth } = useLike(props)

    const isHover = ref(false)
    const enter = () => (isHover.value = true)
    const leave = () => (isHover.value = false)
    return {
      isLiked,
      toggleLike,
      balloonWidth,
      isHover,
      enter,
      leave,
      HEART_CONTAINER_SIZE
    }
  }
})
</script>

<style lang="scss" module>
.container {
  display: flex;
  align-items: center;
}

.button {
  cursor: pointer;
  background-color: $color-background;
  border: 0;
  padding: 8px;
  font: inherit;
  position: relative;

  &:focus {
    outline: 0;
  }
}

.liked {
  animation: clicked 0.5s;
  color: red;
}

.userContainer {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(36px, 1fr));
  gap: 8px;
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
