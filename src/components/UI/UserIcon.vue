<template>
  <img :src="iconUri" :width="size" :height="size" :class="$style.icon" />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'UserIcon',
  props: {
    userName: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      default: 36
    }
  },
  setup(props) {
    const iconUri = computed(
      () => `https://q.trap.jp/api/v3/public/icon/${props.userName}`
    )
    return { iconUri }
  }
})
</script>

<style lang="scss" module>
.icon {
  border-radius: 50%;
}
</style>
