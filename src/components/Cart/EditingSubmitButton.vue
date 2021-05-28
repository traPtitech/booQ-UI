<template>
  <wide-icon-button
    v-if="count !== 0"
    icon="mdi:arrow-right-bold-circle"
    label="変更する"
    :class="$style.button"
  />
  <wide-icon-button
    v-else
    icon="mdi:arrow-right-bold-circle"
    label="削除する"
    variant="caution"
    :class="$style.button"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import WideIconButton from '/@/components/UI/WideIconButton.vue'

export default defineComponent({
  name: 'EditingSubmitButton',
  components: {
    WideIconButton
  },
  props: {
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
