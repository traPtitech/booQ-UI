<template>
  <register-form :class="$style.container" />
</template>

<script lang="ts">
import { computed } from 'vue'
import useTitle from './use/title'
</script>

<script lang="ts" setup>
import RegisterForm from '/@/components/RegisterForm/RegisterForm.vue'

useTitle(computed(() => '物品登録'))
</script>

<style lang="scss" module>
.container {
  padding: 3rem;

  @media (max-width: 450px) {
    padding: 2rem;
  }
}
</style>
