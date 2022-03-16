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

<script lang="ts" setup>
import { ItemDetail, ItemSummary } from '/@/lib/apis'
import useReturn from './composables/useReturn'
import DialogTemplate from '/@/components/UI/DialogTemplate.vue'
import OwnerSelector from './OwnerSelector.vue'
import WideIconButton from '/@/components/UI/WideIconButton.vue'
import InputNumber from '/@/components/UI/InputNumber.vue'

const props = defineProps<{
  item: ItemSummary | ItemDetail
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'updateItem'): void
}>()

const { details, selectedOwnerName, count, owner, returnItem } =
  useReturn(props)
const close = () => {
  emit('close')
}
const returnItemAndClose = async () => {
  const log = await returnItem()
  if (log) {
    emit('updateItem')
  }
  close()
}
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
