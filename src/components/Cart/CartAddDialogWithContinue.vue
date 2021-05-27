<template>
  <cart-add-dialog :item="item" :btn="btn" @close="close" @submit="openConfirm">
    <template #continue>
      <div :class="$style.continue">
        <div :class="$style.or">または</div>
        <wide-icon-button
          icon="mdi:cart"
          label="まだ借りる"
          type="submit"
          :class="$style.button"
          @click="jumpPage"
        />
        <div :class="$style.description">
          「まだ借りる」でまとめて目的や返却日を入力できます
        </div>
      </div>
    </template>
  </cart-add-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import WideIconButton from '/@/components/UI/WideIconButton.vue'
import CartAddDialog from './CartAddDialog.vue'
import { ItemSummary } from '/@/lib/apis'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'CartAddDialogWithContinue',
  components: {
    CartAddDialog,
    WideIconButton
  },
  props: {
    item: {
      type: Object as PropType<ItemSummary>,
      required: true
    }
  },
  emits: {
    close: () => true,
    openConfirm: () => true
  },
  setup(_, context) {
    const close = () => {
      context.emit('close')
    }

    const router = useRouter()
    const jumpPage = () => {
      router.push('/items/equipment')
    }

    const openConfirm = () => {
      context.emit('openConfirm')
    }

    const btn = { icon: 'mdi:arrow-right-bold-circle', label: '次にすすむ' }
    return {
      close,
      jumpPage,
      openConfirm,
      btn
    }
  }
})
</script>

<style lang="scss" module>
.button {
  width: 100%;
  margin: auto;
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
</style>
