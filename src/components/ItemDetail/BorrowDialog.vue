<template>
  <dialog-template title="物品を借りる" @close="close">
    <form @submit.prevent="borrowItem">
      <owner-selector
        v-model="selectedOwnerName"
        :class="$style.item"
        :owner-details="ownerDetails"
      />
      <input-text
        v-model="purpose"
        :class="$style.item"
        label="目的"
        multiline
        rows="10"
        required
      />
      <input-date
        v-model="dueDate"
        :class="$style.item"
        label="返却日"
        :min-date="new Date()"
        required
      />
      <input-number
        v-if="owner && owner.count !== 1"
        v-model="count"
        :class="$style.item"
        label="個数"
        :max="owner.count"
        :min="1"
      />
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
import useBorrow from './use/borrow'
import InputText from '/@/components/UI/InputText.vue'
import InputNumber from '/@/components/UI/InputNumber.vue'
import InputDate from '/@/components/UI/InputDate.vue'

export default defineComponent({
  name: 'BorrowDialog',
  components: {
    DialogTemplate,
    OwnerSelector,
    InputText,
    InputDate,
    InputNumber,
    WideIconButton
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
      ownerDetails,
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
      ownerDetails,
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
.item {
  margin: 16px 0;
  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    margin-bottom: 0;
  }
}
.button {
  margin: auto;
  margin-top: 32px;
}
</style>
