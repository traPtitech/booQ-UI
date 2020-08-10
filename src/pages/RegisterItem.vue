<template>
  <register-form />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import useTitle from './use/title'
import RegisterForm from '/@/components/RegisterForm/RegisterForm.vue'

export default defineComponent({
  name: 'RegisterItem',
  components: {
    RegisterForm
  },
  setup() {
    useTitle(computed(() => '物品登録'))
    return {}
  }
})
</script>
