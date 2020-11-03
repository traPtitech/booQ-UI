<template>
  <div :class="$style.container">
    <icon
      name="mdi:dots-horizontal"
      :size="32"
      :class="$style.icon"
      @click.stop="toggle"
    />
    <transition name="other-popup">
      <div v-if="isOpen" :id="popupId" :class="$style.popup">
        <normal-icon-button
          icon="mdi:account-plus"
          label="追加"
          variant="secondary"
          :disabled="
            (!isAdmin && ownInfo) || isOwns.reduce((acc, cur) => acc && cur)
          "
          :class="$style.btn"
          @click="toggleAddOwnerDialog"
        />
        <normal-icon-button
          icon="mdi:account-edit"
          label="変更"
          variant="secondary"
          :class="$style.btn"
          :disabled="!ownInfo"
          @click="toggleEditDialog"
        />
        <normal-icon-button
          icon="mdi:close-circle"
          label="削除"
          variant="caution"
          :class="$style.btn"
          :disabled="!isAdmin"
          @click="deleteItem"
        />
      </div>
    </transition>
    <edit-dialog
      v-if="isOpenEditDialog"
      :own-info="ownInfo"
      :remain="remain"
      @close="toggleEditDialog"
      @edit="edit"
    />
    <add-owner-dialog
      v-if="isOpenAddOwnerDialog"
      :is-admin="isAdmin"
      :is-owns="isOwns"
      @close="toggleAddOwnerDialog"
      @add="add"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, onMounted, onBeforeUnmount, Ref } from 'vue'
import { ItemSummary } from '/@/lib/apis'
import Icon from '/@/components/UI/Icon.vue'
import useOpener from '/@/components/UI/use/opener'
import NormalIconButton from '/@/components/UI/NormalIconButton.vue'
import EditDialog from './EditDialog.vue'
import AddOwnerDialog from './AddOwnerDialog.vue'
import useOtherControl from './use/otherControl'

const popupId = 'other-controls-popup'

const useHideOnClickOutside = (isOpen: Ref<boolean>, toggle: () => void) => {
  const onClickBody = (e: MouseEvent) => {
    // 外側をクリックしたときは閉じる動作しかしない
    if (!isOpen.value) return
    if (!e.target) return

    const popupElement = (e.target as Element).closest(`#${popupId}`)
    // クリックした箇所の親にポップアップを持たないとき
    if (!popupElement) {
      toggle()
    }
  }
  onMounted(() => {
    document.body.addEventListener('click', onClickBody)
  })
  onBeforeUnmount(() => {
    document.body.removeEventListener('click', onClickBody)
  })
}

export default defineComponent({
  name: 'OtherControls',
  components: {
    Icon,
    NormalIconButton,
    EditDialog,
    AddOwnerDialog
  },
  props: {
    item: {
      type: Object as PropType<ItemSummary>,
      required: true
    }
  },
  setup(props) {
    const { isOpen, toggle } = useOpener()
    useHideOnClickOutside(isOpen, toggle)
    const { isOpen: isOpenEditDialog, toggle: toggleEditDialog } = useOpener()
    const {
      isOpen: isOpenAddOwnerDialog,
      toggle: toggleAddOwnerDialog
    } = useOpener()

    const {
      ownInfo,
      isOwns,
      remain,
      isAdmin,
      deleteItem,
      editItem,
      addOwner
    } = useOtherControl(props)
    const edit = async (payload: { rentalable: boolean; count: number }) => {
      await editItem(payload)
      toggleEditDialog()
    }
    const add = async (payload: {
      ownerType: number
      rentalable: boolean
      count: number
    }) => {
      await addOwner(payload)
      toggleAddOwnerDialog()
    }
    return {
      isOpen,
      toggle,
      isOpenEditDialog,
      toggleEditDialog,
      isOpenAddOwnerDialog,
      toggleAddOwnerDialog,
      popupId,
      ownInfo,
      isOwns,
      remain,
      isAdmin,
      edit,
      add,
      deleteItem
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
.popup {
  position: absolute;
  top: 0;
  right: 0;
  padding: 1rem;
  background: $color-background;
  border: 1px solid $color-text-secondary;
  border-radius: 1rem;
  transform-origin: top right;
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
