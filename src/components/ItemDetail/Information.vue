<template>
  <div :class="$style.container">
    <div :class="$style.titleWrapper">
      <h2>{{ item.name }}</h2>
      <div :class="$style.likeContainer">
        <like-button
          :class="$style.favBtn"
          :likes="item.likes"
          :item-id="item.id"
          @mouseenter="toggleHover"
          @mouseleave="toggleHover"
        />
        <transition name="fade">
          <like-button-balloon v-if="isHover" :likes="item.likes" />
        </transition>
      </div>
    </div>
    <div>{{ item.description }}</div>
    <owners :item="item" />
    <comments :comments="item.comments" />
    <logs :logs="item.logs" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { ItemDetail } from '/@/lib/apis'
import Owners from './Owners.vue'
import Comments from './Comments.vue'
import Logs from './Logs.vue'
import LikeButton from './LikeButton.vue'
import LikeButtonBalloon from './LikeButtonBalloon.vue'

export default defineComponent({
  name: 'Information',
  components: {
    Owners,
    Comments,
    Logs,
    LikeButton,
    LikeButtonBalloon
  },
  props: {
    item: {
      type: Object as PropType<ItemDetail>,
      required: true
    }
  },
  setup() {
    const isHover = ref(false)
    const toggleHover = () => (isHover.value = !isHover.value)
    return { isHover, toggleHover }
  }
})
</script>

<style lang="scss" module>
.container {
  text-align: left;
}

.titleWrapper {
  display: flex;
}

.likeContainer {
  position: relative;
  display: flex;
  align-items: center;
}
</style>
