<template>
  <div>
    <input-text v-model="formState.code" label="物品コード / ISBNコード" />
    <button @click="toggleDialog">バーコード読み取り</button>
    <dialog-template v-if="isDialogShown" @close="toggleDialog">
      <bar-code-scanner />
      <button @click="toggleDialog">閉じる</button>
    </dialog-template>
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
import DialogTemplate from '/@/components/UI/DialogTemplate.vue'
import useOpener from '/@/components/UI/use/opener'

export default defineComponent({
  name: 'RegisterFormDescription',
  components: {
    InputText,
    DialogTemplate,
    BarCodeScanner
  },
  setup() {
    const { formState } = useFormState()
    const { isOpen: isDialogShown, toggle: toggleDialog } = useOpener()
    return { formState, isDialogShown, toggleDialog }
  }
})
</script>
