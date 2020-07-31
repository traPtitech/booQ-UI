<template>
  <ul :class="$style.list">
    <li v-for="item in items" :key="item.id">
      <item :item="item" />
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ItemSummary } from '/@/lib/apis'
import Item from './Item.vue'

export default defineComponent({
  name: 'ItemGrid',
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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
  gap: 16px;
}
</style>
