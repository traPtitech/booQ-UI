<template>
  <div v-if="items.length > 0">
    <h2>あなたが借りている備品</h2>
    <ul :class="$style.list">
      <borrowed-item v-for="item in items" :key="item.id" :item="item" />
    </ul>
  </div>
  <div v-else>借りてるアイテムはありません</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue'
import apis, { ItemSummary } from '/@/lib/apis'
import { getDue } from '/@/lib/item'
import useTitle from './use/title'
import BorrowedItem from '/@/components/BorrowedItem.vue'
import useMe from '/@/use/me'

const getSortedItemsByDue = (items: readonly ItemSummary[]) => {
  const is = [...items]
  is.sort((a, b) => getDue(a) - getDue(b))
  return is
}

export default defineComponent({
  name: 'DashBoard',
  components: {
    BorrowedItem
  },
  setup() {
    useTitle(computed(() => 'ダッシュボード'))

    const { name: myName } = useMe()
    const items = ref<ItemSummary[]>([])
    onMounted(async () => {
      const { data } = await apis.getItems(undefined, undefined, myName.value)
      items.value = getSortedItemsByDue(data)
    })

    return { items }
  }
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
