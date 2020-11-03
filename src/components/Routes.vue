<template>
  <div>
    <router-link :to="pages[0].path">{{ pages[0].name }}</router-link>
    <template v-for="page in pages.slice(1)" :key="page.path">
      <span>|</span>
      <router-link :to="page.path">
        {{ page.name }}
      </router-link>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Routes',
  setup() {
    const pages = [
      { path: '/', name: 'Dashboard' },
      { path: '/users/sienka', name: 'User Page' },
      { path: '/items', name: 'All Items' },
      { path: '/items/new', name: 'Register Item' },
      { path: '/items/equipment', name: 'Equipments' },
      { path: '/items/property', name: 'Personal Property Items' },
      { path: '/items/1', name: 'Item' },
      { path: '/admin', name: 'Admin Page' },
      { path: '/about', name: 'About' }
    ]

    return { pages }
  }
})
</script>

<style lang="scss" module>
.re {
  font-weight: bold;
}
</style>
