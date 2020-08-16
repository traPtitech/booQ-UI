<template>
  <button :style="styles.container" :class="$style.container">
    <div :class="$style.content">
      <icon :class="$style.icon" :name="icon" />
      <div>{{ label }}</div>
    </div>
  </button>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
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
    width: {
      type: String,
      default: 'auto'
    }
  },
  setup(props) {
    const styles = reactive({
      container: {
        width: props.width
      }
    })
    return { styles }
  }
})
</script>

<style lang="scss" module>
.container {
  cursor: pointer;
}

.content {
  display: flex;
  padding: 0 8px;
  justify-content: center;
  align-items: center;
}

.icon {
  margin-right: 4px;
}
</style>
