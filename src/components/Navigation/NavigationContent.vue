<template>
  <nav :class="$style.nav">
    <search :class="$style.search" />
    <list :class="$style.list" />
    <div :class="$style.footer">
      <span :class="$style.version">booQ Project v{{ version }}</span>
      <router-link to="/about">
        <button :class="$style.aboutButton">?</button>
      </router-link>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import version from '/@/lib/version'
import Search from './Search.vue'
import List from './List.vue'

export default defineComponent({
  name: 'NavigationContent',
  components: {
    Search,
    List
  },
  setup() {
    return { version }
  }
})
</script>

<style lang="scss" module>
.nav {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: $color-secondary;
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
.search {
  width: auto;
}
.list {
  flex: 1;
}
.footer {
  display: flex;
  align-items: center;
  text-align: left;
}
.version {
  flex: 1;
  margin-right: 1rem;
}
.aboutButton {
  width: 2em;
  height: 2em;
  cursor: pointer;
}
</style>
