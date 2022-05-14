<template>
  <div>
    <div :class="$style.item">
      <input-text v-model="formState.code" label="物品コード / ISBNコード">
        <a-icon
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
        <bar-code-scanner @change-code="changeCode" />
        <normal-icon-button
          :class="$style.completeButton"
          label="閉じる"
          icon="mdi:close"
          variant="secondary"
          custom-width
          @click="toggleDialog"
        />
      </dialog-template>
    </div>
    <normal-icon-button
      :class="$style.completeButton"
      icon="mdi:auto-fix"
      label="コードを元に情報を自動入力"
      variant="secondary"
      custom-width
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

<script lang="ts" setup>
import { useFormState } from './composables/useFormState'
import useOpener from '/@/composables/useOpener'
import useCompleteFromCode from './composables/useCompleteFromCode'
import InputText from '/@/components/UI/InputText.vue'
import BarCodeScanner from './BarCodeScanner.vue'
import DialogTemplate from '/@/components/UI/DialogTemplate.vue'
import AIcon from '/@/components/UI/AIcon.vue'
import RegisterFormImage from './RegisterFormImage.vue'
import NormalIconButton from '/@/components/UI/NormalIconButton.vue'

const { formState } = useFormState()
const { isOpen: isDialogShown, toggle: toggleDialog } = useOpener()
const { isCompleting, isValidCode, completeFromCode } =
  useCompleteFromCode(formState)

const changeCode = (code: string) => {
  formState.code = code
  toggleDialog()
  completeFromCode()
}
</script>

<style lang="scss" module>
.toggleQr {
  flex-shrink: 0;
  cursor: pointer;
}
.completeButton {
  width: max-content;
  margin: 1.5rem 0;
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
