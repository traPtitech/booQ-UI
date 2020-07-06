<template>
  <div>About Page</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import useTitle from './use/title'

export default defineComponent({
  name: 'About',
  setup() {
    useTitle(computed(() => 'booQについて'))
    return {}
  }
})
</script>
