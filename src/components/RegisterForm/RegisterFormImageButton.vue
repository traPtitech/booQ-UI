<template>
  <button :class="$style.button">
    <mini-popup
      v-model:isOpen="isOpen"
      transition-transform-origin="bottom right"
    >
      <template #opener>
        <icon name="mdi:plus-box" :class="$style.icon" :size="36" />
      </template>
      <template #content>
        <normal-icon-button
          icon="mdi:file-upload"
          label="画像をアップロード"
          variant="primary"
          :class="$style.btn"
          @click="onUploadClick"
        />
        <normal-icon-button
          icon="mdi:link-plus"
          label="画像をURLで指定"
          variant="secondary"
          :class="$style.btn"
          @click="onInputUrlClick"
        />
      </template>
    </mini-popup>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '/@/components/UI/Icon.vue'
import MiniPopup from '/@/components/UI/MiniPopup.vue'
import NormalIconButton from '/@/components/UI/NormalIconButton.vue'
import useOpener from '/@/components/UI/use/opener'

export default defineComponent({
  name: 'RegisterFormImageButton',
  components: {
    Icon,
    MiniPopup,
    NormalIconButton
  },
  emits: {
    upload: () => true,
    inputUrl: () => true
  },
  setup(props, context) {
    const { isOpen, toggle } = useOpener()

    const onUploadClick = () => {
      context.emit('upload')
      toggle()
    }
    const onInputUrlClick = () => {
      context.emit('inputUrl')
      toggle()
    }
    return { isOpen, onUploadClick, onInputUrlClick }
  }
})
</script>

<style lang="scss" module>
.button {
  display: flex;
  padding: 0;
  margin: 0;
  justify-content: center;
  align-items: center;
  color: $color-text-secondary;
  background-color: transparent;
  border: none;
}
.btn {
  width: max-content;
  margin: 1rem auto;
  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
