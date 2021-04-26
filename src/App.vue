<template>
  <div
    :class="$style.container"
    :data-can-toggle-navigation-shown="canToggleNavigationShown"
  >
    <page-header
      :class="$style.header"
      :can-toggle-navigation-shown="canToggleNavigationShown"
      @toggleNavigation="toggleNavigationShown"
    />
    <div :class="$style.innerContainer">
      <main :class="$style.content">
        <router-view v-if="fetchedMe" />
        <div v-else>Loading...</div>
      </main>
      <navigation
        v-if="!canToggleNavigationShown"
        :class="$style.desktopNavigation"
      />
      <div
        v-else
        v-show="isNavigationShown"
        :class="$style.mobileNavigationWrapper"
      >
        <navigation :class="$style.mobileNavigation" />
        <div
          :class="$style.mobileNavigationDim"
          @click="toggleNavigationShown"
        ></div>
      </div>
    </div>
  </div>
  <div id="dialog" />
  <toast-container />
</template>

<script lang="ts">
import { defineComponent, computed, onBeforeMount, watch, readonly } from 'vue'
import PageHeader from '/@/components/PageHeader/PageHeader.vue'
import Navigation from '/@/components/Navigation/Navigation.vue'
import ToastContainer from '/@/components/UI/ToastContainer.vue'
import { useStore } from '/@/store'
import useOpener from '/@/use/opener'
import useIsMobile from './use/isMobile'

const useNavigationShown = () => {
  const { isOpen, toggle: toggleNavigationShown } = useOpener()
  const { isMobile } = useIsMobile()

  const isNavigationShown = computed(() => !isMobile.value || isOpen.value)
  watch(isMobile, isMobile => {
    isOpen.value = !isMobile
  })

  return {
    isNavigationShown,
    canToggleNavigationShown: readonly(isMobile),
    toggleNavigationShown
  }
}

export default defineComponent({
  name: 'App',
  components: {
    PageHeader,
    Navigation,
    ToastContainer
  },
  setup() {
    const {
      isNavigationShown,
      canToggleNavigationShown,
      toggleNavigationShown
    } = useNavigationShown()
    const store = useStore()
    const fetchedMe = computed(() => store.state.me !== null)

    onBeforeMount(() => {
      if (fetchedMe.value) return
      store.dispatch.fetchMe()
    })

    return {
      isNavigationShown,
      canToggleNavigationShown,
      toggleNavigationShown,
      fetchedMe
    }
  }
})
</script>

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
.header {
  flex-shrink: 0;
}
.innerContainer {
  position: relative;
  display: flex;
  flex-direction: row-reverse;
  flex: 1;
  min-height: 0;
}
.desktopNavigation {
  flex-shrink: 0;
  width: 260px;
}
.mobileNavigationWrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  z-index: 1;
}
.mobileNavigation {
  width: 260px;
  flex-shrink: 0;
}
.mobileNavigationDim {
  background: $color-background-dim;
  flex: 1;
}
.content {
  flex: 1;
  overflow: {
    x: hidden;
    y: scroll;
  }
}
</style>
