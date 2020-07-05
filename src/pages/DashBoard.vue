<template>
  <div>DashBoard Page</div>
  <img src="/@/assets/img/logo-main.svg" />
  <HelloWorld msg="Hello Vue 3.0 + Vite" />
  <ul v-if="items.length > 0">
    <li v-for="item in items" :key="item.id">{{ item.name }}</li>
  </ul>
  <div v-else>借りてるアイテムはありません</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import HelloWorld from '/@/components/HelloWorld.vue'
import apis, { ItemSummary } from '/@/lib/apis'

export default defineComponent({
  name: 'DashBoard',
  components: {
    HelloWorld
  },
  setup() {
    const items = ref<ItemSummary[]>([])
    onMounted(async () => {
      const { data: me } = await apis.getMe()
      const { data } = await apis.getItems(undefined, undefined, me.name)
      items.value = data
    })

    return { items }
  }
})
</script>
