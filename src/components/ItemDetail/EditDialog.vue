<template>
  <dialog-template @close="close">
    <h2 :class="$style.title">所有者の情報を更新する</h2>
    <form :class="$style.container" @submit.prevent="editItem">
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
          :min="ownInfo.count - remain"
        />
      </label>
      <wide-icon-button
        icon="mdi:account-edit"
        label="更新する"
        variant="secondary"
        type="submit"
        :class="$style.button"
      />
    </form>
  </dialog-template>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { Owner } from '/@/lib/apis'
import DialogTemplate from '/@/components/UI/DialogTemplate.vue'
import WideIconButton from '/@/components/UI/WideIconButton.vue'
import useBorrow from './use/borrow'

export default defineComponent({
  name: 'EditDialog',
  components: {
    DialogTemplate,
    WideIconButton
  },
  props: {
    ownInfo: {
      type: Object as PropType<Owner>,
      required: true
    },
    remain: {
      type: Number,
      required: true
    }
  },
  emits: {
    close: () => true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    edit: (payload: { rentalable: boolean; count: number }) => true
  },
  setup(props, context) {
    const rentalable = ref(props.ownInfo.rentalable)
    const count = ref(props.ownInfo.count)
    const close = () => {
      context.emit('close')
    }
    const editItem = async () => {
      context.emit('edit', { rentalable: rentalable.value, count: count.value })
    }
    return {
      close,
      rentalable,
      count,
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
