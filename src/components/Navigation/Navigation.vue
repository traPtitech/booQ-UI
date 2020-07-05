<template>
  <nav>
    <logo-and-title />
    <div>search</div>
    <ul>
      <li>Dashboard</li>
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

export default defineComponent({
  name: 'Navigation',
  components: {
    LogoAndTitle
  },
  setup() {
    return {}
  }
})
</script>
