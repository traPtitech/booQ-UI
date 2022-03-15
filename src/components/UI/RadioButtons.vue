<template>
  <div :class="$style.container">
    <label v-for="option in options" :key="option">
      <input v-model="val" type="radio" :value="option" />
      {{ option }}
    </label>
  </div>
</template>

<script lang="ts">
import { ref, watch } from 'vue';
</script>

<script lang="ts" setup>


const props = defineProps<{
    options: string[],
    modelValue: string
}>();

const emit = defineEmits<{
    (e: "update:modelValue", val: string): void
}>();

const val = ref(props.options[0] ?? '')
watch(val, newVal => {
  context.emit('update:modelValue', newVal)
})
</script>

<style lang="scss" module>
.container {
}
</style>
