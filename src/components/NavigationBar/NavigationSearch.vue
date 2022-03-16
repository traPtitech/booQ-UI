<template>
  <search-input v-model="query" @search="search" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SearchInput from '/@/components/UI/SearchInput.vue'

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
</script>
