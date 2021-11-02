<template>
  <a-icon v-if="cartLength === 0" name="mdi:cart" :class="$style.disable" />
  <router-link v-else to="/cart">
    <a-icon name="mdi:cart" :class="$style.enable" />
  </router-link>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import AIcon from '/@/components/UI/AIcon.vue'
import { useStore } from '/@/store'

export default defineComponent({
  name: 'CartIcon',
  components: {
    AIcon
  },
  setup() {
    const store = useStore()
    const cartLength = computed(() => store.state.cart.length)
    return { cartLength }
  }
})
</script>

<style lang="scss" module>
.enable {
  color: $color-primary;
}
.disable {
  opacity: 0.5;
}
</style>
