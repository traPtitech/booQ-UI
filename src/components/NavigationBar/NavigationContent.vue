<template>
  <nav :class="$style.nav">
    <navigation-search :class="$style.search" />
    <navigation-links :class="$style.list" />
    <div :class="$style.footer">
      <span :class="$style.version">booQ Project v{{ version }}</span>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import version from '/@/lib/version'
import NavigationSearch from './NavigationSearch.vue'
import NavigationLinks from './NavigationLinks.vue'
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
</style>
