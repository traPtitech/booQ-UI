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

<script lang="ts" setup>
import { ref } from 'vue'
import apis, { ItemType, LogType } from '/@/lib/apis'
import { stringifyDate } from '/@/lib/date'
import { useToast } from '/@/store/toast'
import { useCart } from '/@/store/cart'
import useMe from '/@/composables/useMe'
import WideIconButton from '/@/components/UI/WideIconButton.vue'
import InputText from '/@/components/UI/InputText.vue'
import InputDate from '/@/components/UI/InputDate.vue'

const emit = defineEmits<{
  (e: 'borrowed'): void
}>()

const toastStore = useToast()
const cartStore = useCart()
const { admin } = useMe()

const dueDate = ref(new Date())
const purpose = ref('')

const borrowItems = async () => {
  const hasEquipment = cartStore.cart.some(
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

  const promises = cartStore.cart.map(async iic =>
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
    toastStore.addToast({
      type: 'success',
      text: `物品を${promises.length > 0 ? 'まとめて' : ''}借りました。`
    })
    cartStore.removeAllItemFromCart()
    emit('borrowed')
  } catch {
    toastStore.addToast({
      type: 'error',
      text: `物品を${promises.length ? 'まとめて' : ''}借りられませんでした。`
    })
  }
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
