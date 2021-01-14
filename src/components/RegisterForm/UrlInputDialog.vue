<template>
  <dialog-template @close="close">
    <h2 :class="$style.title">画像URLを指定する</h2>
    <form :class="$style.container" @submit.prevent="close">
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
import { defineComponent, ref } from 'vue'
import DialogTemplate from '/@/components/UI/DialogTemplate.vue'
import WideIconButton from '/@/components/UI/WideIconButton.vue'
import InputText from '/@/components/UI/InputText.vue'

export default defineComponent({
  name: 'UrlInputDialog',
  components: {
    DialogTemplate,
    InputText,
    WideIconButton
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    close: (_url: string) => true
  },
  setup(props, context) {
    const url = ref('')

    const close = () => {
      context.emit('close', url.value)
    }

    return { url, close }
  }
})
</script>

<style lang="scss" module>
.container {
  text-align: left;
}
.title {
  text-align: center;
}
.button {
  margin: auto;
  margin-top: 32px;
}
</style>
