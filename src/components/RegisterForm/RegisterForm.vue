<template>
  <div :class="$style.container">
    <h1 :class="$style.title">物品登録</h1>
    <register-form-description />
    <selector v-model="type" :options="typeOptions" label="所有者" />
    <input-number v-model="formState.count" label="個数" />
    <div>
      <input-checkbox v-model="formState.rentalable" label="貸し出し可" />
    </div>
    <normal-icon-button
      icon="mdi:plus-circle"
      label="登録"
      variant="primary"
      :disabled="isRegistering"
      @click="register"
    />
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
import NormalIconButton from '/@/components/UI/NormalIconButton.vue'

export default defineComponent({
  name: 'RegisterForm',
  components: {
    Selector,
    RegisterFormDescription,
    InputNumber,
    InputCheckbox,
    NormalIconButton
  },
  setup() {
    const { formState, reset } = provideFormState()
    const { addOwner } = useAddOwner()

    const type = ref(itemTypeToName(formState.type))
    watchEffect(() => {
      formState.type = itemTypeNameToType(type.value)
    })
    const typeOptions = itemTypeMap.map(([, typeName]) => typeName)

    const isRegistering = ref(false)
    const register = async () => {
      if (!confirm('本当に登録しますか？')) return

      isRegistering.value = true

      // 型変換しているのはreadOnlyのopenapiの生成がうまくいかないため
      try {
        const res = await apis.postItem((formState as unknown) as ItemPosted)
        await addOwner({
          itemID: res.data.id,
          ownerType: formState.type,
          count: formState.count,
          rentalable: formState.rentalable
        })
        reset()
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e)
      }
      isRegistering.value = false
    }

    return { formState, type, typeOptions, isRegistering, register }
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
