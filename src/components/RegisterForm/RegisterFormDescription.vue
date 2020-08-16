<template>
  <input-text v-model="formState.code" label="物品コード / ISBNコード" />
  <input-text v-model="formState.name" label="物品名" />
  <input-text v-model="formState.description" multiline label="物品詳細" />
  <input-text v-model="formState.imgUrl" label="物品画像" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useFormState } from './use/formState'
import InputText from '/@/components/UI/InputText.vue'

export default defineComponent({
  name: 'RegisterFormDescription',
  components: {
    InputText
  },
  setup() {
    const { formState } = useFormState()
    return { formState }
  }
})
</script>

<style lang="scss" module>
.container {
}
</style>
