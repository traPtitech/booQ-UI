<template>
  <div :class="$style.balloonContainer">
    <div
      :class="[$style.balloon, likes.length !== 0 ? $style.userContainer : '']"
    >
      <div v-if="likes.length === 0">誰もいいねしていません</div>
      <user-icon v-for="u in likes" :key="u.id" :user-name="u.name" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import UserIcon from '/@/components/UI/UserIcon.vue'
import { User } from '/@/lib/apis'

export default defineComponent({
  name: 'LikeButtonBalloon',
  components: { UserIcon },
  props: {
    likes: {
      type: Array as PropType<User[]>,
      default: []
    }
  },
  setup() {
    return
  }
})
</script>

<style lang="scss" module>
.balloonContainer {
  position: absolute;
  right: -20px;
  top: 70%;
}
.balloon {
  position: relative;
  margin-top: 1.5rem;
  padding: 1.2rem;
  min-width: 8rem;
  background: $color-background;
  border: solid 1px $color-text-secondary-pale;
  border-radius: 8px;
  filter: drop-shadow(2px 2px 4px $color-text-secondary-pale);
}
.userContainer {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(36px, 1fr));
  gap: 0.5rem;
}

.balloon:before {
  content: '';
  position: absolute;
  top: -24px;
  right: 26px;
  margin-left: -15px;
  border: 12px solid transparent;
  border-bottom: 12px solid $color-background;
  z-index: 2;
}

.balloon:after {
  content: '';
  position: absolute;
  top: -28px;
  right: 24px;
  margin-left: -17px;
  border: 14px solid transparent;
  border-bottom: 14px solid $color-text-secondary-pale;
  z-index: 1;
}
</style>
