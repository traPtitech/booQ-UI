<template>
  <div :class="$style.container">
    <video ref="videoEle" @play="onResume" />
    <div v-if="inputs.length > 0">
      <select v-model="input">
        <option v-for="input in inputs" :key="input.deviceId" :value="input">
          {{ input.label }}
        </option>
      </select>
    </div>
    <p v-else>使用できるカメラが存在しません</p>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  watchEffect,
  shallowRef,
  onUnmounted
} from 'vue'
import {
  BrowserBarcodeReader,
  VideoInputDevice,
  NotFoundException
} from '@zxing/library'
import { useStore } from '/@/store'

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    changeCode: (_code: string) => true
  },
  setup(_, context) {
    const store = useStore()

    const codeReader = new BrowserBarcodeReader()
    const inputs = ref<VideoInputDevice[]>([])
    const input = ref<VideoInputDevice>()
    const videoEle = shallowRef<HTMLVideoElement>()

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
        store.commit.addToast({
          type: 'error',
          text: e.toString()
        })
      }
    }

    const start = async () => {
      const device = input.value
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
        store.commit.addToast({
          type: 'error',
          text: e.toString()
        })
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

    return { inputs, input, videoEle, onResume }
  }
})
</script>

<style lang="scss" module>
.container {
}
</style>
