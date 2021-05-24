<template>
  <dialog-template :title="title" @close="close">
    <div :class="$style.container">
      <h3 :class="$style.title">{{ item.name }}</h3>
      <form @submit.prevent="submit">
        <div :class="$style.content">
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
        <div v-if="!isCartMode" :class="$style.continue">
          <div :class="$style.or">または</div>
          <wide-icon-button
            icon="mdi:cart"
            label="まだ借りる"
            type="submit"
            :value="true"
            :class="$style.button"
          />
        </div>
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
import { useRouter } from 'vue-router'
import { useStore } from '/@/store'

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
    },
    isCartMode: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    close: () => true,
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
      if (!props.isCartMode) {
        return { icon: 'mdi:arrow-right-bold-circle', label: '次にすすむ' }
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

    const store = useStore()
    const router = useRouter()
    const submit = (e: { submitter: HTMLButtonElement }) => {
      if (count.value === 0) {
        store.commit.removeItemFromCart(props.item.id)
      } else {
        store.commit.addItemToCart({ id: props.item.id, count: count.value })
      }
      if (!e.submitter.value) {
        // isCartModeがfalseなら目的とか入力させるように
        close()
      } else {
        if (props.isCartMode) {
          close()
        } else {
          router.push('/items/equipment')
        }
      }
    }
    return { title, count, button, close, imgUrl, maxCount, submit }
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
.content {
  display: flex;
  margin-bottom: 2rem;
}
.img {
  max-width: 50%;
}
.inputContainer {
  margin-left: 1rem;
  width: 100%;
}
.or {
  margin: 0.75rem 0;
  color: $color-text-secondary;
}
.continue {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.button {
  margin: auto;
}
</style>
