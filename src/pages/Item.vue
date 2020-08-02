<template>
  <div>Item Page: {{ item?.name ?? '' }}</div>
  <div v-if="item">
    <controls :img-url="item.imgUrl" />
  </div>
  <div>{{ JSON.stringify(item) }}</div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, watchEffect, toRef } from 'vue'
import { useRoute } from 'vue-router'
import { getFirstParam } from '/@/lib/params'
import apis, { ItemDetail } from '/@/lib/apis'
import useTitle from './use/title'
import Controls from '/@/components/ItemDetail/Controls.vue'

export default defineComponent({
  name: 'Item',
  components: {
    Controls
  },
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
