<template>
  <button
    :class="$style.button"
    :disabled="itemInCart.length === 0"
    @click="toggle"
  >
    <icon name="mdi:cart" />
    <cart-dialog v-if="isOpen" @close="toggle" :items="itemInCart" />
  </button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import Icon from '/@/components/UI/Icon.vue'
import CartDialog from './CartDialog.vue'
import useOpener from '/@/use/opener'
import { useStore } from '/@/store'

export default defineComponent({
  name: 'CartIcon',
  components: {
    Icon,
    CartDialog
  },
  setup() {
    const store = useStore()
    const itemInCart = computed(() => store.state.itemInCart)
    const { isOpen, toggle } = useOpener()
    return { isOpen, toggle, itemInCart }
  }
})
</script>

<style lang="scss" module>
.button {
  border: none;
  padding: 0;
  background-color: transparent;
  appearance: none;
  &:not(:disabled) {
    color: $color-primary;
  }
}
</style>
