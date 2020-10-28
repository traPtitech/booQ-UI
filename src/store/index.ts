import { createDirectStore } from 'direct-vuex'
import apis, { User } from '/@/lib/apis'
import { Toast, DEFAULT_TOAST_TIMEOUT, MAX_TOAST_COUNT } from './storeTypes'

const { store, rootActionContext } = createDirectStore({
  state: {
    me: null as User | null,
    toasts: [] as Toast[]
  },
  getters: {},
  mutations: {
    setMe(state, me: User) {
      state.me = me
    },
    addToast(
      state,
      toast: Omit<Toast, 'timeout' | 'id'> & { timeout?: number }
    ) {
      state.toasts.unshift({
        ...toast,
        id: Math.floor(Math.random() * 1024),
        timeout: toast.timeout ?? DEFAULT_TOAST_TIMEOUT
      })
      while (MAX_TOAST_COUNT < state.toasts.length) {
        state.toasts.pop()
      }
    },
    removeToast(state, id) {
      state.toasts = state.toasts.filter(v => v.id !== id)
    }
  },
  actions: {
    async fetchMe(context) {
      const { commit } = rootActionContext(context)

      const { data: me } = await apis.getMe()
      commit.setMe(me)
    }
  }
})

export default store.original

export type Store = typeof store
export const useStore = (): Store => store
