<template>
  <div :class="$style.container">
    <page-header
      :class="$style.header"
      :can-toggle-navigation-shown="canToggleNavigationShown"
      @toggle-navigation="toggleNavigationShown"
    />
    <div :class="$style.innerContainer">
      <main :class="$style.content">
        <router-view v-if="fetchedMe" />
        <div v-else>Loading...</div>
      </main>
      <navigation-bar
        :can-toggle-navigation-shown="canToggleNavigationShown"
        :is-navigation-shown="isNavigationShown"
        @toggle-navigation-shown="toggleNavigationShown"
      />
    </div>
  </div>
  <div id="dialog" />
  <toast-container />
</template>

<script lang="ts">
import { defineComponent, computed, onBeforeMount, watch, readonly } from 'vue'
import { useRouter } from 'vue-router'
import PageHeader from '/@/components/PageHeader/PageHeader.vue'
import NavigationBar from '/@/components/NavigationBar/NavigationBar.vue'
import ToastContainer from '/@/components/UI/ToastContainer.vue'
import { useStore } from '/@/store'
import useOpener from '/@/use/opener'
import useIsMobile from './use/isMobile'

const useNavigationShown = () => {
  const router = useRouter()
  const { isOpen, toggle: toggleNavigationShown } = useOpener()
  const { isMobile } = useIsMobile()

  const isNavigationShown = computed(() => !isMobile.value || isOpen.value)
  watch(isMobile, isMobile => {
    isOpen.value = !isMobile
  })
  router.afterEach(() => {
    isOpen.value = false
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
    NavigationBar,
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
.content {
  flex: 1;
  overflow: {
    x: hidden;
    y: scroll;
  }
}
</style>
