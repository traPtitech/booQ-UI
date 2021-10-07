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
  <div v-else>借りてるアイテムはありません</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue'
import apis, { ItemSummary } from '/@/lib/apis'
import { getDue } from '/@/lib/item'
import useTitle from './use/title'
import BorrowedItem from '/@/components/BorrowedItem.vue'
import useMe from '/@/use/me'

export default defineComponent({
  name: 'DashBoard',
  components: {
    BorrowedItem
  },
  setup() {
    useTitle(computed(() => 'ダッシュボード'))

    const items = ref<ItemSummary[]>([])
    const { name: myName } = useMe()

    const getSortedItemsByDue = (items: readonly ItemSummary[]) => {
      const sortItems = [...items]
      sortItems.sort(
        (a, b) => getDue(a, myName.value) - getDue(b, myName.value)
      )
      return sortItems
    }

    onMounted(async () => {
      const { data } = await apis.getItems(undefined, undefined, myName.value)
      items.value = getSortedItemsByDue(data)
    })

    return { items, myName }
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
