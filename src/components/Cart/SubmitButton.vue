<template>
  <wide-icon-button
    v-if="disabled"
    icon="mdi:cancel"
    label="在庫がありません"
    variant="caution"
    :class="$style.button"
    :disabled="true"
  />
  <editing-submit-button v-else-if="isEdit" :count="count" />
  <wide-icon-button
    v-else
    icon="mdi:cart"
    label="カートに入れる"
    :class="$style.button"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import WideIconButton from '/@/components/UI/WideIconButton.vue'
import EditingSubmitButton from './EditingSubmitButton.vue'

export default defineComponent({
  name: 'SubmitButton',
  components: {
    WideIconButton,
    EditingSubmitButton
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      required: true
    },
    count: {
      type: Number,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="scss" module>
.button {
  width: 100%;
  margin: auto;
}
</style>
