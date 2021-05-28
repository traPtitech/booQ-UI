<template>
  <dialog-template :title="title" @close="close">
    <div :class="$style.container">
      <form>
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
          v-if="maxCount === 0"
          icon="mdi:cancel"
          label="在庫がありません"
          variant="caution"
          :class="$style.button"
          :disabled="true"
        />
        <wide-icon-button
          v-else
          icon="mdi:arrow-right-bold-circle"
          label="次にすすむ"
          :class="$style.button"
          @click="goNext"
        />
        <div :class="$style.or">または</div>
        <wide-icon-button
          icon="mdi:cart"
          label="まだ借りる"
          type="submit"
          :class="$style.button"
          @click="goOn"
        />
        <div :class="$style.description">
          「まだ借りる」でまとめて目的や返却日を入力できます
        </div>
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
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'CartAddDialogWithContinue',
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

    const router = useRouter()
    const goNext = () => {
      submit()
      router.push('/cart')
    }
    const goOn = () => {
      submit()
    }
    return {
      title,
      count,
      close,
      isEdit,
      ownerName,
      ownerDetails,
      maxCount,
      ItemType,
      goOn,
      goNext
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
.or {
  margin: 0.75rem 0;
  color: $color-text-secondary;
  font-size: 0.75rem;
}
.continue {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.description {
  opacity: 0.5;
  margin-top: 0.5rem;
  font-size: 0.75rem;
}
</style>
