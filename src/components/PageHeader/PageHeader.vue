<template>
  <header :class="$style.container">
    <logo-and-title :class="$style.title" />
    <my-icon v-if="fetchedMe" />
  </header>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import LogoAndTitle from './LogoAndTitle.vue'
import MyIcon from './MyIcon.vue'
import { useStore } from '/@/store'

export default defineComponent({
  name: 'PageHeader',
  components: {
    LogoAndTitle,
    MyIcon
  },
  setup() {
    const store = useStore()
    const fetchedMe = computed(() => store.state.me !== null)
    return { fetchedMe }
  }
})
</script>

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: row;
  padding: 1rem;
  border-bottom: solid 2px $color-secondary;
}
.title {
  flex: 1;
}
</style>
