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

<script lang="ts" setup>
import SubmitButtonNoStock from './SubmitButtonNoStock.vue'
import EditingSubmitButton from './SubmitButtonEdit.vue'
import WideIconButton from '/@/components/UI/WideIconButton.vue'

const props = defineProps<{
  isEdit: boolean
  count: number
  maxCount: number
}>()
</script>

<style lang="scss" module>
.button {
  width: 100%;
  margin: auto;
}
</style>
