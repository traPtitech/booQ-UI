<template>
  <div>
    <img :class="$style.img" :src="imgUrl" />
    <div :class="$style.btnContainer">
      <normal-icon-button
        icon="mdi:arrow-down-bold-circle"
        label="借りる"
        :class="$style.btn"
        @click="toggleBorrowDialog"
      />
      <normal-icon-button
        icon="mdi:arrow-up-bold-circle"
        label="返す"
        :class="$style.btn"
        :disabled="isReturnDisabled"
        @click="toggleReturnDialog"
      />
      <icon name="mdi:dots-horizontal" :size="32" :class="$style.icon" />
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
import { getOwnerBorrowedFrom } from './use/return'
import Icon from '/@/components/UI/Icon.vue'
import NormalIconButton from '/@/components/UI/NormalIconButton.vue'
import useOpener from '/@/components/UI/use/opener'
import BorrowDialog from './BorrowDialog.vue'
import ReturnDialog from './ReturnDialog.vue'
import useMe from '/@/use/me'
import NoImg from '/@/assets/img/no-image.svg'

export default defineComponent({
  name: 'Controls',
  components: {
    Icon,
    NormalIconButton,
    BorrowDialog,
    ReturnDialog
  },
  props: {
    item: {
      type: Object as PropType<ItemSummary>,
      required: true
    }
  },
  setup(props) {
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
    const isReturnDisabled = computed(
      () => getOwnerBorrowedFrom(myId.value, props.item).length === 0
    )

    return {
      imgUrl,
      isOpenBorrowDialog,
      toggleBorrowDialog,
      isOpenReturnDialog,
      toggleReturnDialog,
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
  align-items: center;
  padding: 8px;
  user-select: none;
}

.btn {
  margin-right: 8px;
}

.icon {
  cursor: pointer;
}
</style>
