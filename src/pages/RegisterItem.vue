<template>
  <div>RegisterItem Page</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import useTitle from './use/title'

export default defineComponent({
  name: 'RegisterItem',
  setup() {
    useTitle(computed(() => '物品登録'))
    return {}
  }
})
</script>
