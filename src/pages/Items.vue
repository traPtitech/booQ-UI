<template>
  <div>Items Page</div>
  <ul>
    <li v-for="item in items" :key="item.id">{{ item.name }}</li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue'
import apis, { ItemSummary } from '/@/lib/apis'
import useTitle from './use/title'

export default defineComponent({
  name: 'Items',
  setup() {
    useTitle(computed(() => '物品一覧'))

    const items = ref<ItemSummary[]>([])
    onMounted(async () => {
      const { data } = await apis.getItems()
      items.value = data
    })

    return { items }
  }
})
</script>
