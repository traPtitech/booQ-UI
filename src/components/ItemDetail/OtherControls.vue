<template>
  <div :class="$style.container">
    <mini-popup
      v-model:isOpen="isPopupOpen"
      transition-transform-origin="top right"
    >
      <template #opener>
        <icon name="mdi:dots-horizontal" :size="32" :class="$style.icon" />
      </template>
      <template #content>
        <normal-icon-button
          icon="mdi:account-plus"
          label="追加"
          variant="secondary"
          :disabled="isDisabledAddOwnerButton"
          :class="$style.btn"
          @click="toggleAddOwnerDialog"
        />
        <normal-icon-button
          icon="mdi:account-edit"
          label="変更"
          variant="secondary"
          :class="$style.btn"
          :disabled="!isAdmin && !isMeOwner"
          @click="toggleEditDialog"
        />
        <normal-icon-button
          icon="mdi:close-circle"
          label="削除"
          variant="caution"
          :class="$style.btn"
          :disabled="!isAdmin"
          @click="onDeleteClick"
        />
      </template>
    </mini-popup>
    <edit-dialog
      v-if="isOpenEditDialog"
      :item="item"
      @close="toggleEditDialog"
      @updateItem="() => emit('updateItem')"
    />
    <add-owner-dialog
      v-if="isOpenAddOwnerDialog"
      :item="item"
      @close="toggleAddOwnerDialog"
      @updateItem="() => emit('updateItem')"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ItemDetail } from '/@/lib/apis'
import Icon from '/@/components/UI/Icon.vue'
import useOpener from '/@/use/opener'
import NormalIconButton from '/@/components/UI/NormalIconButton.vue'
import EditDialog from './EditDialog.vue'
import AddOwnerDialog from './AddOwnerDialog.vue'
import useOtherControl from './use/otherControl'
import useDeleteItem from './use/deleteItem'
import MiniPopup from '/@/components/UI/MiniPopup.vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'OtherControls',
  components: {
    Icon,
    NormalIconButton,
    EditDialog,
    AddOwnerDialog,
    MiniPopup
  },
  props: {
    item: {
      type: Object as PropType<ItemDetail>,
      required: true
    }
  },
  emits: {
    updateItem: () => true
  },
  setup(props, { emit }) {
    const { isOpen: isPopupOpen, toggle: togglePopup } = useOpener()

    const { isOpen: isOpenEditDialog, toggle: toggleEditDialog } = useOpener()
    const {
      isOpen: isOpenAddOwnerDialog,
      toggle: toggleAddOwnerDialog
    } = useOpener()

    const { isMeOwner, isAdmin, isDisabledAddOwnerButton } = useOtherControl(
      props
    )

    const router = useRouter()
    const { deleteItem } = useDeleteItem()
    const onDeleteClick = async () => {
      await deleteItem({ itemID: props.item.id, itemName: props.item.name })
      togglePopup()
      router.push('/')
    }

    return {
      isPopupOpen,
      isOpenEditDialog,
      toggleEditDialog,
      isOpenAddOwnerDialog,
      toggleAddOwnerDialog,
      isMeOwner,
      isDisabledAddOwnerButton,
      isAdmin,
      onDeleteClick,
      emit
    }
  }
})
</script>

<style lang="scss" module>
.container {
  position: relative;
}
.icon {
  cursor: pointer;
}
.btn {
  margin: 1rem 0;
  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
