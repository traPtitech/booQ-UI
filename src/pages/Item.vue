<template>
  <div v-if="item" :class="$style.container">
    <controls :img-url="item.imgUrl" :class="$style.control" />
    <infomation :item="item" :class="$style.infomation" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, watchEffect, toRef } from 'vue'
import { useRoute } from 'vue-router'
import { getFirstParam } from '/@/lib/params'
import apis, { ItemDetail } from '/@/lib/apis'
import useTitle from './use/title'
import Controls from '/@/components/ItemDetail/Controls.vue'
import Infomation from '/@/components/ItemDetail/Infomation.vue'

export default defineComponent({
  name: 'Item',
  components: {
    Controls,
    Infomation
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
  width: 100%;
  padding: 8px;
}

.control {
  width: 280px;
}

.infomation {
  flex-basis: calc(100% - 280px - 16px);
  padding: 16px;
}
</style>
