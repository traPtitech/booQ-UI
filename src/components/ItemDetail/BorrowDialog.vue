<template>
  <dialog-template @close="close">
    <div :class="$style.container">
      <h2 :class="$style.title">物品を借りる</h2>
      <borrow-dialog-select
        :details="details"
        :selected-owner-name="selectedOwnerName"
        @select-owner="selectOwner"
      />
      <div :class="$style.label">目的:</div>
      <textarea v-model="purpose" rows="10" :class="$style.input" />
      <div :class="$style.label">返却日:</div>
      <input v-model="dueDate" type="date" :class="$style.input" />
      <div v-if="owner && owner.count !== 1">
        <div :class="$style.label">個数:</div>
        <input
          v-model="count"
          type="number"
          :class="$style.input"
          :max="owner.count"
          :min="1"
        />
      </div>
      <icon-button
        icon="arrow-down-bold-circle"
        label="借りる"
        :class="$style.button"
        @click="borrowItem"
      />
    </div>
  </dialog-template>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ItemSummary } from '/@/lib/apis'
import DialogTemplate from '/@/components/UI/DialogTemplate.vue'
import BorrowDialogSelect from './BorrowDialogSelect.vue'
import IconButton from '/@/components/UI/IconButton.vue'
import useBorrow from './use/useBorrow'

export default defineComponent({
  name: 'BorrowDialog',
  components: {
    DialogTemplate,
    BorrowDialogSelect,
    IconButton
  },
  props: {
    item: {
      type: Object as PropType<ItemSummary>,
      required: true
    }
  },
  emits: ['close'],
  setup(props, context) {
    const {
      details,
      selectedOwnerName,
      selectOwner,
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
      try {
        await borrow()
        context.emit('close')
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e)
      }
    }
    return {
      close,
      details,
      selectedOwnerName,
      selectOwner,
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
  margin-top: 8px;
}
.input {
  width: calc(100% - 8px);
}
.button {
  height: 36px;
  width: 80%;
  color: $color-primary;
  margin-right: 8px;
  border-radius: 18px;
  border: solid 1px $color-primary;
  margin: auto;
  margin-top: 32px;
}
</style>
