<template>
  <div :class="$style.container">
    <div :class="$style.titleWrapper">
      <h2>{{ item.name }}</h2>
      <like-button :likes="item.likes" :item-id="item.id" />
    </div>
    <div :class="$style.description">{{ item.description }}</div>
    <owners :item="item" />
    <comments :comments="item.comments" />
    <logs :logs="item.logs" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ItemDetail } from '/@/lib/apis'
import Owners from './Owners.vue'
import Comments from './Comments.vue'
import Logs from './Logs.vue'
import LikeButton from './LikeButton.vue'

export default defineComponent({
  name: 'Information',
  components: {
    Owners,
    Comments,
    Logs,
    LikeButton
  },
  props: {
    item: {
      type: Object as PropType<ItemDetail>,
      required: true
    }
  },
  setup() {
    return {}
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

.description {
  color: $color-text-secondary;
}
</style>
