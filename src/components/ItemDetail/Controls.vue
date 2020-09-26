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
import useLending from './use/lending'

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
$height: 36px;

.img {
  width: 100%;
}

.btnContainer {
  display: flex;
  align-items: center;
  padding: 8px;
  user-select: none;
  .btn {
    color: $color-primary;
    background-color: $color-background;
    transition: all 0.2s;
  }
  :hover.btn {
    background-color: $color-primary;
    color: $color-background;
  }
}

.btn {
  height: $height;
  width: 96px;
  margin-right: 8px;
  border-radius: $height / 2;
  border: solid 1px $color-primary;
}

.icon {
  cursor: pointer;
}
</style>
