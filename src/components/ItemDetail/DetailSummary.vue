<template>
  <div>
    <h3>{{ title }}</h3>
    <div :class="$style.itemContainer">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title: string
}>()
</script>

<style lang="scss" module>
.itemContainer {
  padding-left: 16px;
}
</style>
