<template>
  <router-link :class="$style.container" :to="`/users/${userName}`">
    <img :src="iconUri" :width="size" :height="size" />
  </router-link>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    userName: string
    size?: number
  }>(),
  {
    size: 36
  }
)

const iconUri = computed(
  () => `https://q.trap.jp/api/v3/public/icon/${props.userName}`
)
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
