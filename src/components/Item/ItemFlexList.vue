<template>
  <ul :class="$style.list">
    <li v-for="item in items" :key="item.id" :class="$style.item">
      <item-panel :item="item" />
    </li>
  </ul>
</template>

<script lang="ts">
import { ItemSummary } from '/@/lib/apis'
</script>

<script lang="ts" setup>
import ItemPanel from './ItemPanel.vue';

const props = defineProps<{
    items: ItemSummary[]
}>();
</script>

<style lang="scss" module>
.list {
  display: flex;
  overflow-x: scroll;
  gap: 16px;
  padding: 4px;
}

.item {
  width: 14rem;
  flex-shrink: 0;
}
</style>
