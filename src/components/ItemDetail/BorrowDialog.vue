<template>
  <dialog-template @close="close">
    <h2 :class="$style.title">物品を借りる</h2>
    <form :class="$style.container" @submit.prevent="borrowItem">
      <owner-selector v-model="selectedOwnerName" :details="details" />
      <label :class="$style.label">
        目的:
        <textarea v-model="purpose" rows="10" :class="$style.input" required />
      </label>
      <label :class="$style.label">
        返却日:
        <date-picker v-model="dueDate" :min-date="new Date()" />
      </label>
      <label v-if="owner && owner.count !== 1" :class="$style.label">
        個数:
        <input
          v-model.number="count"
          type="number"
          :class="$style.input"
          :max="owner.count"
          :min="1"
        />
      </label>
      <wide-icon-button
        icon="mdi:arrow-down-bold-circle"
        label="借りる"
        type="submit"
        :class="$style.button"
      />
    </form>
  </dialog-template>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ItemDetail } from '/@/lib/apis'
import DialogTemplate from '/@/components/UI/DialogTemplate.vue'
import OwnerSelector from './OwnerSelector.vue'
import WideIconButton from '/@/components/UI/WideIconButton.vue'
import { DatePicker } from 'v-calendar'
import useBorrow from './use/borrow'

export default defineComponent({
  name: 'BorrowDialog',
  components: {
    DialogTemplate,
    OwnerSelector,
    WideIconButton,
    DatePicker
  },
  props: {
    item: {
      type: Object as PropType<ItemDetail>,
      required: true
    }
  },
  emits: {
    close: () => true,
    updateItem: () => true
  },
  setup(props, context) {
    const {
      details,
      selectedOwnerName,
      purpose,
      dueDate,
      count,
      owner,
      borrow
    } = useBorrow(props)
    const close = () => {
      context.emit('close')
    }
    const borrowItem = async () => {
      const log = await borrow()
      if (log) {
        context.emit('updateItem')
      }
      context.emit('close')
    }
    return {
      close,
      details,
      selectedOwnerName,
      purpose,
      dueDate,
      count,
      owner,
      borrowItem
    }
  }
})
</script>

<style lang="scss" module>
.container {
  text-align: left;
}
.title {
  text-align: center;
}
.label {
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  word-break: keep-all;
}
.input {
  width: 100%;
  margin-top: 0.25rem;
}
.button {
  margin: auto;
  margin-top: 32px;
}
</style>
