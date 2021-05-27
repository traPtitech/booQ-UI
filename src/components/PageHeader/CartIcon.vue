<template>
  <icon v-if="cart.length === 0" name="mdi:cart" />
  <router-link v-else to="/cart">
    <icon name="mdi:cart" :class="$style.enable" />
  </router-link>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import Icon from '/@/components/UI/Icon.vue'
import { useStore } from '/@/store'

export default defineComponent({
  name: 'CartIcon',
  components: {
    Icon
  },
  setup() {
    const store = useStore()
    const cart = computed(() => store.state.cart)
    return { cart }
  }
})
</script>

<style lang="scss" module>
.enable {
  color: $color-primary;
}
</style>
