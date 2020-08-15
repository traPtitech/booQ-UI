<template>
  <div>
    <h3>所有者</h3>
    <div :class="$style.detailContainer">
      <owners-detail
        v-for="(detail, i) in details"
        :key="i"
        :class="$style.detail"
        :detail="detail"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { ItemSummary } from '/@/lib/apis'
import OwnersDetail from './OwnersDetail.vue'
import useOwners from './use/useOwners'

export default defineComponent({
  name: 'Owners',
  components: { OwnersDetail },
  props: {
    item: {
      type: Object as PropType<ItemSummary>,
      required: true
    }
  },
  setup(props) {
    const { getOwnerDetail } = useOwners()
    const details = computed(() => getOwnerDetail(props))
    return { details }
  }
})
</script>

<style lang="scss" module>
.detailContainer {
  display: flex;
  flex-wrap: wrap;
  padding-left: 8px;
}

.detail {
  margin-right: 16px;
}
</style>
