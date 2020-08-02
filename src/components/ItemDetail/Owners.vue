<template>
  <div>所有者</div>
  <div >
    <div>aa</div>
    <div>aa</div>
    <div>aa</div>
    <div>aa</div>
    <div>aa</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ItemSummary } from '/@/lib/apis'

export default defineComponent({
  name: 'Owners',
  props: {
    owners: {
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
.container {
  width: 432px;
}

.img {
  width: 100%;
}

.btnContainer {
  display: flex;
}
</style>
