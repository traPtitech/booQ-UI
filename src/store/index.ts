import { createDirectStore } from 'direct-vuex'
import apis, { User } from '/@/lib/apis'
import {
  Toast,
  DEFAULT_TOAST_TIMEOUT,
  MAX_TOAST_COUNT,
  CartItem
} from './types'

let toastID = 0

const { store, rootActionContext } = createDirectStore({
  state: {
    me: null as User | null,
    toasts: [] as Toast[],
    cart: [] as CartItem[]
  },
  getters: {
    cartItems(state) {
      return new Map(state.cart.map(c => [c.item.id, c.count]))
    }
  },
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
        id: toastID,
        timeout: toast.timeout ?? DEFAULT_TOAST_TIMEOUT
      })
      toastID++
      while (MAX_TOAST_COUNT < state.toasts.length) {
        state.toasts.pop()
      }
    },
    removeToast(state, id) {
      state.toasts.splice(
        state.toasts.findIndex(v => v.id === id),
        1
      )
    },
    upsertItemToCart(state, payload: CartItem) {
      const index = state.cart.findIndex(v => v.item.id === payload.item.id)
      if (index !== -1) {
        state.cart[index] = payload
      } else {
        state.cart.push(payload)
      }
    },
    removeItemFromCart(state, id: number) {
      const index = state.cart.findIndex(v => v.item.id === id)
      if (index === -1) return
      state.cart.splice(index, 1)
    },
    removeAllItemFromCart(state) {
      state.cart.splice(0, state.cart.length)
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
