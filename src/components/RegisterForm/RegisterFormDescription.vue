<template>
  <div>
    <div :class="$style.item">
      <input-text v-model="formState.code" label="物品コード / ISBNコード">
        <icon
          name="mdi:qrcode"
          :class="$style.toggleQr"
          @click="toggleDialog"
        />
      </input-text>
      <dialog-template
        v-if="isDialogShown"
        title="バーコードを読み取る"
        @close="toggleDialog"
      >
        <bar-code-scanner @changeCode="changeCode" />
        <button @click="toggleDialog">閉じる</button>
      </dialog-template>
    </div>
    <icon-button
      :class="$style.completeButton"
      icon="mdi:auto-fix"
      label="コードを元に情報を自動入力"
      variant="secondary"
      :disabled="isCompleting || !isValidCode"
      @click="completeFromCode"
    />
    <input-text v-model="formState.name" :class="$style.item" label="物品名" />
    <input-text
      v-model="formState.description"
      :class="$style.item"
      multiline
      label="物品詳細"
    />
    <register-form-image v-model="formState.imgUrl" :class="$style.item" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useFormState } from './use/formState'
import InputText from '/@/components/UI/InputText.vue'
import BarCodeScanner from './BarCodeScanner.vue'
import DialogTemplate from '/@/components/UI/DialogTemplate.vue'
import useOpener from '/@/use/opener'
import Icon from '/@/components/UI/Icon.vue'
import RegisterFormImage from './RegisterFormImage.vue'
import IconButton from '/@/components/UI/IconButton.vue'
import useCompleteFromCode from './use/completeFromCode'

export default defineComponent({
  name: 'RegisterFormDescription',
  components: {
    InputText,
    Icon,
    DialogTemplate,
    BarCodeScanner,
    RegisterFormImage,
    IconButton
  },
  setup() {
    const { formState } = useFormState()
    const { isOpen: isDialogShown, toggle: toggleDialog } = useOpener()
    const { isCompleting, isValidCode, completeFromCode } =
      useCompleteFromCode(formState)

    const changeCode = (code: string) => {
      formState.code = code
      toggleDialog()
      completeFromCode()
    }

    return {
      formState,
      isDialogShown,
      toggleDialog,
      isCompleting,
      isValidCode,
      completeFromCode,
      changeCode
    }
  }
})
</script>

<style lang="scss" module>
.toggleQr {
  flex-shrink: 0;
  cursor: pointer;
}
.completeButton {
  $height: 36px;

  height: $height;
  width: max-content;
  margin: 1.5rem 0;
  border-radius: math.div($height, 2);
}
.item {
  margin: 1.5rem 0;
  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
