<template>
  <header :class="$style.container">
    <logo-and-title
      :class="$style.title"
      :data-can-toggle-navigation-shown="canToggleNavigationShown"
      @click="emit('toggleNavigation')"
    />
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
  props: {
    canToggleNavigationShown: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    toggleNavigation: () => true
  },
  setup(_, { emit }) {
    const store = useStore()
    const fetchedMe = computed(() => store.state.me !== null)
    return { fetchedMe, emit }
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
  &[data-can-toggle-navigation-shown='true'] {
    cursor: pointer;
  }
}
.right {
  display: flex;
  align-items: center;
}
.myIcon {
  margin-left: 1rem;
}
</style>
