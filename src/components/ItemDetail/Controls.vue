<template>
  <div>
    <img :class="$style.img" :src="imgUrl" />
    <div :class="$style.btnContainer">
      <div :class="$style.mainBtns">
        <normal-icon-button
          icon="mdi:arrow-down-bold-circle"
          label="借りる"
          :class="$style.btn"
          :disabled="isBorrowDisabled"
          @click="toggleBorrowDialog"
        />
        <normal-icon-button
          icon="mdi:arrow-up-bold-circle"
          label="返す"
          variant="secondary"
          :class="$style.btn"
          :disabled="isReturnDisabled"
          @click="toggleReturnDialog"
        />
      </div>
      <other-controls
        :item="item"
        :class="$style.otherControl"
        @updateItem="updateItem"
      />
    </div>
    <borrow-dialog
      v-if="isOpenBorrowDialog"
      :item="item"
      @close="toggleBorrowDialog"
      @updateItem="updateItem"
    />
    <return-dialog
      v-if="isOpenReturnDialog"
      :item="item"
      @close="toggleReturnDialog"
      @updateItem="updateItem"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import apis, { ItemDetail } from '/@/lib/apis'
import { getOwnersCanLend, getOwnerBorrowedFrom } from '/@/lib/item'
import NormalIconButton from '/@/components/UI/NormalIconButton.vue'
import useOpener from '/@/components/UI/use/opener'
import BorrowDialog from './BorrowDialog.vue'
import ReturnDialog from './ReturnDialog.vue'
import useMe from '/@/use/me'
import NoImg from '/@/assets/img/no-image.svg'
import OtherControls from './OtherControls.vue'

export default defineComponent({
  name: 'Controls',
  components: {
    NormalIconButton,
    OtherControls,
    BorrowDialog,
    ReturnDialog
  },
  props: {
    item: {
      type: Object as PropType<ItemDetail>,
      required: true
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateItem: (item: ItemDetail) => true
  },
  setup(props, context) {
    const updateItem = async () =>
      context.emit('updateItem', (await apis.getItem(props.item.id)).data)
    const imgUrl = computed(() =>
      props.item.imgUrl ? props.item.imgUrl : NoImg
    )

    const {
      isOpen: isOpenBorrowDialog,
      toggle: toggleBorrowDialog
    } = useOpener()
    const {
      isOpen: isOpenReturnDialog,
      toggle: toggleReturnDialog
    } = useOpener()

    const { id: myId } = useMe()
    const isBorrowDisabled = computed(
      () => getOwnersCanLend(props.item).length === 0
    )
    const isReturnDisabled = computed(
      () => getOwnerBorrowedFrom(myId.value, props.item).length === 0
    )

    return {
      updateItem,
      imgUrl,
      isOpenBorrowDialog,
      toggleBorrowDialog,
      isOpenReturnDialog,
      toggleReturnDialog,
      isBorrowDisabled,
      isReturnDisabled
    }
  }
})
</script>

<style lang="scss" module>
.img {
  width: 100%;
}

.btnContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 8px;
  user-select: none;
}

.mainBtns {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.btn {
  margin: 0.25rem;
}
</style>
