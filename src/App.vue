<template>
  <div :class="$style.container">
    <page-header
      :class="$style.header"
      :can-toggle-navigation-shown="canToggleNavigationShown"
      @toggle-navigation="toggleNavigationShown"
    />
    <div :class="$style.innerContainer">
      <main :class="$style.content">
        <router-view v-if="meStore.me" />
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

<script lang="ts" setup>
import { onBeforeMount } from 'vue'
import { useMeStore } from '/@/store/me'
import useNavigationShown from './use/navigationShown'
import PageHeader from '/@/components/PageHeader/PageHeader.vue'
import NavigationBar from '/@/components/NavigationBar/NavigationBar.vue'
import ToastContainer from '/@/components/UI/ToastContainer.vue'

const { isNavigationShown, canToggleNavigationShown, toggleNavigationShown } =
  useNavigationShown()
const meStore = useMeStore()

onBeforeMount(() => {
  if (meStore.me) return
  meStore.fetchMe()
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
