import type { Ref } from 'vue'
import { computed, ref } from 'vue'
import type { FormState } from './useFormState'
import axios from 'axios'

interface BookData {
  name: string
  description: string
  imgUrl: string
}

const fetchFromOpenBd = async (code: string): Promise<BookData | null> => {
  const res = await axios.get(`https://api.openbd.jp/v1/get?isbn=${code}`)
  if (!res.data || !res.data[0]) {
    throw new Error('No data')
  }

  const data = res.data[0].onix
  return {
    name: data.DescriptiveDetail.TitleDetail.TitleElement.TitleText.content,
    description: data.CollateralDetail.TextContent?.[0]?.Text,
    imgUrl:
      data.CollateralDetail.SupportingResource?.[0]?.ResourceVersion?.[0]
        ?.ResourceLink
  }
}

const fetchFromGoogleBooks = async (code: string): Promise<BookData | null> => {
  const res = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=isbn:${code}&maxResults=1`
  )
  if (!res.data || res.data.totalItems !== 0) {
    throw new Error('No data')
  }

  const data = res.data.items[0].volumeInfo
  return {
    name: data.title,
    description: data.description,
    imgUrl: data.imageLinks.thumbnail
  }
}

const fetchFromCodeFromAny = async (code: string): Promise<BookData | null> => {
  const fetchFuncs = [fetchFromOpenBd, fetchFromGoogleBooks]

  try {
    const ress = await Promise.any(fetchFuncs.map(fetchFunc => fetchFunc(code)))
    return ress
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
    return null
  }
}

const useCompleteFromCode = (
  formState: FormState
): {
  isCompleting: Ref<boolean>
  isValidCode: Ref<boolean>
  completeFromCode: () => void
} => {
  const isCompleting = ref(false)

  const isValidCode = computed(
    () => formState.code.length === 10 || formState.code.length === 13
  )

  const completeFromCode = async () => {
    if (!isValidCode.value) return
    if (isCompleting.value) return

    isCompleting.value = true
    const res = await fetchFromCodeFromAny(formState.code)
    if (!res) {
      isCompleting.value = false
      return
    }

    formState.name = res.name ?? ''
    formState.description = res.description ?? ''
    formState.imgUrl = res.imgUrl ?? ''

    isCompleting.value = false
  }

  return { isCompleting, isValidCode, completeFromCode }
}

export default useCompleteFromCode
