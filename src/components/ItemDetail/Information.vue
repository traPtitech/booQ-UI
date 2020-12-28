<template>
  <div :class="$style.container">
    <div :class="$style.titleWrapper">
      <h2>{{ item.name }}</h2>
      <like-button
        :class="$style.favBtn"
        :likes="item.likes"
        :item-id="item.id"
        @mouseenter="toggleHover"
        @mouseleave="toggleHover"
      />
    </div>
    <div :class="$style.likeBalloon">
      <transition name="fade">
        <like-button-balloon v-if="true" :right="(32 + 8 * 2) / 2">
          <div :class="item.likes.length ? $style.userContainer : ''">
            <div v-if="item.likes.length === 0">誰もいいねしていません</div>
            <user-icon
              v-for="u in item.likes"
              :key="u.id"
              :user-name="u.name"
            />
            <user-icon
              v-for="u in item.likes"
              :key="u.id"
              :user-name="u.name"
            />
            <user-icon
              v-for="u in item.likes"
              :key="u.id"
              :user-name="u.name"
            />
            <user-icon
              v-for="u in item.likes"
              :key="u.id"
              :user-name="u.name"
            />
            <user-icon
              v-for="u in item.likes"
              :key="u.id"
              :user-name="u.name"
            />
            <user-icon
              v-for="u in item.likes"
              :key="u.id"
              :user-name="u.name"
            />
            <user-icon
              v-for="u in item.likes"
              :key="u.id"
              :user-name="u.name"
            />
            <user-icon
              v-for="u in item.likes"
              :key="u.id"
              :user-name="u.name"
            />
            <user-icon
              v-for="u in item.likes"
              :key="u.id"
              :user-name="u.name"
            />
            <user-icon
              v-for="u in item.likes"
              :key="u.id"
              :user-name="u.name"
            />
            <user-icon
              v-for="u in item.likes"
              :key="u.id"
              :user-name="u.name"
            />
            <user-icon
              v-for="u in item.likes"
              :key="u.id"
              :user-name="u.name"
            />
            <user-icon
              v-for="u in item.likes"
              :key="u.id"
              :user-name="u.name"
            />
            <user-icon
              v-for="u in item.likes"
              :key="u.id"
              :user-name="u.name"
            />
            <user-icon
              v-for="u in item.likes"
              :key="u.id"
              :user-name="u.name"
            />
            <user-icon
              v-for="u in item.likes"
              :key="u.id"
              :user-name="u.name"
            />
            <user-icon
              v-for="u in item.likes"
              :key="u.id"
              :user-name="u.name"
            />
            <user-icon
              v-for="u in item.likes"
              :key="u.id"
              :user-name="u.name"
            />
            <user-icon
              v-for="u in item.likes"
              :key="u.id"
              :user-name="u.name"
            />
            <user-icon
              v-for="u in item.likes"
              :key="u.id"
              :user-name="u.name"
            />
            <user-icon
              v-for="u in item.likes"
              :key="u.id"
              :user-name="u.name"
            />
            <user-icon
              v-for="u in item.likes"
              :key="u.id"
              :user-name="u.name"
            />
          </div>
        </like-button-balloon>
      </transition>
    </div>
    <div :class="$style.description">{{ item.description }}</div>
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
import UserIcon from '/@/components/UI/UserIcon.vue'

export default defineComponent({
  name: 'Information',
  components: {
    Owners,
    Comments,
    Logs,
    LikeButton,
    LikeButtonBalloon,
    UserIcon
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
  position: relative;
}

.titleWrapper {
  display: flex;
}

.description {
  color: $color-text-secondary;
}

.likeBalloon {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 8;
  width: 100%;
}

.userContainer {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(36px, 1fr));
  gap: 8px;
}
</style>
