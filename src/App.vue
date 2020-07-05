<template>
  <div :class="$style.container">
    <navigation :class="$style.navigation" />
    <routes :class="$style.title" />
    <main :class="$style.content">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Navigation from '/@/components/Navigation/Navigation.vue'
import Routes from '/@/components/Routes.vue'

export default defineComponent({
  name: 'App',
  components: {
    Navigation,
    Routes
  }
})
</script>

<style lang="scss" module>
.container {
  display: grid;
  grid-template-areas:
    'nav title'
    'nav content';
}
.navigation {
  grid-area: nav;
}
.title {
  grid-area: title;
}
.content {
  grid-area: content;
}
</style>
