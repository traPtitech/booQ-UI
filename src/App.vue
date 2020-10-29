<template>
  <div :class="$style.container">
    <page-header :class="$style.header" />
    <navigation :class="$style.navigation" />
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
import PageHeader from '/@/components/PageHeader/PageHeader.vue'
import Navigation from '/@/components/Navigation/Navigation.vue'
import ToastContainer from '/@/components/UI/ToastContainer.vue'
import { useStore } from '/@/store'

export default defineComponent({
  name: 'App',
  components: {
    PageHeader,
    Navigation,
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
    'header header'
    'nav content';
  grid-template-rows: min-content 1fr;
  grid-template-columns: 260px 1fr;
}
.navigation {
  grid-area: nav;
}
.header {
  grid-area: header;
}
.content {
  grid-area: content;
  overflow: {
    x: hidden;
    y: scroll;
  }
}
</style>
