<template>
  <dialog-template title="物品を返す" @close="close">
    <form @submit.prevent="returnItemAndClose">
      <owner-selector
        v-model="selectedOwnerName"
        :class="$style.item"
        :owner-details="details"
      />
      <input-number
        v-if="owner"
        v-model="count"
        :class="$style.item"
        label="個数"
        :max="owner.count"
        :min="1"
        :disabled="owner.count === 1"
      />
      <wide-icon-button
        icon="mdi:arrow-up-bold-circle"
        label="返す"
        type="submit"
        :class="$style.button"
      />
    </form>
  </dialog-template>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ItemSummary } from '/@/lib/apis'
import DialogTemplate from '/@/components/UI/DialogTemplate.vue'
import OwnerSelector from './OwnerSelector.vue'
import WideIconButton from '/@/components/UI/WideIconButton.vue'
import useReturn from './use/return'
import InputNumber from '/@/components/UI/InputNumber.vue'

export default defineComponent({
  name: 'ReturnDialog',
  components: {
    DialogTemplate,
    OwnerSelector,
    InputNumber,
    WideIconButton
  },
  props: {
    item: {
      type: Object as PropType<ItemSummary>,
      required: true
    }
  },
  emits: {
    close: () => true,
    updateItem: () => true
  },
  setup(props, context) {
    const { details, selectedOwnerName, count, owner, returnItem } =
      useReturn(props)
    const close = () => {
      context.emit('close')
    }
    const returnItemAndClose = async () => {
      const log = await returnItem()
      if (log) {
        context.emit('updateItem')
      }
      close()
    }
    return {
      close,
      details,
      selectedOwnerName,
      count,
      owner,
      returnItemAndClose
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
