<template>
  <header :class="$style.container">
    <logo-and-title
      :class="$style.title"
      :data-can-toggle-navigation-shown="canToggleNavigationShown"
      @click="emit('toggleNavigation')"
    />
    <div v-if="fetchedMe" :class="$style.right">
      <cart-icon />
      <admin-page-link :class="$style.item" />
      <my-icon :class="$style.item" />
    </div>
  </header>
</template>

<script lang="ts">
import { computed } from 'vue'
import { useMeStore } from '/@/store/me'
</script>

<script lang="ts" setup>
import LogoAndTitle from './LogoAndTitle.vue'
import AdminPageLink from './AdminPageLink.vue'
import MyIcon from './MyIcon.vue'
import CartIcon from './CartIcon.vue'

withDefaults(
  defineProps<{
    canToggleNavigationShown?: boolean
  }>(),
  {
    canToggleNavigationShown: false
  }
)

const emit = defineEmits<{
  (e: 'toggleNavigation'): void
}>()

const meStore = useMeStore()
const fetchedMe = computed(() => meStore.me !== null)
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
.item {
  margin-left: 1rem;
}
</style>
