<template>
  <div :class="$style.container">
    <icon
      name="mdi:dots-horizontal"
      :size="32"
      :class="$style.icon"
      @click.stop="toggle"
    />
    <div v-if="isOpen" :id="popupId" :class="$style.popup">
      <normal-icon-button
        icon="mdi:account-plus"
        label="追加"
        variant="secondary"
        :class="$style.btn"
      />
      <normal-icon-button
        icon="mdi:account-edit"
        label="変更"
        variant="secondary"
        :class="$style.btn"
      />
      <normal-icon-button
        icon="mdi:close-circle"
        label="削除"
        variant="caution"
        :class="$style.btn"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, onMounted, onBeforeUnmount, Ref } from 'vue'
import { ItemSummary } from '/@/lib/apis'
import Icon from '/@/components/UI/Icon.vue'
import useOpener from '/@/components/UI/use/opener'
import NormalIconButton from '/@/components/UI/NormalIconButton.vue'

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
    NormalIconButton
  },
  props: {
    item: {
      type: Object as PropType<ItemSummary>,
      required: true
    }
  },
  setup() {
    const { isOpen, toggle } = useOpener()
    useHideOnClickOutside(isOpen, toggle)

    return { isOpen, toggle, popupId }
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
