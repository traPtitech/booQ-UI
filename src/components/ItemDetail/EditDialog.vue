<template>
  <dialog-template title="所有者の情報を変更する" @close="close">
    <form @submit.prevent="submit">
      <owner-selector
        v-if="isAdmin"
        v-model="ownerName"
        :class="$style.item"
        :owner-details="ownerDetails"
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
        :min="initCount - remain"
      />
      <wide-icon-button
        icon="mdi:account-edit"
        label="変更する"
        variant="secondary"
        type="submit"
        :disabled="isDisabled"
        :class="$style.button"
      />
    </form>
  </dialog-template>
</template>

<script lang="ts">
import { ref, computed, watchEffect } from 'vue';
import { ItemDetail } from '/@/lib/apis'
import useOwners, { OwnerWithCount } from './use/owners'
import useMe from '/@/use/me'
import useEditItem from './use/editItem'

const getInitialOwner = (ownerDetails: OwnerWithCount[], name: string) => {
  const initialOwner =
    ownerDetails.find(v => v.userName === name) ?? ownerDetails[0]
  return initialOwner?.userName ?? ''
}
</script>

<script lang="ts" setup>
import DialogTemplate from '/@/components/UI/DialogTemplate.vue';
import OwnerSelector from './OwnerSelector.vue';
import WideIconButton from '/@/components/UI/WideIconButton.vue';
import InputCheckbox from '/@/components/UI/InputCheckbox.vue';
import InputNumber from '/@/components/UI/InputNumber.vue';

const props = defineProps<{
    item: ItemDetail
}>();

const emit = defineEmits<{
    (e: "close"): void,
    (e: "updateItem"): void
}>();

const { editItem } = useEditItem()
const { name: meName, admin: isAdmin } = useMe()
const { ownerDetails } = useOwners(props)

const ownerName = ref(getInitialOwner(ownerDetails.value, meName.value))
const ownInfo = computed(() =>
  props.item.owners.find(v => v.user.name === ownerName.value)
)
const initCount = computed(() => ownInfo.value?.count ?? 0)

const rentalable = ref(!!ownInfo.value?.rentalable)
const count = ref(initCount.value)
watchEffect(() => {
  rentalable.value = !!ownInfo.value?.rentalable
  count.value = initCount.value
})

const isDisabled = computed(
  () =>
    ownInfo.value?.rentalable === rentalable.value &&
    ownInfo.value?.count === count.value
)
const remain = computed(
  () =>
    ownerDetails.value.find(v => v.userName === ownerName.value)?.count ?? 0
)

const close = () => {
  context.emit('close')
}
const submit = async () => {
  if (!ownInfo.value) return
  await editItem({
    userID: ownInfo.value?.ownerId ?? 0,
    rentalable: rentalable.value,
    count: count.value,
    itemID: props.item.id,
    ownInfo: ownInfo.value
  })
  context.emit('updateItem')
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
