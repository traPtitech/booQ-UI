<template>
  <dialog-template title="画像URLを指定する" @close="close">
    <form @submit.prevent="close">
      <input-text v-model="url" label="画像URL" />
      <wide-icon-button
        icon="mdi:link-plus"
        label="完了する"
        variant="secondary"
        type="submit"
        :class="$style.button"
      />
    </form>
  </dialog-template>
</template>

<script lang="ts">
import { ref } from 'vue'
</script>

<script lang="ts" setup>
import DialogTemplate from '/@/components/UI/DialogTemplate.vue'
import WideIconButton from '/@/components/UI/WideIconButton.vue'
import InputText from '/@/components/UI/InputText.vue'

const props = withDefaults(
  defineProps<{
    initUrl?: string
  }>(),
  {
    initUrl: ''
  }
)

const emit = defineEmits<{
  (e: 'close', _url: string): void
}>()

const url = ref(props.initUrl)

const close = () => {
  emit('close', url.value)
}
</script>

<style lang="scss" module>
.button {
  margin: auto;
  margin-top: 32px;
}
</style>
