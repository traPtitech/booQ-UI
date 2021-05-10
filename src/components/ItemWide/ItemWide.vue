<template>
  <router-link :class="$style.container" :to="`/items/${item.id}`">
    <img :class="$style.img" :src="imgUrl" />
    <div :class="$style.content">
      <h3 :class="$style.title">{{ item.name }}</h3>
      <slot />
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { ItemSummary } from '/@/lib/apis'
import NoImg from '/@/assets/img/no-image.svg'

export default defineComponent({
  name: 'ItemWide',
  props: {
    item: {
      type: Object as PropType<ItemSummary>,
      required: true
    }
  },
  setup(props) {
    const imgUrl = computed(() => props.item.imgUrl || NoImg)
    return { imgUrl }
  }
})
</script>

<style lang="scss" module>
.container {
  display: flex;
  cursor: pointer;
}
.img {
  width: 6rem;
  margin-right: 1rem;
}
.content {
  text-align: left;
}
.title {
  margin: 0;
  margin-bottom: 1rem;
  font-weight: bold;
  word-break: break-all;
}
</style>
