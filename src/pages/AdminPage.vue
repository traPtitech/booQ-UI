<template>
  <admin-manager v-if="isAdmin" :class="$style.container" />
  <div v-else :class="$style.container">このページは管理者のみ閲覧可能です</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import useTitle from './composables/useTitle'
import useMe from '/@/composables/useMe'
import AdminManager from '/@/components/Admin/AdminManager.vue'

useTitle(computed(() => '管理画面'))

const { admin: isAdmin } = useMe()
</script>

<style lang="scss" module>
.container {
  padding: 3rem;

  @media (max-width: 450px) {
    padding: 2rem;
  }
}
</style>
