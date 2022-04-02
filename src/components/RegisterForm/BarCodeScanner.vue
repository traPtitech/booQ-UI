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

<script lang="ts" setup>
import { ref, onMounted, watchEffect, shallowRef, onUnmounted } from 'vue'
import type { VideoInputDevice } from '@zxing/library'
import { BrowserBarcodeReader, NotFoundException } from '@zxing/library'
import { useToast } from '/@/store/toast'
import { checkDigit, checkISBN } from '/@/lib/barCode'

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
        emit('changeCode', text)
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
