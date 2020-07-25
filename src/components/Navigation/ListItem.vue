<template>
  <li :class="$style.container" :data-is-selected="isSelected" @click="onClick">
    <icon :class="$style.icon" :name="icon" />
    <div :class="$style.title">{{ name }}</div>
  </li>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
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
    const router = useRouter()
    const route = useRoute()

    const isSelected = computed(() => route.path === props.path)

    const onClick = () => {
      router.push(props.path)
    }

    return { isSelected, onClick }
  }
})
</script>

<style lang="scss" module>
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
