<template>
  <div :class="$style.container">
    <div :class="$style.header">
      <h3 :class="$style.title">{{ title }}</h3>
      <search-input v-model="searchQuery" :class="$style.search" />
    </div>
    <cart-toggle v-model="isCartMode" :class="$style.cartToggle" />
    <item-grid :items="filteredItems" :is-cart-mode="isCartMode" />
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
  width: 12em;
}
.cartToggle {
  margin-bottom: 1.5rem;
}
</style>
