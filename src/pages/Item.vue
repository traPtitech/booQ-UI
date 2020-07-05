<template>
  <div>Item Page: {{ item ? item.name : '' }}</div>
  <div>{{ JSON.stringify(item) }}</div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, watchEffect, toRef } from 'vue'
import { useRoute } from 'vue-router'
import { getFirstParam } from '/@/lib/params'
import apis, { ItemDetail } from '/@/lib/apis'
import useTitle from './use/title'

export default defineComponent({
  name: 'Item',
  setup() {
    const route = useRoute()

    const state = reactive({
      id: computed(() => +getFirstParam(route.params.id)),
      item: undefined as ItemDetail | undefined
    })
    watchEffect(async () => {
      const { data } = await apis.getItem(state.id)
      state.item = data
    })

    useTitle(computed(() => (state.item ? `${state.item?.name}` : '物品')))

    return { item: toRef(state, 'item') }
  }
})
</script>
