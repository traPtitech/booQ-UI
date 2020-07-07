<template>
  <ul :class="$style.list">
    <list-item
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
import { defineComponent } from 'vue'
import ListItem from './ListItem.vue'

interface Item {
  name: string
  icon: string
  path: string
}

export default defineComponent({
  name: 'List',
  components: {
    ListItem
  },
  setup() {
    const items: Item[] = [
      { name: 'Dashboard', icon: 'view-dashboard', path: '/' },
      { name: 'Equipment List', icon: 'home-city', path: '/items/equipment' },
      {
        name: 'Personal Property List',
        icon: 'book-open-page-variant',
        path: '/items/property'
      },
      { name: 'Register Item', icon: 'plus-box', path: '/items/new' }
    ]
    return { items }
  }
})
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
