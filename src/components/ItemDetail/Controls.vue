<template>
  <div>
    <img :class="$style.img" :src="imgUrl" />
    <div :class="$style.btnContainer">
      <icon-button
        icon="arrow-down-bold-circle"
        label="借りる"
        :class="$style.btn"
        @click="borrowItem"
      />
      <icon-button
        icon="arrow-up-bold-circle"
        label="返す"
        :class="$style.btn"
        @click="returnItem"
      />
      <icon
        name="dots-horizontal"
        :size="32"
        :class="$style.icon"
        @click="toggleOther"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '/@/components/UI/Icon.vue'
import IconButton from '/@/components/UI/IconButton.vue'
import useLending from './use/useLending'

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
    const { borrowItem, returnItem, toggleOther } = useLending()
    return { borrowItem, returnItem, toggleOther }
  }
})
</script>

<style lang="scss" module>
.img {
  width: 100%;
}

.btnContainer {
  display: flex;
  align-items: center;
  padding: 8px;
  user-select: none;
}

.btn {
  height: 36px;
  width: 96px;
  color: $color-primary;
  margin-right: 8px;
  border-radius: 18px;
  border: solid 1px $color-primary;
}

.icon {
  cursor: pointer;
}
</style>
