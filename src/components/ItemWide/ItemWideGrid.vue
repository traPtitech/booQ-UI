<template>
  <ul :class="$style.list">
    <li v-for="(item, index) in items" :key="item.id">
      <item-wide :item="item">{{ slots[index] }}</item-wide>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ItemSummary } from '/@/lib/apis'
import ItemWide from './ItemWide.vue'

export default defineComponent({
  name: 'ItemWideGrid',
  components: {
    ItemWide
  },
  props: {
    items: {
      type: Array as PropType<ItemSummary[]>,
      required: true
    },
    slots: {
      type: Array as PropType<string[]>,
      required: true
    }
  }
})
</script>

<style lang="scss" module>
.list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(24rem, 1fr));
  gap: 16px;
}
</style>
