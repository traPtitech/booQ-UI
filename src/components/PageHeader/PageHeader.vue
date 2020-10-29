<template>
  <header :class="$style.container">
    <logo-and-title />
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LogoAndTitle from './LogoAndTitle.vue'

export default defineComponent({
  name: 'PageHeader',
  components: {
    LogoAndTitle
  }
})
</script>

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: row;
  padding: 1rem;
  background: $color-secondary;
}
</style>
