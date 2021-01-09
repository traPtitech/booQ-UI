<template>
  <div
    :class="$style.container"
    @mouseenter="toggleHover"
    @mouseleave="toggleHover"
  >
    <button ref="$button" :class="$style.button" @click="toggleLike">
      <icon v-show="!isLiked" name="mdi:heart-outline" :size="32" />
      <icon
        v-show="isLiked"
        name="mdi:heart"
        :size="32"
        :class="$style.liked"
      />
    </button>
    <div>{{ likes.length }}</div>
    <div :class="$style.likeBalloon">
      <transition name="fade">
        <like-button-balloon
          v-if="isHover"
          :right="(32 + 8 * 2) / 2"
          :width="balloonWidth"
          :top="balloonTop"
        >
          <div :class="likes.length ? $style.userContainer : ''">
            <div v-if="likes.length === 0">誰もいいねしていません</div>
            <user-icon v-for="u in likes" :key="u.id" :user-name="u.name" />
          </div>
        </like-button-balloon>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, onMounted } from 'vue'
import { User } from '/@/lib/apis'
import Icon from '/@/components/UI/Icon.vue'
import LikeButtonBalloon from './LikeButtonBalloon.vue'
import UserIcon from '/@/components/UI/UserIcon.vue'
import useLike from './use/like'
import useOpener from '../UI/use/opener'

const HEADER_HEIGHT = 70
const CONTAINER_PADDING = 48 + 16

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

    const { isOpen: isHover, toggle: toggleHover } = useOpener()

    const $button = ref<HTMLButtonElement | null>(null)
    const balloonTop = ref(0)
    onMounted(() => {
      const rect = $button.value?.getBoundingClientRect()
      if (rect) {
        balloonTop.value =
          rect.y + rect.height - HEADER_HEIGHT - CONTAINER_PADDING
      }
    })
    return {
      isLiked,
      toggleLike,
      balloonWidth,
      isHover,
      toggleHover,
      $button,
      balloonTop
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
  position: relative;
  font: inherit;

  &:focus {
    outline: 0;
  }
}

.liked {
  animation: clicked 0.5s;
  color: red;
}

.likeBalloon {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
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
