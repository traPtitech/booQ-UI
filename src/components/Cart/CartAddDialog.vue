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
          :min="cartCount ? 0 : 1"
        />
        <wide-icon-button
          :icon="button.icon"
          :label="button.label"
          :variant="button.variant"
          type="submit"
          :class="$style.button"
          :disabled="maxCount === 0"
        />
        <template v-if="!isCartMode" :class="$style.continue">
          <div :class="$style.or">または</div>
          <wide-icon-button
            icon="mdi:cart"
            label="まだ借りる"
            type="submit"
            :value="true"
            :class="$style.button"
          />
          <div :class="$style.description">
            「まだ借りる」でまとめて目的や返却日を入力できます
          </div>
        </template>
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
    isCartMode: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    close: () => true,
    openConfirm: () => true,
    jumpPage: () => true
  },
  setup(props, context) {
    const store = useStore()

    const cartCount = computed(
      () => store.state.cart.find(iic => iic.id === props.item.id)?.count ?? 0
    )

    const title = computed(() =>
      cartCount.value ? '個数を変更する' : '物品を借りる'
    )
    const ownerName = ref(
      (() => {
        if (props.item.type === ItemType.equipment) {
          return (
            props.item.owners.find(v => v.ownerId === traP_ID)?.user.name ?? ''
          )
        } else {
          return props.item.owners[0]?.user.name ?? ''
        }
      })()
    )
    const owner = computed(() =>
      props.item.owners.find(v => v.user.name === ownerName.value)
    )
    const ownerDetails = computed(() =>
      props.item.owners
        .filter(v => v.rentalable)
        .map(v => ({ userName: v.user.name }))
    )
    const maxCount = computed(
      () =>
        props.item.latestLogs?.find(v => v.id === owner.value?.id)?.count ??
        props.item.owners.find(v => v.id === owner.value?.id)?.count ??
        1
    )
    const count = ref(cartCount.value || 1)
    const button = computed(() => {
      if (maxCount.value === 0) {
        return {
          icon: 'mdi:cancel',
          label: '在庫がありません',
          variant: 'caution'
        }
      }
      if (!props.isCartMode) {
        return { icon: 'mdi:arrow-right-bold-circle', label: '次にすすむ' }
      }
      if (!cartCount.value) {
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

    const submit = (e: { submitter: HTMLButtonElement }) => {
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
      if (!e.submitter.value) {
        context.emit('openConfirm')
      } else if (!props.isCartMode) {
        context.emit('jumpPage')
      }
      close()
    }
    return {
      title,
      count,
      button,
      close,
      cartCount,
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
}
.or {
  margin: 0.75rem 0;
  color: $color-text-secondary;
  font-size: 0.75rem;
}
.continue {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.description {
  opacity: 0.5;
  margin-top: 0.5rem;
  font-size: 0.75rem;
}
.button {
  margin: auto;
}
</style>
