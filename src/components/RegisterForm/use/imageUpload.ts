import { Ref, ref } from 'vue'
import apis, { ModelFile } from '/@/lib/apis'

const acceptImageType = ['image/jpeg', 'image/png'].join()

const useImageSelect = (onSelect: (file: File) => void) => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = acceptImageType

  const onChange = () => {
    if (input.files && input.files[0]) {
      onSelect(input.files[0])
    }
  }

  input.addEventListener('change', onChange)

  const startSelect = () => {
    input.click()
  }

  const destroy = () => {
    input.removeEventListener('change', onChange)
  }

  return { startSelect, destroy }
}

const useImageUpload = (
  onUpload: (url: string) => void
): {
  isUploading: Ref<boolean>
  startUpload: () => void
} => {
  const isUploading = ref(false)

  const { startSelect, destroy } = useImageSelect(async file => {
    isUploading.value = true

    try {
      const res = await apis.postFile(file)
      onUpload(location.origin + (res.data as ModelFile).url)
      destroy()
    } finally {
      isUploading.value = false
    }
  })
  return { isUploading, startUpload: startSelect }
}

export default useImageUpload
