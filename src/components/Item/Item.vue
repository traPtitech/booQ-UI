<template>
  <router-link
    :class="$style.wrapper"
    :to="`/items/${item.id}`"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <img :class="$style.img" :src="imgUrl" />
    <div :class="$style.container">
      <div ref="titleEle" :class="$style.name" @transitionend="onTransitionEnd">
        {{ item.name }}
      </div>
      <div :class="$style.main">
        <div :class="$style.owners">
          {{ item.owners.map(owner => `@${owner.user.name}`).join() }}
        </div>
        <div :class="$style.like" @click.prevent="toggleLike">
          <icon v-if="!isLiked" name="mdi:heart-outline" :size="20" />
          <icon v-else name="mdi:heart" :size="20" :class="$style.liked" />
          {{ likeCount }}
        </div>
        <slot name="controls" />
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref, shallowRef } from 'vue'
import apis, { ItemSummary } from '/@/lib/apis'
import Icon from '/@/components/UI/Icon.vue'
import NoImg from '/@/assets/img/no-image.svg'
import useTitleTransition from './use/titleTransition'

const useHover = () => {
  const isHovered = ref(false)
  const onMouseEnter = () => {
    isHovered.value = true
  }
  const onMouseLeave = () => {
    isHovered.value = false
  }
  return { isHovered, onMouseEnter, onMouseLeave }
}

const useLike = (props: { item: ItemSummary }) => {
  const isLiked = ref(props.item.isLiked)
  // 自分がいいねしたときのlikeCount
  const maxCount = computed(
    () => props.item.likeCounts + Number(!props.item.isLiked)
  )
  const likeCount = computed(
    () => maxCount.value - Number(!isLiked.value) || ''
  )
  const toggleLike = async () => {
    if (isLiked.value) {
      await apis.removeLike(props.item.id)
      isLiked.value = false
    } else {
      await apis.addLike(props.item.id)
      isLiked.value = true
    }
  }
  return { isLiked, likeCount, toggleLike }
}

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
    const imgUrl = computed(() => props.item.imgUrl || NoImg)
    const { isLiked, likeCount, toggleLike } = useLike(props)

    const titleEle = shallowRef<HTMLElement | null>(null)
    const { isHovered, onMouseEnter, onMouseLeave } = useHover()
    const { onTransitionEnd } = useTitleTransition(isHovered, titleEle)

    return {
      imgUrl,
      isLiked,
      likeCount,
      toggleLike,
      onMouseEnter,
      onMouseLeave,
      onTransitionEnd,
      titleEle
    }
  }
})
</script>

<style lang="scss" module>
$border-radius: 2px;

.wrapper {
  position: relative;
  display: block;
  width: 100%;
  &::before {
    content: '';
    display: block;
    // B6判
    padding-top: $b6-padding-top;
  }
  border-radius: $border-radius;
  cursor: pointer;
  box-shadow: 0 0 0px 2px transparent;
  &:hover {
    box-shadow: 0 0 0px 2px $color-primary;
  }
  transition: 0.2s all ease-in-out;
}
.container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 12px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(2px);
  border-bottom-left-radius: $border-radius;
  border-bottom-right-radius: $border-radius;
  overflow: hidden;
}
.img {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: $border-radius;
}
.main {
  display: flex;
  align-items: center;
  margin-top: 8px;
}
.name {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  word-break: break-all;
  font-weight: bold;
  transition: 0.2s all ease-in-out;
}
.like {
  min-width: max-content;
  display: flex;
  margin-left: auto;
  align-items: center;
}
.owners {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: right;
}
.icon {
  vertical-align: bottom;
}
.liked {
  color: $color-liked;
}
</style>
