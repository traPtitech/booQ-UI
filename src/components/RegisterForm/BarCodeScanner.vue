<template>
  <div :class="$style.container">
    <video ref="videoEle" @play="onResume" />
    <div v-if="inputs.length > 0">
      <select v-model="selectInput">
        <option v-for="input in inputs" :key="input.deviceId" :value="input">
          {{ input.label }}
        </option>
      </select>
    </div>
    <p v-else>使用できるカメラが存在しません</p>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, watchEffect, shallowRef, onUnmounted } from 'vue'
import {
  BrowserBarcodeReader,
  VideoInputDevice,
  NotFoundException
} from '@zxing/library'
import { useToast } from '/@/store/toast'

const checkDigit = (isbn: string) => {
  const digits = isbn.split('').map(n => +n)
  const lastDigit = digits.pop()
  if (lastDigit === undefined) return false

  const remainder =
    digits.reduce((acc, digit, i) => acc + digit * (i % 2 === 0 ? 1 : 3)) % 10
  const diff = remainder === 0 ? 0 : 10 - remainder
  return lastDigit === diff
}

const checkISBN = (isbn: string) =>
  isbn.slice(0, 3) === '978' || isbn.slice(0, 3) === '979'
</script>

<script lang="ts" setup>
const emit = defineEmits<{
  (e: 'changeCode', _code: string): void
}>()

const toastStore = useToast()

const codeReader = new BrowserBarcodeReader()
const inputs = ref<VideoInputDevice[]>([])
const selectInput = ref<VideoInputDevice>()
const videoEle = shallowRef<HTMLVideoElement>()

const initialize = async () => {
  try {
    const videoInputDevices = await codeReader.getVideoInputDevices()
    inputs.value = videoInputDevices
    if (videoInputDevices.length > 0) {
      selectInput.value = videoInputDevices[0]
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
    toastStore.addToast({
      type: 'error',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      text: (e as any).toString()
    })
  }
}

const start = async () => {
  const device = selectInput.value
  if (!device || !videoEle.value) return
  try {
    await codeReader.decodeFromVideoDevice(
      device.deviceId,
      videoEle.value,
      (result, err) => {
        if (!result) {
          if (!(err instanceof NotFoundException)) {
            // eslint-disable-next-line no-console
            console.error(err)
          }
          return
        }
        const text = result.getText()
        if (!checkDigit(text) || !checkISBN(text)) return
        context.emit('changeCode', text)
      }
    )
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
    toastStore.addToast({
      type: 'error',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      text: (e as any).toString()
    })
  }
}
const stop = () => {
  codeReader.reset()
}

const onResume = (e: Event) => {
  if (
    !(e.target as HTMLVideoElement).paused &&
    selectInput.value !== undefined
  ) {
    // https://github.com/zxing-js/library/issues/336
    // initialize()
  }
}

onMounted(() => {
  initialize()
})
onUnmounted(() => {
  stop()
})
watchEffect(() => {
  stop()
  start()
})
</script>

<style lang="scss" module>
.container {
}
</style>
