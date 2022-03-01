<template>
  <transition name="navigation">
    <navigation-content
      v-if="!canToggleNavigationShown"
      :class="$style.desktopNavigation"
    />
  </transition>
  <template v-if="canToggleNavigationShown">
    <transition name="fade-fast">
      <div
        v-show="isNavigationShown"
        :class="$style.mobileNavigationDim"
        @click="emit('toggleNavigationShown')"
      ></div>
    </transition>
    <transition name="navigation">
      <navigation-content
        v-show="isNavigationShown"
        :class="$style.mobileNavigation"
      />
    </transition>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavigationContent from './NavigationContent.vue'

export default defineComponent({
  name: 'NavigationBar',
  components: {
    NavigationContent
  },
  props: {
    canToggleNavigationShown: {
      type: Boolean,
      required: true
    },
    isNavigationShown: {
      type: Boolean,
      required: true
    }
  },
  emits: {
    toggleNavigationShown: () => true
  },
  setup(props, { emit }) {
    return { emit }
  }
})
</script>

<style lang="scss" module>
.desktopNavigation {
  flex-shrink: 0;
  width: 260px;
}
.mobileNavigation {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 260px;
  z-index: 1;
}
.mobileNavigationDim {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background: $color-background-dim;
}
</style>
