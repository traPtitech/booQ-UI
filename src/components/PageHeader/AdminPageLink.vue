<template>
  <router-link v-if="isAdmin" to="/admin">
    <a-icon name="mdi:cogs" :class="$style.container" />
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AIcon from '/@/components/UI/AIcon.vue'
import useMe from '/@/use/me'

export default defineComponent({
  name: 'AdminPageLink',
  components: {
    AIcon
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
