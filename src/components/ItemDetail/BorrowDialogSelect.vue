<template>
  <div :class="$style.container">
    <label>所有者:</label>
    <select
      :value="selectedOwnerName"
      :class="$style.select"
      @input="selectOwner"
    >
      <option
        v-for="detail in details"
        :key="detail.userName"
        :value="detail.userName"
        :disabled="detail.remain === 0"
      >
        {{ detail.userName }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import useBorrow from './use/useBorrow'
import { OwnerDetail } from './use/useOwners'

export default defineComponent({
  name: 'BorrowDialogSelect',
  props: {
    details: {
      type: Object as PropType<OwnerDetail>,
      required: true
    },
    selectedOwnerName: {
      type: String,
      required: true
    }
  },
  emits: ['select-owner'],
  setup(_, context) {
    const selectOwner = (e: InputEvent) => {
      context.emit('select-owner', e)
    }
    return { selectOwner }
  }
})
</script>

<style lang="scss" module>
.container {
  display: flex;
  align-items: center;
}
.select {
  margin-left: 8px;
  font-size: 1.05rem;
  flex: 1;
}
</style>
