<template>
  <dialog-template title="所有者を追加する" @close="close">
    <form @submit.prevent="submit">
      <owner-selector
        v-if="isAdmin"
        v-model="ownerName"
        :class="$style.item"
        :owner-details="details"
      />
      <input-checkbox
        v-model="rentalable"
        :class="$style.item"
        label="貸し出し可"
      />
      <input-number
        v-model="count"
        :class="$style.item"
        label="個数"
        :min="1"
      />
      <wide-icon-button
        icon="mdi:account-plus"
        label="追加する"
        variant="secondary"
        type="submit"
        :class="$style.button"
      />
    </form>
  </dialog-template>
</template>

<script lang="ts">
import { ref, computed } from 'vue'
import { itemTypeToName, itemTypeNameToType } from '/@/lib/itemType'
import { ItemDetail } from '/@/lib/apis'
import useMe from '/@/use/me'
import useAddOwner from './use/addOwner'
import useNonOwnerTypes from './use/nonOwnerTypes'
</script>

<script lang="ts" setup>
import DialogTemplate from '/@/components/UI/DialogTemplate.vue'
import OwnerSelector from './OwnerSelector.vue'
import WideIconButton from '/@/components/UI/WideIconButton.vue'
import InputCheckbox from '/@/components/UI/InputCheckbox.vue'
import InputNumber from '/@/components/UI/InputNumber.vue'

const props = defineProps<{
  item: ItemDetail
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'updateItem'): void
}>()

const { admin: isAdmin } = useMe()
const { addOwner } = useAddOwner()
const { nonOwnerTypes, firstNonOwnType } = useNonOwnerTypes(props)
const details = computed(() =>
  [...nonOwnerTypes.value].map(typ => ({
    userName: itemTypeToName(typ)
  }))
)

const rentalable = ref(true)
const count = ref(1)
const ownerName = ref(itemTypeToName(firstNonOwnType.value))

const close = () => {
  emit('close')
}
const submit = async () => {
  await addOwner({
    ownerType: itemTypeNameToType(ownerName.value),
    rentalable: rentalable.value,
    count: count.value,
    itemID: props.item.id
  })
  emit('updateItem')
  close()
}
</script>

<style lang="scss" module>
.item {
  margin: 16px 0;
  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    margin-bottom: 0;
  }
}
.button {
  margin: auto;
  margin-top: 32px;
}
</style>
