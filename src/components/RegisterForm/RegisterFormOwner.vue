<template>
  <div>
    <selector
      v-model="type"
      :class="$style.item"
      :options="typeOptions"
      label="所有者"
    />
    <input-number v-model="formState.count" :class="$style.item" label="個数" />
    <div :class="$style.item">
      <input-checkbox v-model="formState.rentalable" label="貸し出し可" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import { useFormState } from './use/formState'
import {
  itemTypeMap,
  itemTypeToName,
  itemTypeNameToType
} from '/@/lib/itemType'
import Selector from '/@/components/UI/Selector.vue'
import InputNumber from '/@/components/UI/InputNumber.vue'
import InputCheckbox from '/@/components/UI/InputCheckbox.vue'

export default defineComponent({
  name: 'RegisterFormOwner',
  components: {
    Selector,
    InputNumber,
    InputCheckbox
  },
  setup() {
    const { formState } = useFormState()

    const type = ref(itemTypeToName(formState.type))
    watchEffect(() => {
      formState.type = itemTypeNameToType(type.value)
    })
    const typeOptions = itemTypeMap.map(([, typeName]) => typeName)

    return { formState, type, typeOptions }
  }
})
</script>

<style lang="scss" module>
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
