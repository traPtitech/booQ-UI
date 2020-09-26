<template>
  <detail-summary title="所有者">
    <div :class="$style.detailContainer">
      <owners-detail
        v-for="detail in details"
        :key="detail.userName"
        :class="$style.detail"
        :detail="detail"
      />
    </div>
  </detail-summary>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ItemSummary } from '/@/lib/apis'
import DetailSummary from './DetailSummary.vue'
import OwnersDetail from './OwnersDetail.vue'
import useOwners from './use/owners'

export default defineComponent({
  name: 'Owners',
  components: {
    DetailSummary,
    OwnersDetail
  },
  props: {
    item: {
      type: Object as PropType<ItemSummary>,
      required: true
    }
  },
  setup(props) {
    const { details } = useOwners(props)
    return { details }
  }
})
</script>

<style lang="scss" module>
.detailContainer {
  display: flex;
  flex-wrap: wrap;
}

.detail {
  margin-right: 8px;
}
</style>
