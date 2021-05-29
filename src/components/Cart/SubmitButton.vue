<template>
  <submit-button-no-stock v-if="maxCount === 0" :class="$style.button" />
  <editing-submit-button
    v-else-if="isEdit"
    :is-delete="count === 0"
    :class="$style.button"
  />
  <wide-icon-button
    v-else
    icon="mdi:cart"
    label="カートに入れる"
    :class="$style.button"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SubmitButtonNoStock from './SubmitButtonNoStock.vue'
import EditingSubmitButton from './SubmitButtonEdit.vue'
import WideIconButton from '/@/components/UI/WideIconButton.vue'

export default defineComponent({
  name: 'SubmitButton',
  components: {
    SubmitButtonNoStock,
    EditingSubmitButton,
    WideIconButton
  },
  props: {
    isEdit: {
      type: Boolean,
      required: true
    },
    count: {
      type: Number,
      required: true
    },
    maxCount: {
      type: Number,
      required: true
    }
  }
})
</script>

<style lang="scss" module>
.button {
  width: 100%;
  margin: auto;
}
</style>
