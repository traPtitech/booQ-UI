import { computed, reactive, ToRefs, toRefs } from 'vue'
import { useStore } from '/@/store'
import { User } from '/@/lib/apis'

// meがnullのときは呼ばれない仮定
const useMe = (): ToRefs<User> => {
  const store = useStore()
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const me = computed(() => store.state.me!)
  return toRefs(reactive(me.value))
}

export default useMe
