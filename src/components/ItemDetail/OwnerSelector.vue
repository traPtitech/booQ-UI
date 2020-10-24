<template>
  <label>
    所有者:
    <select :value="modelValue" :class="$style.select" @input="selectOwner">
      <option
        v-for="detail in details"
        :key="detail.userName"
        :value="detail.userName"
        :disabled="detail.remain === 0"
      >
        {{ detail.userName }} ({{ detail.remain }})
      </option>
    </select>
  </label>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { OwnerDetail } from './use/owners'

export default defineComponent({
  name: 'OwnerSelector',
  props: {
    details: {
      type: Object as PropType<OwnerDetail>,
      required: true
    },
    modelValue: {
      type: String,
      required: true
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:modelValue': (value: string) => true
  },
  setup(_, context) {
    const selectOwner = (e: InputEvent) => {
      context.emit('update:modelValue', (e.target as HTMLInputElement).value)
    }
    return { selectOwner }
  }
})
</script>

<style lang="scss" module>
.select {
  margin-left: 0.5rem;
  font-size: 1.05rem;
  flex: 1;
}
</style>
