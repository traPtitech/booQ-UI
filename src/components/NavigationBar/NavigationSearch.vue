<template>
  <search-input v-model="query" @search="search" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import SearchInput from '/@/components/UI/SearchInput.vue'

export default defineComponent({
  name: 'NavigationSearch',
  components: {
    SearchInput
  },
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
