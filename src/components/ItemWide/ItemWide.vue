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
import { computed } from 'vue';
import { ItemSummary } from '/@/lib/apis'
import NoImg from '/@/assets/img/no-image.svg'
</script>

<script lang="ts" setup>


const props = defineProps<{
    item: ItemSummary
}>();

const imgUrl = computed(() => props.item.imgUrl || NoImg)
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
