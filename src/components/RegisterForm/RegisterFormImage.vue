<template>
  <div :class="$style.container">
    <div>物品画像</div>
    <div :class="$style.imgContainer" :data-is-uploading="isUploading">
      <img :class="$style.img" :src="imgUrl" />
      <div v-if="isUploading" :class="$style.spinner" />
      <register-form-image-button
        :class="$style.addButton"
        :is-uploading="isUploading"
        :is-clear-button-shown="modelValue !== ''"
        @upload="uploadImage"
        @input-url="toggleUrlInputDialog"
        @clear-url="clearUrl"
      />
      <url-input-dialog
        v-if="isUrlInputDialogOpen"
        :init-url="modelValue"
        @close="setImageUrl"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue';
import noImg from '/@/assets/img/no-image.svg'
import useOpener from '/@/use/opener'
import useImageUpload from './use/imageUpload'
</script>

<script lang="ts" setup>
import RegisterFormImageButton from './RegisterFormImageButton.vue';
import UrlInputDialog from './UrlInputDialog.vue';

const props = defineProps<{
    modelValue: string
}>();

const emit = defineEmits<{
    (e: "update:modelValue", _v: string): void
}>();

const { isOpen: isUrlInputDialogOpen, toggle: toggleUrlInputDialog } =
  useOpener()
const { isUploading, startUpload } = useImageUpload(url => {
  context.emit('update:modelValue', url)
})

const uploadImage = () => {
  startUpload()
}
const setImageUrl = (url: string) => {
  toggleUrlInputDialog()
  context.emit('update:modelValue', url)
}
const clearUrl = () => {
  context.emit('update:modelValue', '')
}

const imgUrl = computed(() =>
  props.modelValue !== '' ? props.modelValue : noImg
)
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
  margin: 0.25em 0;
  &::before {
    content: '';
    display: block;
    // B6判
    padding-top: $b6-padding-top;
  }
  border-radius: $border-radius;
  &[data-is-uploading='true'] {
    cursor: wait;
  }
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
.spinner {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 3rem;
  height: 3rem;
  margin: auto;
  border: 0.25rem solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.addButton {
  position: absolute;
  right: 0.5rem;
  bottom: 0.5rem;
}
</style>
