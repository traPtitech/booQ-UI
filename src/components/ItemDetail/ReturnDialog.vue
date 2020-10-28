<template>
  <dialog-template @close="close">
    <h2 :class="$style.title">物品を返す</h2>
    <form :class="$style.container" @submit.prevent="returnItemAndClose">
      <owner-selector v-model="selectedOwnerName" :details="details" />
      <label v-if="owner && owner.count !== 1" :class="$style.label">
        個数:
        <input
          v-model.number="count"
          type="number"
          :class="$style.input"
          :max="owner.count"
          :min="1"
        />
      </label>
      <icon-button
        icon="mdi:arrow-up-bold-circle"
        label="返す"
        type="submit"
        :class="$style.button"
      />
    </form>
  </dialog-template>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ItemSummary } from '/@/lib/apis'
import DialogTemplate from '/@/components/UI/DialogTemplate.vue'
import OwnerSelector from './OwnerSelector.vue'
import IconButton from '/@/components/UI/IconButton.vue'
import useReturn from './use/return'

export default defineComponent({
  name: 'ReturnDialog',
  components: {
    DialogTemplate,
    OwnerSelector,
    IconButton
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
    const { details, selectedOwnerName, count, owner, returnItem } = useReturn(
      props
    )
    const close = () => {
      context.emit('close')
    }
    const returnItemAndClose = async () => {
      await returnItem()
      close()
    }
    return {
      close,
      details,
      selectedOwnerName,
      count,
      owner,
      returnItemAndClose
    }
  }
})
</script>

<style lang="scss" module>
.container {
  text-align: left;
  margin-top: 3rem;
}
.title {
  text-align: center;
}
.label {
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: start;
  word-break: keep-all;
}
.input {
  width: 100%;
  margin-top: 0.25rem;
}
.button {
  width: 80%;
  padding: 4px;
  margin: auto;
  margin-top: 32px;
  border-radius: 18px;
  color: $color-primary;
  border: solid 1px $color-primary;
  background-color: $color-background;
}
</style>
