import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'
import type { User } from '/@/lib/apis'
import apis from '/@/lib/apis'

export const useMeStore = defineStore('me', () => {
  const me = ref<User | null>(null)

  const fetchMe = async () => {
    const { data: newMe } = await apis.getMe()
    me.value = newMe
  }

  return { me, fetchMe }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMeStore, import.meta.hot))
}
