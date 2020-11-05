<template>
  <dialog-template @close="close">
    <h2 :class="$style.title">所有者の情報を変更する</h2>
    <form :class="$style.container" @submit.prevent="editItem">
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
          :min="(ownInfo?.count ?? 0) - remain"
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
import { Owner } from '/@/lib/apis'
import DialogTemplate from '/@/components/UI/DialogTemplate.vue'
import OwnerSelector from './OwnerSelector.vue'
import WideIconButton from '/@/components/UI/WideIconButton.vue'
import { OwnerWithCount } from './use/owners'

export default defineComponent({
  name: 'EditDialog',
  components: {
    DialogTemplate,
    OwnerSelector,
    WideIconButton
  },
  props: {
    ownInfos: {
      type: Array as PropType<Owner[]>,
      required: true
    },
    details: {
      type: Array as PropType<OwnerWithCount[]>,
      required: true
    },
    meName: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    close: () => true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    edit: (payload: { userID: number; rentalable: boolean; count: number }) =>
      true
  },
  setup(props, context) {
    const ownerName = ref(
      props.details[
        Math.max(
          props.details.findIndex(v => v.userName === props.meName),
          0
        )
      ].userName
    )
    const ownInfo = computed(() =>
      props.ownInfos.find(v => v.user.name === ownerName.value)
    )
    const remain = computed(
      () => props.details.find(v => v.userName === ownerName.value)?.count ?? 0
    )

    const rentalable = ref(!!ownInfo.value?.rentalable)
    const count = ref(ownInfo.value?.count ?? 0)
    watchEffect(() => {
      rentalable.value = !!ownInfo.value?.rentalable
      count.value = ownInfo.value?.count ?? 0
    })

    const isDisabled = computed(
      () =>
        ownInfo.value?.rentalable === rentalable.value &&
        ownInfo.value?.count === count.value
    )
    const close = () => {
      context.emit('close')
    }
    const editItem = async () => {
      context.emit('edit', {
        userID: ownInfo.value?.ownerId ?? 0,
        rentalable: rentalable.value,
        count: count.value
      })
    }
    return {
      close,
      ownerName,
      ownInfo,
      remain,
      rentalable,
      count,
      isDisabled,
      editItem
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
