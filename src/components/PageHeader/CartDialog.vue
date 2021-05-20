<template>
  <dialog-template title="物品を借りる" @close="close">
    <form @submit.prevent="borrowItems">
      <input-text
        v-model="purpose"
        :class="$style.item"
        label="目的"
        multiline
        rows="10"
        required
      />
      <input-date
        v-model="dueDate"
        :class="$style.item"
        label="返却日"
        :min-date="new Date()"
        required
      />
      <wide-icon-button
        icon="mdi:arrow-down-bold-circle"
        label="借りる"
        type="submit"
        :class="$style.button"
      />
    </form>
  </dialog-template>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import DialogTemplate from '/@/components/UI/DialogTemplate.vue'
import WideIconButton from '/@/components/UI/WideIconButton.vue'
import InputText from '/@/components/UI/InputText.vue'
import InputDate from '/@/components/UI/InputDate.vue'
import apis, { LogType, traP_ID } from '/@/lib/apis'
import { stringifyDate } from '/@/lib/date'
import { useStore } from '/@/store'

export default defineComponent({
  name: 'BorrowDialog',
  components: {
    DialogTemplate,
    InputText,
    InputDate,
    WideIconButton
  },
  props: {
    items: {
      type: Array as PropType<{ id: number, count: number }[]>,
      required: true
    }
  },
  emits: {
    close: () => true,
    updateItem: () => true
  },
  setup(props, context) {
    const store = useStore()
    const dueDate = ref(new Date())
    const purpose = ref('')
    const close = () => {
      context.emit('close')
    }
    const borrowItems = async () => {
      const promises = []
      for (const iic of props.items) {
        promises.push(new Promise<void>(async (resolve, reject) => {
          try {
            const log = {
              ownerId: traP_ID,
              type: LogType.borrow,
              purpose: purpose.value,
              dueDate: stringifyDate(dueDate.value, '-'),
              count: iic.count
            }
            await apis.postLog(iic.id, log)
            resolve()
          } catch (e) {
            reject(e)
          }
        }))
      }
      try {
        await Promise.all(promises)
        store.commit.addToast({
          type: 'success',
          text: `まとめて借りました。`
        })
        store.commit.removeAllItemFromCart()
        context.emit('close')
      } catch {
        store.commit.addToast({
          type: 'error',
          text: `まとめて借りられませんでした。`
        })
      }
    }
    return {
      close,
      purpose,
      dueDate,
      borrowItems
    }
  }
})
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
