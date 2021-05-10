<template>
  <ul :class="$style.list">
    <li v-for="item in items" :key="item.id" :class="$style.item">
      <item :item="item" />
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ItemSummary } from '/@/lib/apis'
import Item from './Item.vue'

export default defineComponent({
  name: 'ItemFlexList',
  components: {
    Item
  },
  props: {
    items: {
      type: Array as PropType<ItemSummary[]>,
      required: true
    }
  }
})
</script>

<style lang="scss" module>
.list {
  display: flex;
  overflow-x: scroll;
  gap: 16px;
}

.item {
  width: 14rem;
  flex-shrink: 0;
}
</style>
