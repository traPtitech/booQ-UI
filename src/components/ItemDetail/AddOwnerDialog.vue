<template>
  <dialog-template @close="close">
    <h2 :class="$style.title">所有者を追加する</h2>
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
          :min="1"
        />
      </label>
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
import { defineComponent, ref, PropType, onMounted } from 'vue'
import DialogTemplate from '/@/components/UI/DialogTemplate.vue'
import OwnerSelector from './OwnerSelector.vue'
import WideIconButton from '/@/components/UI/WideIconButton.vue'
import { itemTypeToName, itemTypeNameToType } from '/@/lib/itemType'
import { getFirstNotOwn } from './use/otherControl'
import { ItemSummary } from '/@/lib/apis'
import { OwnerMayWithCount } from './use/owners'
import useMe from '/@/use/me'
import useAddOwner from './use/addOwner'
import useNonOwnerTypes from './use/nonOwnerTypes'

export default defineComponent({
  name: 'AddOwnerDialog',
  components: {
    DialogTemplate,
    OwnerSelector,
    WideIconButton
  },
  props: {
    item: {
      type: Object as PropType<ItemSummary>,
      required: true
    }
  },
  emits: {
    close: () => true
  },
  setup(props, context) {
    const { admin: isAdmin } = useMe()
    const { addOwner } = useAddOwner()
    const { nonOwnerTypes } = useNonOwnerTypes(props)

    const rentalable = ref(true)
    const count = ref(1)

    const details = ref<OwnerMayWithCount[]>([])
    onMounted(() => {
      details.value = [...nonOwnerTypes.value].map(typ => ({
        userName: itemTypeToName(typ)
      }))
    })
    const ownerName = ref(itemTypeToName(getFirstNotOwn(nonOwnerTypes.value)))

    const close = () => {
      context.emit('close')
    }
    const submit = async () => {
      await addOwner({
        ownerType: itemTypeNameToType(ownerName.value),
        rentalable: rentalable.value,
        count: count.value,
        itemID: props.item.id
      })
      close()
    }

    return {
      close,
      isAdmin,
      rentalable,
      count,
      submit,
      details,
      ownerName
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
.radioLabel {
  margin-right: 1rem;
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
