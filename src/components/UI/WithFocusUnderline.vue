<template>
  <div :class="$style.container">
    <slot />
    <span :class="$style.underline" />
    <span :class="$style.underlineFocus" />
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" module>
.container {
  position: relative;
  border-bottom: solid 2px transparent;
  overflow: hidden;
}

.underline,
.underlineFocus {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 2px;
}
.underline {
  background-color: $color-text-secondary;
  left: 0;
  z-index: 1;
}
.underlineFocus {
  background-color: $color-primary;
  left: -100%;
  transition: all 0.2s ease;
  z-index: 2;
  .container:focus-within & {
    left: 0;
  }
}
</style>
