<template>
  <ul :class="$style.list">
    <navigation-links-item
      v-for="item in items"
      :key="item.name"
      :class="$style.item"
      :name="item.name"
      :icon="item.icon"
      :path="item.path"
    />
  </ul>
</template>

<script lang="ts">
interface Item {
  name: string
  icon: string
  path: string
}
</script>

<script lang="ts" setup>
import NavigationLinksItem from './NavigationLinksItem.vue';

const items: Item[] = [
  { name: 'Dashboard', icon: 'mdi:view-dashboard', path: '/' },
  {
    name: 'Equipment List',
    icon: 'mdi:home-city',
    path: '/items/equipment'
  },
  {
    name: 'Personal Property List',
    icon: 'mdi:book-open-page-variant',
    path: '/items/property'
  },
  { name: 'Register Item', icon: 'mdi:plus-box', path: '/items/new' },
  { name: 'About', icon: 'mdi:help-box', path: '/about' }
]
</script>

<style lang="scss" module>
.list {
  margin: 0;
  padding: 0;
}
.item {
  margin: 0.5rem 0;
  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
