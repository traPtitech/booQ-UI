<template>
  <dialog-template @close="close">
    <h2 :class="$style.title">所有者を追加する</h2>
    <form :class="$style.container" @submit.prevent="addOwner">
      <owner-selector
        v-if="isAdmin"
        v-model="ownerName"
        :details="details"
        :is-show-count="false"
      />
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
import {
  itemTypeToStringMap,
  stringToItemTypeMap
} from '/@/components/RegisterForm/use/itemTypeMap'
import { getFirstNotOwn } from './use/otherControl'
import { ItemType } from '/@/lib/apis'
import { OwnerWithCount } from './use/owners'
import useMe from '/@/use/me'

export default defineComponent({
  name: 'AddOwnerDialog',
  components: {
    DialogTemplate,
    OwnerSelector,
    WideIconButton
  },
  props: {
    nonOwnerTypes: {
      type: Set as PropType<Set<ItemType>>,
      default: false
    }
  },
  emits: {
    close: () => true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    add: (payload: { ownerType: number; rentalable: boolean; count: number }) =>
      true
  },
  setup(props, context) {
    const { admin: isAdmin } = useMe()
    const rentalable = ref(true)
    const count = ref(1)

    const details = ref<OwnerWithCount[]>([])
    onMounted(() => {
      details.value = [...props.nonOwnerTypes].map(typ => ({
        userName: itemTypeToStringMap.get(typ),
        count: 1
      }))
    })
    const ownerName = ref(
      itemTypeToStringMap.get(getFirstNotOwn(props.nonOwnerTypes))
    )

    const close = () => {
      context.emit('close')
    }
    const addOwner = () => {
      context.emit('add', {
        ownerType: stringToItemTypeMap.get(ownerName.value),
        rentalable: rentalable.value,
        count: count.value
      })
    }
    return {
      close,
      isAdmin,
      rentalable,
      count,
      addOwner,
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
