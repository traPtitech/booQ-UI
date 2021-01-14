<template>
  <div>
    <input-text v-model="formState.code" label="物品コード / ISBNコード">
      <icon name="mdi:qrcode" :class="$style.toggleQr" @click="toggleDialog" />
    </input-text>
    <dialog-template v-if="isDialogShown" @close="toggleDialog">
      <bar-code-scanner />
      <button @click="toggleDialog">閉じる</button>
    </dialog-template>
  </div>
  <input-text v-model="formState.name" label="物品名" />
  <input-text v-model="formState.description" multiline label="物品詳細" />
  <register-form-image v-model="formState.imgUrl" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useFormState } from './use/formState'
import InputText from '/@/components/UI/InputText.vue'
import BarCodeScanner from './BarCodeScanner.vue'
import DialogTemplate from '/@/components/UI/DialogTemplate.vue'
import useOpener from '/@/components/UI/use/opener'
import Icon from '/@/components/UI/Icon.vue'
import RegisterFormImage from './RegisterFormImage.vue'

export default defineComponent({
  name: 'RegisterFormDescription',
  components: {
    InputText,
    Icon,
    DialogTemplate,
    BarCodeScanner,
    RegisterFormImage
  },
  setup() {
    const { formState } = useFormState()
    const { isOpen: isDialogShown, toggle: toggleDialog } = useOpener()
    return { formState, isDialogShown, toggleDialog }
  }
})
</script>

<style lang="scss" module>
.toggleQr {
  flex-shrink: 0;
  cursor: pointer;
}
</style>
