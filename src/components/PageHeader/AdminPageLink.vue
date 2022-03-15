<template>
  <router-link v-if="isAdmin" to="/admin">
    <a-icon name="mdi:cogs" :class="$style.container" />
  </router-link>
</template>

<script lang="ts">
import useMe from '/@/use/me'
</script>

<script lang="ts" setup>
import AIcon from '/@/components/UI/AIcon.vue'

const { admin: isAdmin } = useMe()
</script>

<style lang="scss" module>
.container {
  cursor: pointer;
}
</style>
