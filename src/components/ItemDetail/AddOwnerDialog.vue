<template>
  <dialog-template @close="close">
    <h2 :class="$style.title">所有者を追加する</h2>
    <form :class="$style.container" @submit.prevent="addOwner">
      <div v-if="isAdmin">
        <label
          v-for="(owner, i) in OWNER_TYPES"
          :key="i"
          :class="$style.radioLabel"
        >
          <input
            v-model="ownerType"
            type="radio"
            name="owner"
            :value="i"
            :disabled="alreadyOwns[i]"
          />
          {{ owner }}
        </label>
      </div>
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
import { defineComponent, ref, watchEffect, PropType } from 'vue'
import DialogTemplate from '/@/components/UI/DialogTemplate.vue'
import WideIconButton from '/@/components/UI/WideIconButton.vue'
import { OWNER_TYPES } from './use/otherControl'

export default defineComponent({
  name: 'AddOwnerDialog',
  components: {
    DialogTemplate,
    WideIconButton
  },
  props: {
    isAdmin: {
      type: Boolean,
      default: false
    },
    alreadyOwns: {
      type: Array as PropType<boolean[]>,
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
    const rentalable = ref(true)
    const count = ref(1)
    const ownerType = ref(0)

    watchEffect(() => {
      if (props.alreadyOwns[ownerType.value]) {
        ownerType.value = props.alreadyOwns.findIndex(v => !v)
      }
    })
    const close = () => {
      context.emit('close')
    }
    const addOwner = () => {
      context.emit('add', {
        ownerType: ownerType.value,
        rentalable: rentalable.value,
        count: count.value
      })
    }
    return {
      close,
      rentalable,
      count,
      ownerType,
      OWNER_TYPES,
      addOwner
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
