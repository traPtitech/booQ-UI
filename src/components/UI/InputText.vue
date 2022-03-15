<template>
  <with-focus-underline>
    <label :class="$style.label">
      <div :class="$style.labelText">{{ label }}</div>
      <div :class="$style.inputWrapper">
        <input
          v-if="!multiline"
          :class="$style.input"
          type="text"
          :value="modelValue"
          :required="required"
          :readonly="readonly"
          @input="onInput"
        />
        <textarea
          v-else
          :class="$style.input"
          :value="modelValue"
          :required="required"
          :readonly="readonly"
          :rows="rows"
          @input="onInput"
        />
        <slot />
      </div>
    </label>
  </with-focus-underline>
</template>

<script lang="ts" setup>
import WithFocusUnderline from './WithFocusUnderline.vue';

const props = withDefaults(defineProps<{
    label: string,
    modelValue: string,
    multiline?: boolean,
    required?: boolean,
    rows?: string,
    readonly?: boolean
}>(), {
    multiline: false,
    required: false,
    readonly: false
});

const emit = defineEmits<{
    (e: "update:modelValue", val: string): void
}>();

const onInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  context.emit('update:modelValue', target.value)
}
</script>

<style lang="scss" module>
.container {
  position: relative;
  border-bottom: solid 2px transparent;
  cursor: text;
  overflow: hidden;
}
.label {
  color: $color-text-secondary;
  cursor: text;
}
.labelText {
  margin-bottom: 0.5em;
}
.inputWrapper {
  display: flex;
  margin: 0.25em 0;
}
.input {
  flex: 1;
  color: $color-text-secondary;
  background-color: transparent;
  border: none;
  &:focus {
    outline: none;
  }
}
</style>
