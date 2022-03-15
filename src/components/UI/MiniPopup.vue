<template>
  <!-- 外からpositionを指定されたとき用に二重でくるむ -->
  <div>
    <div :class="$style.container">
      <div
        :class="$style.opener"
        :data-is-disabled="disabled"
        @click.stop="toggle"
      >
        <slot name="opener" />
      </div>
      <transition name="mini-popup">
        <div v-if="isOpen" :id="popupId" :class="$style.popup" :style="style">
          <slot name="content" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, onBeforeUnmount, onMounted, Ref } from 'vue'

const popupId = 'mini-popup'

const useHideOnClickOutside = (isOpen: Ref<boolean>, toggle: () => void) => {
  const onClickBody = (e: MouseEvent) => {
    // 外側をクリックしたときは閉じる動作しかしない
    if (!isOpen.value) return
    if (!e.target) return

    const popupElement = (e.target as Element).closest(`#${popupId}`)
    // クリックした箇所の親にポップアップを持たないとき
    if (!popupElement) {
      toggle()
    }
  }
  onMounted(() => {
    document.body.addEventListener('click', onClickBody)
  })
  onBeforeUnmount(() => {
    document.body.removeEventListener('click', onClickBody)
  })
}
</script>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    isOpen: boolean
    disabled?: boolean
    transitionTransformOrigin: 'top right' | 'bottom right'
  }>(),
  {
    disabled: false
  }
)

const emit = defineEmits<{
  (e: 'update:isOpen', _v: boolean): void
}>()

const localIsOpen = computed({
  get: () => props.isOpen,
  set: v => {
    emit('update:isOpen', v)
  }
})
const toggle = () => {
  if (props.disabled) return
  localIsOpen.value = !localIsOpen.value
}

useHideOnClickOutside(localIsOpen, toggle)

interface Style {
  top?: '0'
  left?: '0'
  bottom?: '0'
  right?: '0'
  transformOrigin: string
}

const style = computed(() => {
  const origin = props.transitionTransformOrigin
  const s: Style = { transformOrigin: props.transitionTransformOrigin }
  if (origin.includes('top')) {
    s.top = '0'
  }
  if (origin.includes('left')) {
    s.left = '0'
  }
  if (origin.includes('bottom')) {
    s.bottom = '0'
  }
  if (origin.includes('right')) {
    s.right = '0'
  }
  return s
})
</script>

<style lang="scss" module>
.container {
  position: relative;
}
.opener {
  cursor: pointer;
  &[data-is-disabled='true'] {
    cursor: not-allowed;
  }
}
.popup {
  position: absolute;
  padding: 1rem;
  background: $color-background;
  border: 1px solid $color-text-secondary;
  border-radius: 1rem;
  z-index: 1;
}
</style>
