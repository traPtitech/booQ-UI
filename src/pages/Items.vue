<template>
  <div>Items Page</div>
  <ul>
    <li v-for="item in items" :key="item.id">
      <item :item="item" />
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed, PropType } from 'vue'
import apis, { ItemSummary } from '/@/lib/apis'
import useTitle from './use/title'
import Item from '/@/components/Item/Item.vue'

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

    return { items }
  }
})
</script>
