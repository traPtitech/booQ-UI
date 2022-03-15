<template>
  <router-link :to="route" :class="$style.wrapper">
    <li :class="$style.container" :data-is-selected="isActive">
      <a-icon :class="$style.icon" :name="icon" />
      <div>{{ name }}</div>
    </li>
  </router-link>
</template>

<script lang="ts">
import { toRef } from 'vue'
import { useLink } from 'vue-router'
</script>

<script lang="ts" setup>
import AIcon from '/@/components/UI/AIcon.vue'

const props = defineProps<{
  name: string
  icon: string
  path: string
}>()

const { isActive, route } = useLink({
  to: toRef(props, 'path')
})
</script>

<style lang="scss" module>
.wrapper {
  display: block;
}
.container {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 2px;
  cursor: pointer;
  &[data-is-selected='true'] {
    color: $color-text-white;
    background-color: $color-primary;
  }
}
.icon {
  margin-right: 1em;
}
</style>
