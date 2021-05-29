<template>
  <dialog-template :title="title" @close="close">
    <div :class="$style.container">
      <form @submit.prevent>
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
        <submit-button-with-continue
          :max-count="maxCount"
          @click-go-cart="goCart"
          @click-go-back="goBack"
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
import { useRouter } from 'vue-router'
import SubmitButtonWithContinue from './SubmitButtonWithContinue.vue'

export default defineComponent({
  name: 'CartAddDialogWithContinue',
  components: {
    DialogTemplate,
    InputNumber,
    OwnerSelector,
    SubmitButtonWithContinue
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
    const { title, count, isEdit, submit, ownerName, ownerDetails, maxCount } =
      useAddCart(props)

    const router = useRouter()
    const goCart = () => {
      submit()
      emit('close')
      router.push('/cart')
    }
    const goBack = () => {
      submit()
      emit('close')
    }

    const close = () => {
      emit('close')
    }

    return {
      title,
      count,
      isEdit,
      ownerName,
      ownerDetails,
      maxCount,
      ItemType,
      goBack,
      goCart,
      close
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
</style>
