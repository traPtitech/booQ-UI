import { reactive, inject, provide } from 'vue'
import { ItemType } from '/@/lib/apis'

const STORE_KEY = Symbol()

interface FormState {
  type: ItemType
  code: string
  name: string
  description: string
  imgUrl: string
  count: number
  rentalable: boolean
}

interface Store {
  formState: FormState
  reset: () => void
}

const defaultValue = {
  type: ItemType.individual,
  code: '',
  name: '',
  description: '',
  imgUrl: '',
  count: 1,
  rentalable: false
}

export const createFormState = (): Store => {
  const formState = reactive({ ...defaultValue })
  const reset = () => {
    const keys = Object.keys(formState) as Array<keyof FormState>
    keys.forEach(key => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(formState[key] as any) = defaultValue[key]
    })
  }

  return { formState, reset }
}

export const provideFormState = (): Store => {
  const state = createFormState()
  provide<Store>(STORE_KEY, state)
  return state
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const useFormState = (): Store => inject<Store>(STORE_KEY)!
