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
          <icon
            name="mdi:calendar"
            :class="$style.toggleCalender"
            @click.prevent.stop="togglePopover"
          />
        </input-text>
      </div>
    </template>
  </date-picker>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { DatePicker } from 'v-calendar'
import Icon from '/@/components/UI/Icon.vue'
import InputText from '/@/components/UI/InputText.vue'

export default defineComponent({
  name: 'InputDate',
  components: {
    DatePicker,
    Icon,
    InputText
  },
  props: {
    label: {
      type: String,
      required: true
    },
    modelValue: {
      type: Date,
      required: true
    },
    minDate: {
      type: Date,
      default: undefined
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:modelValue': (_v: Date) => true
  },
  setup(props, { emit }) {
    const value = computed<Date>({
      get() {
        return props.modelValue
      },
      set(v) {
        emit('update:modelValue', v)
      }
    })
    return { value }
  }
})
</script>

<style lang="scss" module>
.toggleCalender {
  flex-shrink: 0;
  cursor: pointer;
}
</style>
