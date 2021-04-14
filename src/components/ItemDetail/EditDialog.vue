<template>
  <dialog-template @close="close">
    <h2 :class="$style.title">所有者の情報を変更する</h2>
    <form :class="$style.container" @submit.prevent="submit">
      <owner-selector v-if="isAdmin" v-model="ownerName" :details="details" />
      <label :class="$style.label">
        貸し出し可:
        <input v-model="rentalable" type="checkbox" :class="$style.input" />
      </label>
      <label :class="$style.label">
        個数:
        <input
          v-model.number="count"
          type="number"
          :class="$style.input"
          :min="initCount - remain"
        />
      </label>
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
import { defineComponent, PropType, ref, computed, watchEffect } from 'vue'
import { ItemDetail } from '/@/lib/apis'
import DialogTemplate from '/@/components/UI/DialogTemplate.vue'
import OwnerSelector from './OwnerSelector.vue'
import WideIconButton from '/@/components/UI/WideIconButton.vue'
import useOwners, { OwnerWithCount } from './use/owners'
import useMe from '/@/use/me'
import useEditItem from './use/editItem'

const getInitialOwner = (details: OwnerWithCount[], name: string) => {
  const initialOwner = details.find(v => v.userName === name) ?? details[0]
  return initialOwner?.userName ?? ''
}

export default defineComponent({
  name: 'EditDialog',
  components: {
    DialogTemplate,
    OwnerSelector,
    WideIconButton
  },
  props: {
    item: {
      type: Object as PropType<ItemDetail>,
      required: true
    }
  },
  emits: {
    close: () => true,
    updateItem: () => true
  },
  setup(props, context) {
    const { editItem } = useEditItem()
    const { name: meName, admin: isAdmin } = useMe()
    const { details } = useOwners(props)

    const ownerName = ref(getInitialOwner(details.value, meName.value))
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
      () => details.value.find(v => v.userName === ownerName.value)?.count ?? 0
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
    return {
      close,
      ownerName,
      rentalable,
      count,
      isDisabled,
      isAdmin,
      submit,
      initCount,
      remain,
      details
    }
  }
})
</script>

<style lang="scss" module>
.container {
  text-align: left;
}
.title {
  text-align: center;
}
.label {
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: left;
  word-break: keep-all;
}
.input {
  margin-left: 0.5rem;
}
.button {
  margin: auto;
  margin-top: 32px;
}
</style>
