<template>
  <router-link :to="route" :class="$style.wrapper">
    <li :class="$style.container" :data-is-selected="isActive">
      <icon :class="$style.icon" :name="icon" />
      <div :class="$style.title">{{ name }}</div>
    </li>
  </router-link>
</template>

<script lang="ts">
import { defineComponent, toRef } from 'vue'
import { useLink } from 'vue-router'
import Icon from '/@/components/UI/Icon.vue'

export default defineComponent({
  name: 'ListItem',
  components: {
    Icon
  },
  props: {
    name: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { isActive, route, navigate } = useLink({
      to: toRef(props, 'path')
    })

    return { isActive, route, navigate }
  }
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
