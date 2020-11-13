<template>
  <div :class="$style.container">
    <div :class="$style.header">
      <h3>{{ title }}</h3>
      <search-input v-model="searchQuery" :class="$style.search" />
    </div>
    <item-grid :items="filteredItems" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType, watch } from 'vue'
import apis, { ItemSummary, ItemType } from '/@/lib/apis'
import useTitle from './use/title'
import ItemGrid from '/@/components/Item/ItemGrid.vue'
import useDebouncedRef from '/@/use/debouncedRef'
import { useRoute } from 'vue-router'
import { getFirstParam } from '/@/lib/params'
import useSyncParam from './use/syncParam'
import SearchInput from '/@/components/UI/SearchInput.vue'

type ItemsPageType = 'all' | 'equipment' | 'property'

export default defineComponent({
  name: 'Items',
  components: {
    ItemGrid,
    SearchInput
  },
  props: {
    type: {
      type: String as PropType<ItemsPageType>,
      required: true
    }
  },
  setup(props) {
    const title = computed(() => {
      if (props.type === 'equipment') return '備品一覧'
      if (props.type === 'property') return '物品一覧'
      return '物品・備品一覧'
    })
    useTitle(title)

    const route = useRoute()
    const items = ref<ItemSummary[]>([])

    const searchQuery = useDebouncedRef(
      getFirstParam(route.query?.search) ?? ''
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

    return { title, searchQuery, filteredItems }
  }
})
</script>

<style lang="scss" module>
.container {
  padding: 3rem;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.search {
  width: 12em;
}
</style>
