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
import { provideFormState } from './use/formState'
import RegisterFormDescription from './RegisterFormDescription.vue'
import Radios from '/@/components/UI/Radios.vue'
import {
  itemTypeMap,
  itemTypeToName,
  itemTypeNameToType
} from '/@/lib/itemType'
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
    const { formState, reset } = provideFormState()

    const type = ref(itemTypeToName(formState.type))
    watchEffect(() => {
      formState.type = itemTypeNameToType(type.value)
    })
    const typeOptions = itemTypeMap.map(([, typeName]) => typeName)

    const register = async () => {
      if (!confirm('本当に登録しますか？')) return

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
