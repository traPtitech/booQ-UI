<template>
  <div>
    <input-text v-model="formState.code" label="物品コード / ISBNコード" />
    <button @click="openModal">バーコード読み取り</button>
    <teleport to="#modal-container">
      <div v-if="modalShown" :class="$style.barCodeScannerModal">
        <bar-code-scanner />
        <button @click="closeModal">閉じる</button>
      </div>
    </teleport>
  </div>
  <input-text v-model="formState.name" label="物品名" />
  <input-text v-model="formState.description" multiline label="物品詳細" />
  <input-text v-model="formState.imgUrl" label="物品画像" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useFormState } from './use/formState'
import InputText from '/@/components/UI/InputText.vue'
import useModal from './use/modal'
import BarCodeScanner from './BarCodeScanner.vue'

export default defineComponent({
  name: 'RegisterFormDescription',
  components: {
    InputText,
    BarCodeScanner
  },
  setup() {
    const { formState } = useFormState()
    const { modalShown, openModal, closeModal } = useModal()
    return { formState, modalShown, openModal, closeModal }
  }
})
</script>

<style lang="scss" module>
.barCodeScannerModal {
  margin: 20%;
  background: $color-background;
  border: solid 2px $color-primary;
  border-radius: 2px;
  pointer-events: initial;
}
</style>
