<template>
  <div>
    <router-link :to="`/items/${item.id}`">
      <div :class="$style.header">
        <img :class="$style.img" :src="imgUrl" loading="lazy" />
        <h4 :class="$style.title">{{ item.name }}</h4>
      </div>
    </router-link>
    <div :class="$style.content">
      {{ text }}
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'
import { ItemSummary } from '/@/lib/apis'
import NoImg from '/@/assets/img/no-image.svg'
</script>

<script lang="ts" setup>
const props = defineProps<{
  text: string
  item: ItemSummary
}>()

const imgUrl = computed(() => props.item.imgUrl || NoImg)
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
