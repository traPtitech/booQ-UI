<template>
  <submit-button-no-stock v-if="maxCount === 0" :class="$style.button" />
  <wide-icon-button
    v-else
    icon="mdi:arrow-right-bold-circle"
    label="次にすすむ"
    :class="$style.button"
    @click="emit('clickGoCart')"
  />
  <div :class="$style.or">または</div>
  <wide-icon-button
    icon="mdi:cart"
    label="まだ借りる"
    type="submit"
    :class="$style.button"
    @click="emit('clickGoBack')"
  />
  <div :class="$style.description">
    「まだ借りる」でまとめて目的や返却日を入力できます
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SubmitButtonNoStock from './SubmitButtonNoStock.vue'
import WideIconButton from '/@/components/UI/WideIconButton.vue'

export default defineComponent({
  name: 'SubmitButtonWithContinue',
  components: {
    SubmitButtonNoStock,
    WideIconButton
  },
  props: {
    maxCount: {
      type: Number,
      required: true
    }
  },
  emits: {
    clickGoCart: () => true,
    clickGoBack: () => true
  },
  setup(props, { emit }) {
    return { emit }
  }
})
</script>

<style lang="scss" module>
.button {
  width: 100%;
  margin: auto;
}
.or {
  margin: 0.75rem 0;
  color: $color-text-secondary;
  font-size: 0.75rem;
  text-align: center;
}
.description {
  opacity: 0.5;
  margin-top: 0.5rem;
  font-size: 0.75rem;
}
</style>
