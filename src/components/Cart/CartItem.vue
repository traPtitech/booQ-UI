<template>
  <ul :class="$style.list">
    <li
      v-for="iwcc in itemWithCartCounts"
      :key="iwcc.item.id"
      :class="$style.item"
      @click="() => clickAddDialog(iwcc.item)"
    >
      <div :class="$style.imageContainer">
        <img :src="iwcc.item.imgUrl || NoImg" :class="$style.img" />
      </div>
      <div>
        <h4 :class="$style.title">{{ iwcc.item.name }}</h4>
        <div>カートに入れた数:{{ iwcc.count }}</div>
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
import { defineComponent, PropType } from 'vue'
import { ItemSummary } from '/@/lib/apis'
import CartAddDialog from './CartAddDialog.vue'
import useCart from '../Item/use/cart'
import NoImg from '/@/assets/img/no-image.svg'

export default defineComponent({
  name: 'CartItem',
  components: {
    CartAddDialog
  },
  props: {
    items: {
      type: Array as PropType<ItemSummary[]>,
      required: true
    }
  },
  setup(props) {
    const {
      isOpenAddDialog,
      toggleAddDialog,
      clickAddDialog,
      addDialogItem,
      itemWithCartCounts
    } = useCart(props)
    return {
      isOpenAddDialog,
      toggleAddDialog,
      clickAddDialog,
      addDialogItem,
      itemWithCartCounts,
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
