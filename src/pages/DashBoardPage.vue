<template>
  <div v-if="items.length > 0">
    <h2>あなたが借りている備品</h2>
    <ul :class="$style.list">
      <borrowed-item
        v-for="item in items"
        :key="item.id"
        :item="item"
        :borrower="myName"
      />
    </ul>
  </div>
  <div v-else>
    <h3>借りてるアイテムはありません</h3>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue'
import type { ItemSummary } from '/@/lib/apis'
import apis from '/@/lib/apis'
import { getDue } from '/@/lib/item'
import useTitle from './composables/useTitle'
import useMe from '/@/composables/useMe'
import BorrowedItem from '/@/components/BorrowedItem.vue'

useTitle(computed(() => 'ダッシュボード'))

const items = ref<ItemSummary[]>([])
const { name: myName } = useMe()

const getSortedItemsByDue = (items: readonly ItemSummary[]) => {
  const sortItems = [...items]
  sortItems.sort((a, b) => getDue(a, myName.value) - getDue(b, myName.value))
  return sortItems
}

onMounted(async () => {
  const { data } = await apis.getItems(undefined, undefined, myName.value)
  items.value = getSortedItemsByDue(data)
})
</script>

<style lang="scss" module>
.list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(25rem, 100%), 1fr));
  gap: 1rem;
  margin: 1rem;
}
</style>
