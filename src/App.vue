<template>
  <div :class="$style.container">
    <navigation :class="$style.navigation" />
    <routes :class="$style.title" />
    <main :class="$style.content">
      <router-view v-if="fetchedMe" />
      <div v-else>Loading...</div>
    </main>
  </div>
  <div id="dialog" />
  <toast-container />
</template>

<script lang="ts">
import { defineComponent, computed, onBeforeMount } from 'vue'
import Navigation from '/@/components/Navigation/Navigation.vue'
import Routes from '/@/components/Routes.vue'
import ToastContainer from '/@/components/UI/ToastContainer.vue'
import { useStore } from '/@/store'

export default defineComponent({
  name: 'App',
  components: {
    Navigation,
    Routes,
    ToastContainer
  },
  setup() {
    const store = useStore()
    const fetchedMe = computed(() => store.state.me !== null)

    onBeforeMount(() => {
      if (fetchedMe.value) return
      store.dispatch.fetchMe()
    })

    return { fetchedMe }
  }
})
</script>

<style lang="scss" module>
.container {
  position: relative;
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-areas:
    'nav title'
    'nav content';
  grid-template-rows: min-content 1fr;
  grid-template-columns: 260px 1fr;
}
.navigation {
  grid-area: nav;
}
.title {
  grid-area: title;
}
.content {
  grid-area: content;
  overflow: {
    x: hidden;
    y: scroll;
  }
}
</style>
