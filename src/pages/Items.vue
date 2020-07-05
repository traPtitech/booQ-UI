<template>
  <div>Items Page</div>
  <ul>
    <li v-for="item in items" :key="item.id">{{ item.name }}</li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import apis, { ItemSummary } from '/@/lib/apis'

export default defineComponent({
  name: 'Items',
  setup() {
    const items = ref<ItemSummary[]>([])
    onMounted(async () => {
      const { data } = await apis.getItems()
      items.value = data
    })

    return { items }
  }
})
</script>
