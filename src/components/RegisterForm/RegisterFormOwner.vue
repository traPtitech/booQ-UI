<template>
  <div>
    <a-selector
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

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { useFormState } from './composables/useFormState'
import {
  itemTypeMap,
  itemTypeToName,
  itemTypeNameToType
} from '/@/lib/itemType'
import ASelector from '/@/components/UI/ASelector.vue'
import InputNumber from '/@/components/UI/InputNumber.vue'
import InputCheckbox from '/@/components/UI/InputCheckbox.vue'

const { formState } = useFormState()

const type = ref(itemTypeToName(formState.type))
watchEffect(() => {
  formState.type = itemTypeNameToType(type.value)
})
const typeOptions = itemTypeMap.map(([, typeName]) => ({ key: typeName }))
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
