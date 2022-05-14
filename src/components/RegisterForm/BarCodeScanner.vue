<template>
  <div :class="$style.container">
    <video ref="videoEle" @play="onResume" />
    <div v-if="deviceOptions.length > 0">
      <a-selector v-model="serectedDevice" :options="deviceOptions" />
    </div>
    <p v-else>使用できるカメラが存在しません</p>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watchEffect, shallowRef, onUnmounted } from 'vue'
import { BrowserBarcodeReader, NotFoundException } from '@zxing/library'
import { useToast } from '/@/store/toast'
import { checkDigit, checkISBN } from '/@/lib/barCode'
import ASelector from '../UI/ASelector.vue'

const emit = defineEmits<{
  (e: 'changeCode', _code: string): void
}>()

const toastStore = useToast()

const codeReader = new BrowserBarcodeReader()
const videoEle = shallowRef<HTMLVideoElement>()
const deviceOptions = ref<Device[]>([])
type Device = {
  key: string
  label: string
}
const serectedDevice = ref(deviceOptions.value[0]) ?? { key: '', label: '' }

const initialize = async () => {
  try {
    const videoInputDevices = await codeReader.getVideoInputDevices()
    if (videoInputDevices.length > 0) {
      for (let i = 0; i < videoInputDevices.length; i++) {
        deviceOptions.value[i] = {
          key: videoInputDevices[i]?.deviceId ?? '',
          label: videoInputDevices[i]?.label ?? 'no device name'
        }
      }
      serectedDevice.value = deviceOptions.value[0]
    }
    serectedDevice.value = deviceOptions.value[0]
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
  if (
    !serectedDevice.value ||
    serectedDevice.value.key === '' ||
    !videoEle.value
  )
    return
  try {
    await codeReader.decodeFromVideoDevice(
      serectedDevice.value.key,
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
    serectedDevice.value !== undefined
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
