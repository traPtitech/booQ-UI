<template>
  <div :class="$style.container">
    <img :class="$style.logo" :src="logoMain" />
    <div>booQ</div>
  </div>
</template>

<script lang="ts">
import logoMain from '/@/assets/img/logo-main.svg'
</script>

<script lang="ts" setup>



</script>

<style lang="scss" module>
.container {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
}
.logo {
  max-height: 1.5em;
  max-width: 1.5em;
  margin-right: 1em;
}
</style>
