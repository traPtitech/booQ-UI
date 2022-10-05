<template>
  <date-picker
    v-model="value"
    :min-date="minDate"
    color="green"
    :is-required="required"
  >
    <template #default="{ inputValue, togglePopover }">
      <div>
        <input-text
          :label="label"
          :model-value="inputValue"
          readonly
          @click="togglePopover"
        >
          <a-icon
            name="mdi:calendar"
            :class="$style.toggleCalender"
            @click.prevent.stop="togglePopover"
          />
        </input-text>
      </div>
    </template>
  </date-picker>
</template>

<script lang="ts" setup>
import type { DefineComponent } from 'vue'
import { computed } from 'vue'
import { DatePicker as _DatePicker } from 'v-calendar'
import AIcon from '/@/components/UI/AIcon.vue'
import InputText from '/@/components/UI/InputText.vue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DatePicker = _DatePicker as DefineComponent<any, any, any>

const props = withDefaults(
  defineProps<{
    label: string
    modelValue: Date
    minDate?: Date
    required?: boolean
  }>(),
  {
    required: false
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', _v: Date): void
}>()

const value = computed<Date>({
  get() {
    return props.modelValue
  },
  set(v) {
    emit('update:modelValue', v)
  }
})
</script>

<style lang="scss">
@import 'v-calendar/dist/style.css';
</style>

<style lang="scss" module>
.toggleCalender {
  flex-shrink: 0;
  cursor: pointer;
}
</style>
