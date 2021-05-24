<template>
  <dialog-template :title="title" @close="close">
    <div :class="$style.container">
      <h3 :class="$style.title">{{ item.name }}</h3>
      <form @submit.prevent="click">
        <div :class="$style.flex">
          <img :src="imgUrl" :class="$style.img" />
          <div :class="$style.inputContainer">
            <input-number
              v-model="count"
              label="個数"
              :max="maxCount"
              :min="cartCount ? 0 : 1"
            />
          </div>
        </div>
        <wide-icon-button
          :icon="button.icon"
          :label="button.label"
          :variant="button.variant"
          type="submit"
          :class="$style.button"
          :disabled="maxCount === 0"
        />
      </form>
    </div>
  </dialog-template>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import DialogTemplate from '/@/components/UI/DialogTemplate.vue'
import WideIconButton from '/@/components/UI/WideIconButton.vue'
import InputNumber from '/@/components/UI/InputNumber.vue'
import { ItemSummary, traP_ID } from '/@/lib/apis'
import NoImg from '/@/assets/img/no-image.svg'

export default defineComponent({
  name: 'AddOwnerDialog',
  components: {
    DialogTemplate,
    WideIconButton,
    InputNumber
  },
  props: {
    item: {
      type: Object as PropType<ItemSummary>,
      required: true
    },
    cartCount: {
      type: Number,
      required: true
    }
  },
  emits: {
    close: () => true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    add: (_: { id: number, count: number }) => true
  },
  setup(props, context) {
    const title = computed(() => props.cartCount ? '個数を変更' : '物品を借りる')
    const imgUrl = computed(() => props.item.imgUrl || NoImg)
    const maxCount = props.item.latestLogs?.find(v => v.ownerId === traP_ID)?.count ??
      props.item.owners.find(v => v.ownerId === traP_ID)?.count ??
      1
    const count = ref(props.cartCount || 1)
    const button = computed(() => {
      if (maxCount === 0) {
        return { icon: 'mdi:cancel', label: '在庫がありません', variant: 'caution' }
      }
      if (!props.cartCount) {
        return { icon: 'mdi:cart', label: 'カートに入れる' }
      }
      if (count.value !== 0) {
        return { icon: 'mdi:arrow-right-bold-circle', label: 'OK' }
      }
      return { icon: 'mdi:arrow-right-bold-circle', label: '削除', variant: 'caution' }
    })

    const close = () => {
      context.emit('close')
    }

    const click = () => {
      context.emit('add', { id: props.item.id, count: count.value })
      close()
    }
    return { title, count, button, close, imgUrl, maxCount, click }
  }
})
</script>

<style lang="scss" module>
.container {
  max-width: 360px;
}
.title {
  word-break: break-all;
}
.flex {
  display: flex;
}
.img {
  max-width: 50%;
}
.inputContainer {
  margin-left: 1rem;
  width: 100%;
}
.button {
  margin: auto;
  margin-top: 32px;
}
</style>
