<template>
  <div :class="$style.container" @click="onClick">
    <div :class="$style.header">
      <img :class="$style.img" :src="imgUrl" />
      <h4 :class="$style.title">{{ item.name }}</h4>
    </div>
    <div :class="$style.content">
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
}
.content {
  text-align: left;
}
.header {
  display: flex;
  margin-bottom: 0.5rem;
}
.title {
  margin: 0.5rem 0 0 0.5rem;
}
</style>
