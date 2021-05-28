<template>
  <dialog-template :title="title" @close="close">
    <div :class="$style.container">
      <form @submit.prevent="submit">
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
          :disabled="maxCount === 0"
          type="submit"
        />
      </form>
    </div>
  </dialog-template>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import DialogTemplate from '/@/components/UI/DialogTemplate.vue'
import OwnerSelector from '/@/components/ItemDetail/OwnerSelector.vue'
import InputNumber from '/@/components/UI/InputNumber.vue'
import { ItemSummary, ItemType } from '/@/lib/apis'
import useAddCart from './use/addCart'
import SubmitButton from './SubmitButton.vue'

export default defineComponent({
  name: 'CartAddDialog',
  components: {
    DialogTemplate,
    InputNumber,
    OwnerSelector,
    SubmitButton
  },
  props: {
    item: {
      type: Object as PropType<ItemSummary>,
      required: true
    }
  },
  emits: {
    close: () => true
  },
  setup(props, { emit }) {
    const {
      title,
      count,
      isEdit,
      submit,
      close,
      ownerName,
      ownerDetails,
      maxCount
    } = useAddCart(props, emit)
    return {
      title,
      count,
      close,
      isEdit,
      ownerName,
      ownerDetails,
      maxCount,
      submit,
      ItemType
    }
  }
})
</script>

<style lang="scss" module>
.container {
  max-width: 360px;
}
.input {
  margin-bottom: 2rem;
  width: 100%;
}
.button {
  width: 100%;
  margin: auto;
}
</style>
