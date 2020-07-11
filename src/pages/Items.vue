<template>
  <div>Items Page</div>
  <input v-model="searchQuery" placeholder="検索" />
  <ul>
    <li v-for="item in filteredItems" :key="item.id">
      <item :item="item" />
    </li>
  </ul>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  computed,
  PropType,
  watchEffect
} from 'vue'
import apis, { ItemSummary, ItemType } from '/@/lib/apis'
import useTitle from './use/title'
import Item from '/@/components/Item/Item.vue'
import useDebouncedRef from '/@/use/debouncedRef'

type ItemsPageType = 'all' | 'equipment' | 'property'

export default defineComponent({
  name: 'Items',
  components: {
    Item
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

    const items = ref<ItemSummary[]>([])
    onMounted(async () => {
      const { data } = await apis.getItems()
      items.value = data
    })

    const searchQuery = useDebouncedRef('')
    watchEffect(async () => {
      if (searchQuery.value === '') {
        const { data } = await apis.getItems()
        items.value = data
        return
      }
      const { data } = await apis.getItems(undefined, searchQuery.value)
      items.value = data
    })

    const filteredItems = computed(() => {
      if (props.type === 'equipment') {
        return items.value.filter(item => item.type === ItemType.equipment)
      }
      if (props.type === 'property') {
        return items.value.filter(item => item.type === ItemType.individual)
      }
      return items.value
    })

    return { searchQuery, filteredItems }
  }
})
</script>
