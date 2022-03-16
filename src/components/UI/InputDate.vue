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
import { computed } from 'vue'
import { DatePicker } from 'v-calendar'
import AIcon from '/@/components/UI/AIcon.vue'
import InputText from '/@/components/UI/InputText.vue'

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

<style lang="scss" module>
@import 'v-calendar/dist/style.css';

.toggleCalender {
  flex-shrink: 0;
  cursor: pointer;
}
</style>
