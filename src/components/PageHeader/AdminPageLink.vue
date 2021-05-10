<template>
  <router-link v-if="isAdmin" to="/admin">
    <icon name="mdi:cogs" :class="$style.container" />
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '/@/components/UI/Icon.vue'
import useMe from '/@/use/me'

export default defineComponent({
  name: 'AdminPageLink',
  components: {
    Icon
  },
  setup() {
    const { admin: isAdmin } = useMe()
    return { isAdmin }
  }
})
</script>

<style lang="scss" module>
.container {
  cursor: pointer;
}
</style>
