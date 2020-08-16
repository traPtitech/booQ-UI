<template>
  <div>
    <h3>{{ title }}</h3>
    <div :class="$style.itemContainer">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DetailSummary',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup() {
    return
  }
})
</script>

<style lang="scss" module>
.itemContainer {
  padding-left: 16px;
}
</style>
