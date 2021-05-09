<template>
  <detail-summary title="所有者">
    <div :class="$style.detailContainer">
      <owners-detail
        v-for="ownerDetail in ownerDetails"
        :key="ownerDetail.userName"
        :class="$style.detail"
        :owner-detail="ownerDetail"
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
    const { ownerDetails } = useOwners(props)
    return { ownerDetails }
  }
})
</script>

<style lang="scss" module>
.detailContainer {
  display: flex;
  flex-wrap: wrap;
}

.detail {
  margin-right: 1rem;
}
</style>
