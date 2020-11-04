<template>
  <header :class="$style.container">
    <logo-and-title :class="$style.title" />
    <div v-if="fetchedMe" :class="$style.right">
      <admin-page-link />
      <my-icon :class="$style.myIcon" />
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import LogoAndTitle from './LogoAndTitle.vue'
import AdminPageLink from './AdminPageLink.vue'
import MyIcon from './MyIcon.vue'
import { useStore } from '/@/store'

export default defineComponent({
  name: 'PageHeader',
  components: {
    LogoAndTitle,
    AdminPageLink,
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
  padding: 1rem;
  border-bottom: solid 2px $color-secondary;
}
.title {
  flex: 1;
}
.right {
  display: flex;
  align-items: center;
}
.myIcon {
  margin-left: 1rem;
}
</style>
