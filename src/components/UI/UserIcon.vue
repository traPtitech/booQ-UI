<template>
  <router-link :class="$style.container" :to="`/users/${userName}`">
    <img :src="iconUri" :width="size" :height="size" :class="$style.icon" />
  </router-link>
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
.container {
  display: flex;
  justify-content: center;
  align-content: center;
  border-radius: 50%;
  cursor: pointer;
  overflow: hidden;

  box-shadow: 0 0 0px 2px transparent;
  &:hover {
    box-shadow: 0 0 0px 2px $color-primary;
  }
  transition: 0.2s all ease-in-out;
}
</style>
