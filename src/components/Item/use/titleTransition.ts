import { Ref, watchEffect } from 'vue'

const lines = '3'

const getLineClampedHeight = ($ref: HTMLElement) => {
  const width = $ref.clientWidth
  const $ninja = $ref.cloneNode(true) as HTMLElement
  $ninja.style.height = (null as unknown) as string
  $ninja.style.width = `${width}px`
  $ninja.style.webkitLineClamp = lines
  $ninja.style.position = 'fixed'
  $ninja.style.visibility = 'hidden'
  document.body.append($ninja)
  const height = $ninja.clientHeight
  $ninja.remove()
  return height
}

const useTitleTransition = (
  isExpanded: Ref<boolean>,
  $title: Ref<HTMLElement | null>
): { onTransitionEnd: () => void } => {
  watchEffect(() => {
    if (!$title.value) return
    $title.value.style.height = isExpanded.value
      ? `${$title.value.scrollHeight}px`
      : `${getLineClampedHeight($title.value)}px`
  })

  const onTransitionEnd = () => {
    if (!$title.value) return
    $title.value.style.webkitLineClamp = isExpanded.value ? 'initial' : lines
  }

  return { onTransitionEnd }
}

export default useTitleTransition
