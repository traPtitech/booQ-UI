<template>
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
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import WideIconButton from '/@/components/UI/WideIconButton.vue'
import InputText from '/@/components/UI/InputText.vue'
import InputDate from '/@/components/UI/InputDate.vue'
import apis, { ItemType, LogType } from '/@/lib/apis'
import { stringifyDate } from '/@/lib/date'
import { useStore } from '/@/store'
import useMe from '/@/use/me'

export default defineComponent({
  name: 'CartConfirmDialog',
  components: {
    InputText,
    InputDate,
    WideIconButton
  },
  emits: {
    borrowed: () => true
  },
  setup(props, { emit }) {
    const store = useStore()
    const { admin } = useMe()

    const dueDate = ref(new Date())
    const purpose = ref('')

    const borrowItems = async () => {
      const hasEquipment = store.state.cart.some(
        c => c.item.type === ItemType.equipment
      )
      if (!admin.value && hasEquipment) {
        // TODO: これリンクあっても押せないからモーダルかなんかにする
        const res = window.confirm(
          '備品を借りようとしていますが役員には確認しましたか？\n倉庫に関してはこちら→https://wiki.trap.jp/general/%E5%80%89%E5%BA%AB'
        )
        if (!res) {
          return
        }
      }

      const promises = store.state.cart.map(async iic =>
        apis.postLog(iic.item.id, {
          ownerId: iic.ownerId,
          type: LogType.borrow,
          purpose: purpose.value,
          dueDate: stringifyDate(dueDate.value, '-'),
          count: iic.count
        })
      )
      try {
        await Promise.all(promises)
        store.commit.addToast({
          type: 'success',
          text: `物品を${promises.length > 0 ? 'まとめて' : ''}借りました。`
        })
        store.commit.removeAllItemFromCart()
        emit('borrowed')
      } catch {
        store.commit.addToast({
          type: 'error',
          text: `物品を${
            promises.length ? 'まとめて' : ''
          }借りられませんでした。`
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
