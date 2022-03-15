<template>
  <teleport to="#dialog">
    <div :class="$style.container" @click="close">
      <div :class="$style.dialog" @click.stop>
        <h2 :class="$style.title">{{ title }}</h2>
        <slot />
      </div>
    </div>
  </teleport>
</template>

<script lang="ts" setup>


const props = defineProps<{
    title: string
}>();

const emit = defineEmits<{
    (e: "close"): void
}>();

const close = () => {
  context.emit('close')
}
</script>

<style lang="scss" module>
.container {
  animation: fadeIn 0.2s;
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  padding: 1rem;
  background-color: rgb(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: left;
}

.dialog {
  color: $color-text-primary;
  z-index: 2;
  background-color: $color-background;
  padding: 2.5rem 3rem;
  border-radius: 8px;
  min-width: min(400px, 100%);
  margin: auto;
}
.title {
  margin: 0;
  margin-bottom: 1.5rem;
  font-size: 2rem;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
