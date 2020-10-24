<template>
  <div>
    <img :class="$style.img" :src="imgUrl" />
    <div :class="$style.btnContainer">
      <icon-button
        icon="arrow-down-bold-circle"
        label="借りる"
        :class="$style.btn"
        @click="toggleBorrowDialog"
      />
      <icon-button
        icon="arrow-up-bold-circle"
        label="返す"
        :class="$style.btn"
        :disabled="disableReturn"
        @click="toggleReturnDialog"
      />
      <icon name="dots-horizontal" :size="32" :class="$style.icon" />
    </div>
    <borrow-dialog
      v-if="isOpenBorrowDialog"
      :item="item"
      @close="toggleBorrowDialog"
    />
    <return-dialog
      v-if="isOpenReturnDialog"
      :item="item"
      @close="toggleReturnDialog"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { ItemSummary } from '/@/lib/apis'
import { getBorrowedOwner } from './use/return'
import Icon from '/@/components/UI/Icon.vue'
import IconButton from '/@/components/UI/IconButton.vue'
import useOpener from '/@/components/UI/use/opener'
import BorrowDialog from './BorrowDialog.vue'
import ReturnDialog from './ReturnDialog.vue'

export default defineComponent({
  name: 'Controls',
  components: {
    Icon,
    IconButton,
    BorrowDialog,
    ReturnDialog
  },
  props: {
    item: {
      type: Object as PropType<ItemSummary>,
      required: true
    },
    imgUrl: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const {
      isOpen: isOpenBorrowDialog,
      toggle: toggleBorrowDialog
    } = useOpener()
    const {
      isOpen: isOpenReturnDialog,
      toggle: toggleReturnDialog
    } = useOpener()
    // TODO: storeにmeをおいたらIDにちゃんとしたやつを入れる(10は@ryoha のID)
    const disableReturn = computed(
      () => getBorrowedOwner(10, props.item).length === 0
    )
    return {
      isOpenBorrowDialog,
      toggleBorrowDialog,
      isOpenReturnDialog,
      toggleReturnDialog,
      disableReturn
    }
  }
})
</script>

<style lang="scss" module>
$height: 36px;

.img {
  width: 100%;
}

.btnContainer {
  display: flex;
  align-items: center;
  padding: 8px;
  user-select: none;
}

.btn {
  height: $height;
  width: 96px;
  margin-right: 8px;
  border-radius: $height / 2;
  border: solid 1px $color-primary;
  color: $color-primary;
  background-color: $color-background;
  transition: all 0.2s;
  &:hover {
    &:not(:disabled) {
      background-color: $color-primary;
      color: $color-background;
    }
  }
}

.icon {
  cursor: pointer;
}
</style>
