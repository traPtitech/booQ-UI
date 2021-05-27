<template>
  <dialog-template :title="title" @close="close">
    <div :class="$style.container">
      <form @submit.prevent="submit">
        <owner-selector
          v-if="item.type !== ItemType.equipment"
          v-model="ownerName"
          :owner-details="ownerDetails"
          :class="$style.input"
        />
        <input-number
          v-model="count"
          :class="$style.input"
          label="個数"
          :max="maxCount"
          :min="isEdit ? 0 : 1"
        />
        <wide-icon-button
          :icon="button.icon"
          :label="button.label"
          :variant="button.variant"
          type="submit"
          :class="$style.button"
          :disabled="maxCount === 0"
        />
        <slot name="continue" />
      </form>
    </div>
  </dialog-template>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import DialogTemplate from '/@/components/UI/DialogTemplate.vue'
import WideIconButton from '/@/components/UI/WideIconButton.vue'
import OwnerSelector from '/@/components/ItemDetail/OwnerSelector.vue'
import InputNumber from '/@/components/UI/InputNumber.vue'
import { ItemSummary, ItemType, traP_ID } from '/@/lib/apis'
import { useStore } from '/@/store'

export default defineComponent({
  name: 'CartAddDialog',
  components: {
    DialogTemplate,
    WideIconButton,
    InputNumber,
    OwnerSelector
  },
  props: {
    item: {
      type: Object as PropType<ItemSummary>,
      required: true
    },
    btn: {
      type: Object as PropType<{ icon: string; label: string } | null>,
      default: null
    }
  },
  emits: {
    close: () => true,
    submit: () => true
  },
  setup(props, context) {
    const store = useStore()

    const cartCount = computed(
      () => store.state.cart.find(iic => iic.id === props.item.id)?.count ?? 0
    )
    const isEdit = computed(() => cartCount.value !== 0)

    const title = computed(() =>
      isEdit.value ? '個数を変更する' : '物品を借りる'
    )
    const ownerDetails = computed(() =>
      props.item.owners
        .filter(v => v.rentalable)
        .map(v => ({ userName: v.user.name }))
    )
    const ownerName = ref(
      (() => {
        if (props.item.type === ItemType.equipment) {
          return (
            props.item.owners.find(v => v.ownerId === traP_ID)?.user.name ?? ''
          )
        } else {
          return ownerDetails.value[0]?.userName ?? ''
        }
      })()
    )
    const owner = computed(() =>
      props.item.owners.find(v => v.user.name === ownerName.value)
    )
    const maxCount = computed(
      () =>
        props.item.latestLogs?.find(v => v.id === owner.value?.id)?.count ??
        props.item.owners.find(v => v.id === owner.value?.id)?.count ??
        1
    )
    const count = ref(cartCount.value || 1)
    const button = computed(() => {
      if (props.btn) {
        return props.btn as { icon: string; label: string; variant: undefined }
      }
      if (maxCount.value === 0) {
        return {
          icon: 'mdi:cancel',
          label: '在庫がありません',
          variant: 'caution'
        }
      }
      if (!isEdit.value) {
        return { icon: 'mdi:cart', label: 'カートに入れる' }
      }
      if (count.value !== 0) {
        return { icon: 'mdi:arrow-right-bold-circle', label: '変更する' }
      }
      return {
        icon: 'mdi:arrow-right-bold-circle',
        label: '削除',
        variant: 'caution'
      }
    })

    const close = () => {
      context.emit('close')
    }

    const submit = () => {
      if (!owner.value) {
        close()
        return
      }
      if (count.value === 0) {
        store.commit.removeItemFromCart(props.item.id)
      } else {
        store.commit.upsertItemToCart({
          id: props.item.id,
          count: count.value,
          ownerId: owner.value.ownerId
        })
      }
      context.emit('submit')
      close()
    }
    return {
      title,
      count,
      button,
      close,
      cartCount,
      isEdit,
      ownerName,
      ownerDetails,
      maxCount,
      submit,
      ItemType
    }
  }
})
</script>

<style lang="scss" module>
.container {
  max-width: 360px;
}
.input {
  margin-bottom: 2rem;
  width: 100%;
}
.button {
  width: 100%;
  margin: auto;
}
</style>
