<template>
  <nav :class="$style.nav">
    <search />
    <list :class="$style.list" />
    <routes :class="$style.title" />
    <div :class="$style.footer">
      <span :class="$style.version">booQ Project v{{ version }}</span>
      <button :class="$style.aboutButton" @click="onClickAbout">?</button>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import version from '/@/lib/version'
import Search from './Search.vue'
import List from './List.vue'
import Routes from '/@/components/Routes.vue'

export default defineComponent({
  name: 'Navigation',
  components: {
    Search,
    List,
    Routes
  },
  setup() {
    const router = useRouter()

    const onClickAbout = () => {
      router.push('/about')
    }

    return { onClickAbout, version }
  }
})
</script>

<style lang="scss" module>
.nav {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: $color-secondary;
  > * {
    margin: 1rem 0;
    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
}
.list {
  flex: 1;
}
.footer {
  display: flex;
  align-items: center;
  text-align: left;
}
.version {
  flex: 1;
  margin-right: 1rem;
}
.aboutButton {
  width: 2em;
  height: 2em;
  cursor: pointer;
}
</style>
