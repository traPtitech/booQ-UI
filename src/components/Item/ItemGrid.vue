<template>
  <ul :class="$style.list">
    <li v-for="item in items" :key="item.id">
      <item-with-cart-mode :item="item" :is-cart-mode="isCartMode" />
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ItemSummary } from '/@/lib/apis'
import ItemWithCartMode from './ItemWithCartMode.vue'

export default defineComponent({
  name: 'ItemGrid',
  components: {
    ItemWithCartMode
  },
  props: {
    items: {
      type: Array as PropType<ItemSummary[]>,
      required: true
    },
    isCartMode: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style lang="scss" module>
.list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
  gap: 16px;
}
</style>
