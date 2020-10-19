<template>
  <div :class="$style.container">
    <input
      v-model="query"
      type="text"
      placeholder="検索"
      @keypress.enter="search"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Search',
  setup() {
    const router = useRouter()

    const query = ref('')
    const search = () => {
      router.push({
        name: 'All Items',
        query: {
          search: query.value
        }
      })
    }
    return { query, search }
  }
})
</script>

<style lang="scss" module>
.container {
}
</style>
