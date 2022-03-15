<template>
  <div :class="$style.container">
    <mini-popup
      v-model:isOpen="isPopupOpen"
      transition-transform-origin="top right"
    >
      <template #opener>
        <a-icon name="mdi:dots-horizontal" :size="32" :class="$style.icon" />
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
      @update-item="() => emit('updateItem')"
    />
    <add-owner-dialog
      v-if="isOpenAddOwnerDialog"
      :item="item"
      @close="toggleAddOwnerDialog"
      @update-item="() => emit('updateItem')"
    />
  </div>
</template>

<script lang="ts">
import { ItemDetail } from '/@/lib/apis'
import useOpener from '/@/use/opener'
import useOtherControl from './use/otherControl'
import useDeleteItem from './use/deleteItem'
import { useRouter } from 'vue-router'
</script>

<script lang="ts" setup>
import AIcon from '/@/components/UI/AIcon.vue';
import NormalIconButton from '/@/components/UI/NormalIconButton.vue';
import EditDialog from './EditDialog.vue';
import AddOwnerDialog from './AddOwnerDialog.vue';
import MiniPopup from '/@/components/UI/MiniPopup.vue';

const props = defineProps<{
    item: ItemDetail
}>();

const emit = defineEmits<{
    (e: "updateItem"): void
}>();

const { isOpen: isPopupOpen, toggle: togglePopup } = useOpener()

const { isOpen: isOpenEditDialog, toggle: toggleEditDialog } = useOpener()
const { isOpen: isOpenAddOwnerDialog, toggle: toggleAddOwnerDialog } =
  useOpener()

const { isMeOwner, isAdmin, isDisabledAddOwnerButton } =
  useOtherControl(props)

const router = useRouter()
const { deleteItem } = useDeleteItem()
const onDeleteClick = async () => {
  const deleted = await deleteItem({
    itemID: props.item.id,
    itemName: props.item.name
  })
  togglePopup()
  if (deleted) {
    router.push('/')
  }
}
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
