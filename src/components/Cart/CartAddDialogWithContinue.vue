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

<script lang="ts" setup>
import { ItemDetail, ItemSummary, ItemType } from '/@/lib/apis'
import useAddCart from './use/addCart'
import { useRouter } from 'vue-router'
import DialogTemplate from '/@/components/UI/DialogTemplate.vue'
import OwnerSelector from '/@/components/ItemDetail/OwnerSelector.vue'
import InputNumber from '/@/components/UI/InputNumber.vue'
import SubmitButtonWithContinue from './SubmitButtonWithContinue.vue'

const props = defineProps<{
  item: ItemSummary | ItemDetail
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

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
