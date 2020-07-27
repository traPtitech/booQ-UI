<template>
  <div :class="$style.wrapper" @click="onClick">
    <img :class="$style.img" :src="imgUrl" />
    <div :class="$style.container">
      <div :class="$style.name">{{ item.name }}</div>
      <div :class="$style.main">
        <div :class="$style.likeCount">
          <icon :class="$style.icon" name="thumbs-up" />{{ likeCount }}
        </div>
        <div :class="$style.owners">
          {{ item.owners.map(owner => `@${owner.user.name}`).join() }}
        </div>
        <slot name="controls" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ItemSummary } from '/@/lib/apis'
import Icon from '/@/components/UI/Icon.vue'
import NoImg from '/@/assets/img/no-image.svg'

export default defineComponent({
  name: 'Item',
  components: {
    Icon
  },
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
    const likeCount = computed(() =>
      props.item.likeCounts > 0 ? props.item.likeCounts : ''
    )
    const onClick = () => {
      router.push(`/items/${props.item.id}`)
    }

    return { imgUrl, likeCount, onClick }
  }
})
</script>

<style lang="scss" module>
.wrapper {
  position: relative;
  width: 100%;
  &::before {
    content: '';
    display: block;
    // B6判
    padding-top: (182 / 128) * 100%;
  }
  cursor: pointer;
  &:hover {
    filter: opacity(0.8);
  }
}
.container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: calc(100% - 16px);
  padding: 8px;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(2px);
  word-break: break-all;
}
.img {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.main {
  display: flex;
  align-items: center;
}
.name {
  font-weight: bold;
}
.likeCount {
  min-width: max-content;
  margin-right: 4px;
}
.owners {
  margin-left: auto;
}
.icon {
  vertical-align: middle;
}
</style>
