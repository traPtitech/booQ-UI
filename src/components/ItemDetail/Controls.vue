<template>
  <div :class="$style.container">
    <img :class="$style.img" :src="imgUrl" />
    <div :class="$style.btnContainer">
      <button>aa</button>
      <button>bb</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Controls',
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
.container {
  width: 432px;
}

.img {
  width: 100%;
}

.btnContainer {
  display: flex;
}
</style>
