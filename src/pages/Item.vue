<template>
  <div v-if="item" :class="$style.container">
    <controls :item="item" :class="$style.control" @updateItem="updateItem" />
    <information
      :item="item"
      :class="$style.information"
      @updateItem="updateItem"
    />
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
      id: computed(() => +(getFirstParam(route.params.id) ?? '')),
      item: undefined as ItemDetail | undefined
    })
    const updateItem = (item: ItemDetail) => {
      state.item = item
    }
    watchEffect(async () => {
      if (!Number.isFinite(state.id)) return
      const { data } = await apis.getItem(state.id)
      updateItem(data)
    })

    useTitle(computed(() => (state.item ? `${state.item?.name}` : '物品')))

    return { item: toRef(state, 'item'), updateItem }
  }
})
</script>

<style lang="scss" module>
.container {
  display: flex;
  flex-wrap: wrap;
  padding: 3rem;

  @media (max-width: 450px) {
    padding: 2rem;
  }
}

.control {
  min-width: min(280px, 100%);
  flex: 4;
  max-width: 480px;
}

.information {
  min-width: min(430px, 100%);
  flex: 6;
  padding: 16px;
}
</style>
