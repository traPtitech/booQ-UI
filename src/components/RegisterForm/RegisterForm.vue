<template>
  <div :class="$style.container">
    <h1 :class="$style.title">物品登録</h1>
    <register-form-description />
    <selector v-model="type" :options="typeOptions" label="所有者" />
    <input-number v-model="formState.count" label="個数" />
    <input-checkbox v-model="formState.rentalable" label="貸し出し可" />
    <button @click="register">登録</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import { provideFormState } from './use/formState'
import RegisterFormDescription from './RegisterFormDescription.vue'
import {
  itemTypeMap,
  itemTypeToName,
  itemTypeNameToType
} from '/@/lib/itemType'
import InputNumber from '/@/components/UI/InputNumber.vue'
import apis, { ItemPosted } from '/@/lib/apis'
import Selector from '/@/components/UI/Selector.vue'
import useAddOwner from '/@/components/ItemDetail/use/addOwner'
import InputCheckbox from '/@/components/UI/InputCheckbox.vue'

export default defineComponent({
  name: 'RegisterForm',
  components: {
    Selector,
    RegisterFormDescription,
    InputNumber,
    InputCheckbox
  },
  setup() {
    const { formState, reset } = provideFormState()
    const { addOwner } = useAddOwner()

    const type = ref(itemTypeToName(formState.type))
    watchEffect(() => {
      formState.type = itemTypeNameToType(type.value)
    })
    const typeOptions = itemTypeMap.map(([, typeName]) => typeName)

    const register = async () => {
      if (!confirm('本当に登録しますか？')) return

      // 型変換しているのはreadOnlyのopenapiの生成がうまくいかないため
      try {
        const res = await apis.postItem((formState as unknown) as ItemPosted)
        await addOwner({
          itemID: res.data.id,
          ownerType: type.value,
          count: formState.count,
          rentalable: formState.rentalable
        })
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
  color: $color-text-primary;
  text-align: left;
}
.title {
  margin-top: 0;
}
</style>
