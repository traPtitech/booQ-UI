<template>
  <div
    :class="$style.wrapper"
    @click="onClick"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <img :class="$style.img" :src="imgUrl" />
    <div :class="$style.container">
      <div ref="titleEle" :class="$style.name" @transitionend="onTransitionEnd">
        {{ item.name }}
      </div>
      <div :class="$style.main">
        <div :class="$style.likeCount">
          <icon :class="$style.icon" name="thumbs-up" :size="20" />
          {{ likeCount }}
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
import { defineComponent, PropType, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ItemSummary } from '/@/lib/apis'
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

    const titleEle = ref<HTMLElement | null>(null)
    const { isHovered, onMouseEnter, onMouseLeave } = useHover()
    const { onTransitionEnd } = useTitleTransition(isHovered, titleEle)

    return {
      imgUrl,
      likeCount,
      onClick,
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
  width: 100%;
  &::before {
    content: '';
    display: block;
    // B6判
    padding-top: (182 / 128) * 100%;
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
  width: calc(100% - 16px);
  padding: 8px;
  background: rgba(255, 255, 255, 0.5);
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
.likeCount {
  min-width: max-content;
  margin-right: 4px;
}
.owners {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: right;
  margin-left: auto;
}
.icon {
  vertical-align: bottom;
}
</style>
