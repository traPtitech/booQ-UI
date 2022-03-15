<template>
  <ul :class="$style.list">
    <li v-for="item in items" :key="item.id">
      <item-with-cart-mode :item="item" :is-cart-mode="isCartMode" />
    </li>
  </ul>
</template>

<script lang="ts">
import { ItemSummary } from '/@/lib/apis'
</script>

<script lang="ts" setup>
import ItemWithCartMode from './ItemWithCartMode.vue'

const props = withDefaults(
  defineProps<{
    items: ItemSummary[]
    isCartMode?: boolean
  }>(),
  {
    isCartMode: false
  }
)
</script>

<style lang="scss" module>
.list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
  gap: 16px;
}
</style>
