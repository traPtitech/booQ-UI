<template>
  <div :class="$style.container">
    <radios v-model="type" :options="typeOptions" />
    <register-form-description />
    <input-number v-model="formState.count" label="個数" />
    <button @click="register">登録</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import { provideFormState, useFormState } from './use/formState'
import RegisterFormDescription from './RegisterFormDescription.vue'
import Radios from '/@/components/UI/Radios.vue'
import { itemTypeToStringMap, stringToItemTypeMap } from './use/itemTypeMap'
import InputNumber from '/@/components/UI/InputNumber.vue'
import apis, { ItemPosted } from '/@/lib/apis'

export default defineComponent({
  name: 'RegisterForm',
  components: {
    Radios,
    RegisterFormDescription,
    InputNumber
  },
  setup() {
    provideFormState()
    const { formState, reset } = useFormState()

    const type = ref(itemTypeToStringMap.get(formState.type))
    watchEffect(() => {
      formState.type = stringToItemTypeMap.get(type.value)
    })
    const typeOptions = [...itemTypeToStringMap.values()]

    const register = async () => {
      // 型変換しているのはreadOnlyのopenapiの生成がうまくいかないため
      try {
        await apis.postItem((formState as unknown) as ItemPosted)
        reset()
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e)
      }
    }

    return { formState, type, typeOptions, register }
  }
})
</script>

<style lang="scss" module>
.container {
}
</style>
