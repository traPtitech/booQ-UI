<template>
  <div :class="$style.container" @click="onClick">
    <img :class="$style.img" :src="imgUrl" />
    <div :class="$style.content">
      <h3 :class="$style.title">{{ item.name }}</h3>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { useRouter } from 'vue-router'
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
    const router = useRouter()

    const imgUrl = computed(() => props.item.imgUrl || NoImg)
    const onClick = () => {
      router.push(`/items/${props.item.id}`)
    }
    return { imgUrl, onClick }
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
