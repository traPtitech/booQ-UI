<template>
  <div :class="$style.container">
    <div :class="$style.header">
      <h3 :class="$style.title">{{ title }}</h3>
      <div>
        <search-input v-model="searchQuery" :class="$style.search" />
        <a-selector
          v-model="sortType"
          :class="$style.search"
          :options="typeOptions"
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

//const { formState } = useFormState()
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

//const type = ref(formState.type)

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

const sortTypeMap: ReadonlyArray<[string, string]> = [
  ['0', '登録日時:古い順'],
  ['1', '登録日時:新しい順'],
  ['2', '名前順:昇順'],
  ['3', '名前順:降順']
]
const typeOptions = sortTypeMap.map(([typeKey, typeName]) => ({
  key: typeKey,
  label: typeName
}))
const sortType = useDebouncedRef(
  getFirstParam(route.query?.['sortType']) ?? '0'
)

const sortedItems = computed(() => {
  const sortItems = [...filteredItems.value]
  if (sortType.value === '0') {
    sortItems.sort((a, b) => {
      if (a.createdAt > b.createdAt) return 1
      if (a.createdAt < b.createdAt) return -1
      return 0
    })
  }
  if (sortType.value === '1') {
    sortItems.sort((a, b) => {
      if (a.createdAt < b.createdAt) return 1
      if (a.createdAt > b.createdAt) return -1
      return 0
    })
  }
  if (sortType.value === '2') {
    sortItems.sort((a, b) =>
      a.name.localeCompare(b.name, 'ja', {
        numeric: true,
        ignorePunctuation: true
      })
    )
  }
  if (sortType.value === '3') {
    sortItems.sort((a, b) =>
      b.name.localeCompare(a.name, 'ja', {
        numeric: true,
        ignorePunctuation: true
      })
    )
  }
  return sortItems
})
useSyncParam('sortType', sortType)

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
.control {
  display: inline-block;
}
</style>
