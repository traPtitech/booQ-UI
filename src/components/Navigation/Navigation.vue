<template>
  <nav :class="$style.nav">
    <logo-and-title />
    <div>search</div>
    <list :class="$style.list" />
    <div>
      <span>booQ Project {version}</span>
      <div>about</div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LogoAndTitle from './LogoAndTitle.vue'
import List from './List.vue'

export default defineComponent({
  name: 'Navigation',
  components: {
    LogoAndTitle,
    List
  },
  setup() {
    return {}
  }
})
</script>

<style lang="scss" module>
.nav {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: $background-secondary;
  > * {
    margin: 1rem 0;
    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
}
.list {
  flex: 1;
}
</style>
