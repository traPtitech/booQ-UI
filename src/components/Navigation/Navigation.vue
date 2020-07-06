<template>
  <nav :class="$style.nav">
    <logo-and-title />
    <div>search</div>
    <ul :class="$style.list">
      <li><icon name="view-dashboard" />Dashboard</li>
      <li>Equipment List</li>
      <li>Personal Property List</li>
      <li>Register Item</li>
    </ul>
    <div>
      <span>booQ Project {version}</span>
      <div>about</div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LogoAndTitle from './LogoAndTitle.vue'
import Icon from '/@/components/UI/Icon.vue'

export default defineComponent({
  name: 'Navigation',
  components: {
    LogoAndTitle,
    Icon
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
  background-color: gray;
}
.list {
  flex: 1;
}
</style>
