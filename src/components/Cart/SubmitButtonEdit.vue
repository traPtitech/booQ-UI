<template>
  <wide-icon-button
    v-if="!isDelete"
    icon="mdi:arrow-right-bold-circle"
    label="変更する"
  />
  <wide-icon-button
    v-else
    icon="mdi:arrow-right-bold-circle"
    label="削除する"
    variant="caution"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import WideIconButton from '/@/components/UI/WideIconButton.vue'

export default defineComponent({
  name: 'SubmitButtonEdit',
  components: {
    WideIconButton
  },
  props: {
    isDelete: {
      type: Boolean,
      default: false
    }
  }
})
</script>
