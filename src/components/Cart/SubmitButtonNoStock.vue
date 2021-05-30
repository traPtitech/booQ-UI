<template>
  <wide-icon-button
    icon="mdi:cancel"
    label="在庫がありません"
    variant="caution"
    disabled
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import WideIconButton from '/@/components/UI/WideIconButton.vue'

export default defineComponent({
  name: 'SubmitButtonNoStock',
  components: {
    WideIconButton
  }
})
</script>
