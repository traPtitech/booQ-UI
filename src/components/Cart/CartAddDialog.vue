<template>
  <dialog-template :title="title" @close="close">
    <div :class="$style.container">
      <form @submit.prevent="doSubmit">
        <owner-selector
          v-if="item.type !== ItemType.equipment"
          v-model="ownerName"
          :owner-details="ownerDetails"
          :class="$style.input"
        />
        <input-number
          v-model="count"
          :class="$style.input"
          label="個数"
          :max="maxCount"
          :min="isEdit ? 0 : 1"
        />
        <submit-button
          :is-edit="isEdit"
          :count="count"
          :max-count="maxCount"
          type="submit"
        />
      </form>
    </div>
  </dialog-template>
</template>

<script lang="ts" setup>
import { ItemDetail, ItemSummary, ItemType } from '/@/lib/apis'
import useAddCart from './composables/useAddCart'
import DialogTemplate from '/@/components/UI/DialogTemplate.vue'
import OwnerSelector from '/@/components/ItemDetail/OwnerSelector.vue'
import InputNumber from '/@/components/UI/InputNumber.vue'
import SubmitButton from './SubmitButton.vue'

const props = defineProps<{
  item: ItemSummary | ItemDetail
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const { title, count, isEdit, submit, ownerName, ownerDetails, maxCount } =
  useAddCart(props)

const doSubmit = () => {
  submit()
  emit('close')
}
const close = () => {
  emit('close')
}
</script>

<style lang="scss" module>
.container {
  max-width: 360px;
}
.input {
  margin-bottom: 2rem;
  width: 100%;
}
</style>
