<template>
  <div :class="$style.container">
    <img :class="$style.img" :src="item.imgUrl" />
    <div :class="$style.main">
      <div>{{ item.name }}</div>
      <div>{{ item.owners.map(owner => `@${owner.user.name}`).join() }}</div>
    </div>
    <div>
      <div>
        <icon name="thumbs-up" />{{
          item.likeCounts > 0 ? item.likeCounts : ''
        }}
      </div>
      <slot name="controls" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ItemSummary } from '/@/lib/apis'
import Icon from '/@/components/UI/Icon.vue'

export default defineComponent({
  name: 'Item',
  components: {
    Icon
  },
  props: {
    item: {
      type: Object as PropType<ItemSummary>,
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
  display: flex;
  align-items: center;
  padding: 16px;
}
.img {
  height: 120px;
  width: 80px;
  object-fit: contain;
}
.main {
  flex: 1;
}
</style>
