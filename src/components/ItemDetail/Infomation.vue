<template>
  <div>{{ item.name }}</div>
  <div>{{ item.description }}</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ItemSummary } from '/@/lib/apis'

export default defineComponent({
  name: 'Infomation',
  props: {
    item: {
      type: Object as PropType<ItemSummary>,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="scss" module>
.img {
  width: 100%;
}

.btnContainer {
  display: flex;
}
</style>
