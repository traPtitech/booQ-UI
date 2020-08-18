<template>
  <div>
    <img :class="$style.img" :src="imgUrl" />
    <div :class="$style.btnContainer">
      <icon-button icon="arrow-down-bold-circle" label="借りる" width="100%" />
      <icon-button icon="arrow-up-bold-circle" label="返す" width="100%" />
      <icon name="dots-horizontal" :size="30" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '/@/components/UI/Icon.vue'
import IconButton from '/@/components/UI/IconButton.vue'

export default defineComponent({
  name: 'Controls',
  components: { Icon, IconButton },
  props: {
    imgUrl: {
      type: String,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="scss" module>
.img {
  width: 100%;
}

.btnContainer {
  display: flex;
}
</style>
