<template>
  <div :class="$style.container">
    <img :class="$style.logo" src="/@/assets/img/logo-main.svg" />
    <div>booQ</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LogoAndTitle'
})
</script>

<style lang="scss" module>
.container {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
}
.logo {
  max-height: 1.5em;
  max-width: 1.5em;
  margin-right: 1em;
}
</style>
