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
        <wide-icon-button
          :icon="button.icon"
          :label="button.label"
          :variant="button.variant"
          type="submit"
          :class="$style.button"
          :disabled="maxCount === 0"
        />
        <slot name="continue" />
      </form>
    </div>
  </dialog-template>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import DialogTemplate from '/@/components/UI/DialogTemplate.vue'
import WideIconButton from '/@/components/UI/WideIconButton.vue'
import OwnerSelector from '/@/components/ItemDetail/OwnerSelector.vue'
import InputNumber from '/@/components/UI/InputNumber.vue'
import { ItemSummary, ItemType } from '/@/lib/apis'
import useAddCart from './use/addCart'

export default defineComponent({
  name: 'CartAddDialog',
  components: {
    DialogTemplate,
    WideIconButton,
    InputNumber,
    OwnerSelector
  },
  props: {
    item: {
      type: Object as PropType<ItemSummary>,
      required: true
    },
    btn: {
      type: Object as PropType<{ icon: string; label: string } | null>,
      default: null
    }
  },
  emits: {
    close: () => true,
    submit: () => true
  },
  setup(props, { emit }) {
    const {
      title,
      count,
      button,
      isEdit,
      submit,
      close,
      ownerName,
      ownerDetails,
      cartCount,
      maxCount
    } = useAddCart(props, emit)
    return {
      title,
      count,
      button,
      close,
      cartCount,
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
