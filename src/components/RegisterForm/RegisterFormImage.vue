<template>
  <div :class="$style.container">
    <div>物品画像</div>
    <div :class="$style.imgContainer">
      <img :class="$style.img" :src="noImg" />
      <register-form-image-button
        :class="$style.addButton"
        @upload="uploadImage"
        @input-url="toggleUrlInputDialog"
      />
      <url-input-dialog v-if="isUrlInputDialogOpen" @close="setImageUrl" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import noImg from '/@/assets/img/no-image.svg'
import RegisterFormImageButton from './RegisterFormImageButton.vue'
import useOpener from '/@/components/UI/use/opener'
import UrlInputDialog from './UrlInputDialog.vue'

export default defineComponent({
  name: 'RegisterFormImage',
  components: {
    RegisterFormImageButton,
    UrlInputDialog
  },
  setup() {
    const {
      isOpen: isUrlInputDialogOpen,
      toggle: toggleUrlInputDialog
    } = useOpener()

    const uploadImage = () => {
      // WIP
    }
    const setImageUrl = () => {
      toggleUrlInputDialog()
      // WIP
    }

    return {
      noImg,
      uploadImage,
      isUrlInputDialogOpen,
      toggleUrlInputDialog,
      setImageUrl
    }
  }
})
</script>

<style lang="scss" module>
$border-radius: 2px;

.container {
  color: $color-text-secondary;
}
.imgContainer {
  position: relative;
  width: 100%;
  max-width: 300px;
  &::before {
    content: '';
    display: block;
    // B6判
    padding-top: $b6-padding-top;
  }
  border-radius: $border-radius;
}
.img {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: $border-radius;
}
.addButton {
  position: absolute;
  right: 0.5rem;
  bottom: 0.5rem;
}
</style>
