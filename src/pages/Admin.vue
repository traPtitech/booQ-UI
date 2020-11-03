<template>
  <admin-manager v-if="isAdmin" :class="$style.container" />
  <div v-else :class="$style.container">このページは管理者のみ閲覧可能です</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import AdminManager from '/@/components/Admin/AdminManager.vue'
import useTitle from './use/title'
import useMe from '/@/use/me'

export default defineComponent({
  name: 'Admin',
  components: {
    AdminManager
  },
  setup() {
    useTitle(computed(() => '管理画面'))

    const { admin: isAdmin } = useMe()

    return { isAdmin }
  }
})
</script>

<style lang="scss" module>
.container {
  margin: 3rem;
}
</style>
