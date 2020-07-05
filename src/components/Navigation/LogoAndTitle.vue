<template>
  <div :class="$style.container">
    <img src="/@/assets/img/logo-main.svg" />
    <div>booQ</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LogoAndTitle',
  setup() {
    return {}
  }
})
</script>

<style lang="scss" module>
.container {
  display: flex;
}
</style>
