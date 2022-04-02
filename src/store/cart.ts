import { defineStore, acceptHMRUpdate } from 'pinia'
import { computed, ref } from 'vue'
import type { ItemDetail, ItemSummary } from '/@/lib/apis'

export interface CartItem {
  item: ItemSummary | ItemDetail
  ownerId: number
  count: number
}

export const useCart = defineStore('cart', () => {
  const cart = ref<CartItem[]>([])

  const cartItems = computed(
    () => new Map(cart.value.map(c => [c.item.id, c.count]))
  )

  const upsertItemToCart = (payload: CartItem) => {
    const index = cart.value.findIndex(v => v.item.id === payload.item.id)
    if (index !== -1) {
      cart.value[index] = payload
    } else {
      cart.value.push(payload)
    }
  }

  const removeItemFromCart = (id: number) => {
    const index = cart.value.findIndex(v => v.item.id === id)
    if (index === -1) return
    cart.value.splice(index, 1)
  }

  const removeAllItemFromCart = () => {
    cart.value.splice(0, cart.value.length)
  }

  return {
    cart: cart,
    cartItems,
    upsertItemToCart,
    removeItemFromCart,
    removeAllItemFromCart
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCart, import.meta.hot))
}
