<template>
  <div v-if="item" :class="$style.container">
    <controls :img-url="item.imgUrl" :item="item" :class="$style.control" />
    <information :item="item" :class="$style.information" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, watchEffect, toRef } from 'vue'
import { useRoute } from 'vue-router'
import { getFirstParam } from '/@/lib/params'
import apis, { ItemDetail } from '/@/lib/apis'
import useTitle from './use/title'
import Controls from '/@/components/ItemDetail/Controls.vue'
import Information from '/@/components/ItemDetail/Information.vue'

export default defineComponent({
  name: 'Item',
  components: {
    Controls,
    Information
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

<style lang="scss" module>
.container {
  display: flex;
  padding: 3rem;
}

.control {
  width: 30%;
  max-width: 480px;
}

.information {
  flex: 1;
  padding: 16px;
}
</style>
