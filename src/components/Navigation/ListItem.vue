<template>
  <li :class="$style.container" @click="onClick">
    <icon :class="$style.icon" :name="icon" />
    <div :class="$style.title">{{ name }}</div>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
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
    const onClick = () => {
      router.push(props.path)
    }

    return { onClick }
  }
})
</script>

<style lang="scss" module>
.container {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;
}
.icon {
  margin-right: 1em;
}
</style>
