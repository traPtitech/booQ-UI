<template>
  <div :class="$style.container">
    <video ref="$video" @play="onResume" />
    <div v-if="inputs.length > 0">
      <select v-model="input">
        <option v-for="input in inputs" :key="input.deviceId">
          {{ input.label }}
        </option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watchEffect } from 'vue'
import { BrowserBarcodeReader, VideoInputDevice } from '@zxing/library'

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

export default defineComponent({
  name: 'BarCodeScanner',
  emits: {
    search: null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'change-code': (code: string) => true
  },
  setup(_, context) {
    const codeReader = new BrowserBarcodeReader()
    const inputs = ref<VideoInputDevice[]>([])
    const input = ref<VideoInputDevice>()

    const initialize = async () => {
      try {
        const videoInputDevices = await codeReader.getVideoInputDevices()
        inputs.value = videoInputDevices
        if (videoInputDevices.length > 0) {
          input.value = videoInputDevices[0]
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e)
        // TODO
      }
    }

    onMounted(() => {
      initialize()
    })

    const $video = ref()

    const start = async () => {
      const device = input.value
      if (!device || !$video.value) return
      try {
        await codeReader.decodeFromVideoDevice(
          device.deviceId,
          $video.value,
          (result, err) => {
            if (!result) {
              // eslint-disable-next-line no-console
              console.error(err)
              return
            }
            const text = result.getText()
            if (!checkDigit(text) || !checkISBN(text)) return
            context.emit('change-code', result.getText())
            context.emit('search')
          }
        )
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e)
        // TODO
      }
    }
    const stop = () => {
      codeReader.reset()
    }

    const onResume = (e: Event) => {
      if (!(e.target as HTMLVideoElement).paused && input.value !== undefined) {
        // https://github.com/zxing-js/library/issues/336
        // initialize()
      }
    }

    watchEffect(() => {
      stop()
      start()
    })

    return { inputs, input, $video, onResume }
  }
})
</script>

<style lang="scss" module>
.container {
}
</style>
