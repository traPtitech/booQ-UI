<template>
  <div v-if="item" :class="$style.container">
    <control-panel
      :item="item"
      :class="$style.control"
      @update-item="updateItem"
    />
    <information-panel
      :item="item"
      :class="$style.information"
      @update-item="updateItem"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive, computed, watchEffect, toRef } from 'vue'
import type { ItemDetail } from '/@/lib/apis'
import apis from '/@/lib/apis'
import useTitle from './composables/useTitle'
import ControlPanel from '/@/components/ItemDetail/ControlPanel.vue'
import InformationPanel from '/@/components/ItemDetail/InformationPanel.vue'

const props = defineProps<{
  id: string
}>()

const state = reactive({
  id: computed(() => +props.id),
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

const item = toRef(state, 'item')
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
