<template>
  <div :class="$style.container">
    <div :class="$style.header">
      <h3 :class="$style.title">{{ title }}</h3>
      <div :class="$style.control">
        <search-input v-model="searchQuery" :class="$style.search" />
        <a-selector
          v-model="sortType"
          :class="$style.search"
          :options="sortTypeOptions"
        />
      </div>
    </div>
    <cart-toggle v-model="isCartMode" :class="$style.cartToggle" />
    <item-grid :items="sortedItems" :is-cart-mode="isCartMode" />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import type { ItemSummary } from '/@/lib/apis'
import apis, { ItemType } from '/@/lib/apis'
import useTitle from './composables/useTitle'
import useDebouncedRef from '/@/composables/useDebouncedRef'
import { useRoute } from 'vue-router'
import { getFirstParam } from '/@/lib/params'
import useSyncParam from './composables/useSyncParam'
import ItemGrid from '/@/components/Item/ItemGrid.vue'
import CartToggle from '/@/components/Item/CartToggle.vue'
import ASelector from '/@/components/UI/ASelector.vue'
import SearchInput from '/@/components/UI/SearchInput.vue'

type ItemsPageType = 'all' | 'equipment' | 'property'
const props = defineProps<{
  type: ItemsPageType
}>()

const title = computed(() => {
  if (props.type === 'equipment') return '備品一覧'
  if (props.type === 'property') return '物品一覧'
  return '物品・備品一覧'
})
useTitle(title)

const route = useRoute()
const items = ref<ItemSummary[]>([])

const searchQuery = useDebouncedRef(
  getFirstParam(route.query?.['search']) ?? ''
)
watch(
  searchQuery,
  async val => {
    if (val === '') {
      const { data } = await apis.getItems()
      items.value = data
      return
    }
    const { data } = await apis.getItems(undefined, val)
    items.value = data
  },
  { immediate: true }
)
useSyncParam('search', searchQuery)

const filteredItems = computed(() => {
  if (props.type === 'equipment') {
    return items.value.filter(item => item.type === ItemType.equipment)
  }
  if (props.type === 'property') {
    return items.value.filter(item => item.type === ItemType.individual)
  }
  return items.value
})

const sortTypeOptions = [
  { key: 'CreatedAtAsc', label: '登録日時:古い順' },
  { key: 'CreatedAtDesc', label: '登録日時:新しい順' },
  { key: 'NameAsc', label: '名前順:昇順' },
  { key: 'NameDesc', label: '名前順:降順' }
] as const
type SortType = typeof sortTypeOptions[number]['key']

const sortType = useDebouncedRef<SortType>(
  getFirstParam(route.query?.['sort'] as SortType) ?? 'CreatedAtAsc'
)

const compareStringAsc = (a: string, b: string) => {
  if (a > b) return 1
  if (a < b) return -1
  return 0
}
const compareNameAsc = (a: string, b: string) => {
  return a.localeCompare(b, 'ja', {
    numeric: true,
    ignorePunctuation: true
  })
}
const sortedItems = computed(() => {
  const sortItems = [...filteredItems.value]
  if (sortType.value === 'CreatedAtAsc') {
    sortItems.sort((a, b) => compareStringAsc(a.createdAt, b.createdAt))
  }
  if (sortType.value === 'CreatedAtDesc') {
    sortItems.sort((a, b) => compareStringAsc(a.createdAt, b.createdAt) * -1)
  }
  if (sortType.value === 'NameAsc') {
    sortItems.sort((a, b) => compareNameAsc(a.name, b.name))
  }
  if (sortType.value === 'NameDesc') {
    sortItems.sort((a, b) => compareNameAsc(a.name, b.name) * -1)
  }
  return sortItems
})
useSyncParam('sort', sortType)

const isCartMode = ref(false)
</script>

<style lang="scss" module>
.container {
  padding: 3rem;

  @media (max-width: 450px) {
    padding: 2rem;
  }
}
.header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
.title {
  word-break: keep-all;
}
.search {
  width: 12rem;
}
.cartToggle {
  margin-bottom: 1.5rem;
}
.control {
  display: flex;
  column-gap: 2rem;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
}
</style>
