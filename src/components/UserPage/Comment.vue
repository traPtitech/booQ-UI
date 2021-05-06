<template>
  <div :class="$style.container">
    <div :class="$style.header" @click="onClick">
      <img :class="$style.img" :src="imgUrl" />
      <h4 :class="$style.title">{{ item.name }}</h4>
    </div>
    <div :class="$style.content">
      {{ text }}
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
    const router = useRouter()

    const imgUrl = computed(() =>
      props.item.imgUrl ? props.item.imgUrl : NoImg
    )
    const onClick = () => {
      router.push(`/items/${props.item.id}`)
    }
    return { imgUrl, onClick }
  }
})
</script>

<style lang="scss" module>
.container {
  cursor: pointer;
}
.img {
  width: 2rem;
  height: auto;
  margin-bottom: auto;
}
.content {
  text-align: left;
}
.header {
  display: flex;
  margin-bottom: 0.5rem;
}
.title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  margin: 0.2rem 0 0 0.5rem;
  word-break: break-all;
  overflow: hidden;
}
</style>
