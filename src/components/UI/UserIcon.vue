<template>
  <img
    :src="iconUri"
    :width="size"
    :height="size"
    :class="$style.icon"
    @click="onClick"
  />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRouter } from 'vue-router'

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
    const router = useRouter()
    const iconUri = computed(
      () => `https://q.trap.jp/api/v3/public/icon/${props.userName}`
    )

    const onClick = () => {
      router.push(`/users/${props.userName}`)
    }

    return { iconUri, onClick }
  }
})
</script>

<style lang="scss" module>
.icon {
  border-radius: 50%;
  cursor: pointer;

  box-shadow: 0 0 0px 2px transparent;
  &:hover {
    box-shadow: 0 0 0px 2px $color-primary;
  }
  transition: 0.2s all ease-in-out;
}
</style>
