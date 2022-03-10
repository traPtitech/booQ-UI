import { computed, reactive, ToRefs, toRefs } from 'vue'
import { useMeStore } from '../store/me'
import { User } from '/@/lib/apis'

// meがnullのときは呼ばれない仮定
const useMe = (): ToRefs<User> => {
  const meStore = useMeStore()
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const me = computed(() => meStore.me!)
  return toRefs(reactive(me.value))
}

export default useMe
