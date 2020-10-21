<template>
  <button :type="type" :class="$style.container">
    <icon :class="$style.icon" :name="icon" />
    <div>{{ label }}</div>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '/@/components/UI/Icon.vue'

export default defineComponent({
  name: 'IconButton',
  components: { Icon },
  props: {
    icon: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'button'
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="scss" module>
.container {
  cursor: pointer;
  display: flex;
  padding: 0 8px;
  justify-content: center;
  align-items: center;
}

.icon {
  margin-right: 4px;
}
</style>
