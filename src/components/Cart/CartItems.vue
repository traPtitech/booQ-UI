<template>
  <ul :class="$style.list">
    <li
      v-for="item in items"
      :key="item.item.id"
      :class="$style.item"
      @click="() => clickAddDialog(item.item)"
    >
      <div :class="$style.imageContainer">
        <img :src="item.item.imgUrl || NoImg" :class="$style.img" />
      </div>
      <div>
        <h4 :class="$style.title">{{ item.item.name }}</h4>
        <div>カートに入れた数:{{ item.count }}</div>
      </div>
    </li>
    <cart-add-dialog
      v-if="isOpenAddDialog"
      :item="addDialogItem"
      @close="toggleAddDialog"
    />
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import CartAddDialog from './CartAddDialog.vue'
import useCart from '../Item/use/cart'
import NoImg from '/@/assets/img/no-image.svg'
import { useStore } from '/@/store'

export default defineComponent({
  name: 'CartItems',
  components: {
    CartAddDialog
  },
  setup() {
    const store = useStore()
    const items = computed(() => store.state.cart)
    const { isOpenAddDialog, clickAddDialog, addDialogItem, toggleAddDialog } =
      useCart(computed(() => items.value.map(i => i.item)))
    return {
      items,
      isOpenAddDialog,
      clickAddDialog,
      addDialogItem,
      toggleAddDialog,
      NoImg
    }
  }
})
</script>

<style lang="scss" module>
.list {
  display: flex;
  flex-direction: column;
}

.item {
  display: flex;
  margin-top: 1rem;
  cursor: pointer;
  height: 6rem;
}

.imageContainer {
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

.button {
  margin-top: 0.5rem;
  width: 100%;
}
</style>
