<template>
  <div :class="$style.container" @click="toggleDialog">
    <div :class="$style.imgContainer">
      <img :src="imgUrl" :class="$style.img" />
    </div>
    <div>
      <h4 :class="$style.title">{{ cartItem.item.name }}</h4>
      <div>カートに入れた数:{{ cartItem.count }}</div>
      <div>所有者: @{{ owner?.user.name ?? '' }}</div>
    </div>
    <cart-add-dialog
      v-if="isDialogOpen"
      :item="cartItem.item"
      @close="toggleDialog"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import { CartItem } from '/@/store/types'
import NoImg from '/@/assets/img/no-image.svg'
import useOpener from '/@/use/opener'
import CartAddDialog from './CartAddDialog.vue'

export default defineComponent({
  name: 'CartItem',
  components: {
    CartAddDialog
  },
  props: {
    cartItem: {
      type: Object as PropType<CartItem>,
      required: true
    }
  },
  setup(props) {
    const { isOpen: isDialogOpen, toggle: toggleDialog } = useOpener()

    const imgUrl = computed(() => props.cartItem.item.imgUrl || NoImg)
    const owner = computed(() =>
      props.cartItem.item.owners.find(
        owner => props.cartItem.ownerId === owner.ownerId
      )
    )

    return { isDialogOpen, toggleDialog, imgUrl, owner }
  }
})
</script>

<style lang="scss" module>
.container {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.imgContainer {
  position: relative;
  height: 100%;
  width: 11%;
  margin-right: 0.5rem;
  min-width: 6rem;
  flex-shrink: 0;
}

.img {
  height: 100%;
  width: 100%;
  object-fit: contain;
}

.title {
  margin: 0.5rem 0;
}
</style>
