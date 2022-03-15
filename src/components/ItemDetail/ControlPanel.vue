<template>
  <div>
    <img :class="$style.img" :src="imgUrl" />
    <div :class="$style.btnContainer">
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
      <other-controls :item="item" @update-item="updateItem" />
    </div>
    <cart-add-dialog-with-continue
      v-if="isOpenBorrowDialog"
      :item="item"
      @close="toggleBorrowDialog"
    />
    <return-dialog
      v-if="isOpenReturnDialog"
      :item="item"
      @close="toggleReturnDialog"
      @update-item="updateItem"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import apis, { ItemDetail } from '/@/lib/apis'
import { getOwnersCanLend, getOwnerBorrowedFrom } from '/@/lib/item'
import useOpener from '/@/use/opener'
import useMe from '/@/use/me'
import NoImg from '/@/assets/img/no-image.svg'
import NormalIconButton from '/@/components/UI/NormalIconButton.vue'
import ReturnDialog from './ReturnDialog.vue'
import CartAddDialogWithContinue from '/@/components/Cart/CartAddDialogWithContinue.vue'
import OtherControls from './OtherControls.vue'

const props = defineProps<{
  item: ItemDetail
}>()

const emit = defineEmits<{
  (e: 'updateItem', item: ItemDetail): void
}>()

const updateItem = async () =>
  emit('updateItem', (await apis.getItem(props.item.id)).data)
const imgUrl = computed(() => props.item.imgUrl || NoImg)

const { isOpen: isOpenBorrowDialog, toggle: toggleBorrowDialog } = useOpener()
const { isOpen: isOpenReturnDialog, toggle: toggleReturnDialog } = useOpener()

const { id: myId } = useMe()
const isBorrowDisabled = computed(
  () => getOwnersCanLend(props.item).length === 0
)
const isReturnDisabled = computed(
  () => getOwnerBorrowedFrom(myId.value, props.item).length === 0
)
</script>

<style lang="scss" module>
.img {
  width: 100%;
}

.btnContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  user-select: none;
}

.btn {
  margin: 0.25rem;
}
</style>
