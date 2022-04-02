import type { ToRefs } from 'vue'
import { computed } from 'vue'
import { useMeStore } from '../store/me'
import type { User } from '/@/lib/apis'

const keysOfUser = [
  'id',
  'name',
  'displayName',
  'admin',
  'createdAt',
  'updatedAt',
  'deletedAt'
] as const

type Key = typeof keysOfUser[number]
type UserKey = keyof User

function noLack(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _: Key extends UserKey ? (UserKey extends Key ? true : never) : never
): void {
  // just for type check
}
noLack(true)

// meがnullのときは呼ばれない仮定
const useMe = (): ToRefs<User> => {
  const meStore = useMeStore()
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const me = computed(() => meStore.me!)

  const refs: Partial<ToRefs<User>> = {}
  for (const key of keysOfUser) {
    // @ts-expect-error it is ok
    refs[key] = computed(() => me.value?.[key])
  }
  return refs as ToRefs<User>
}

export default useMe
