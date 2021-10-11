<template>
  <div>
    <router-link :to="`/items/${item.id}`">
      <div :class="$style.header">
        <img :class="$style.img" :src="imgUrl" />
        <h4 :class="$style.title">{{ item.name }}</h4>
      </div>
    </router-link>
    <div :class="$style.content">
      {{ text }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { ItemSummary } from '/@/lib/apis'
import NoImg from '/@/assets/img/no-image.svg'

export default defineComponent({
  name: 'Comment',
  props: {
    text: {
      type: String,
      required: true
    },
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
.img {
  width: 2rem;
}
.content {
  text-align: left;
}
.header {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  cursor: pointer;
}
.title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  margin: 0;
  margin-left: 0.5rem;
  word-break: break-all;
  overflow: hidden;
}
</style>
