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

<script lang="ts" setup>
import { ItemDetail, ItemSummary } from '/@/lib/apis'
import useOwners from './composables/useOwners'
import DetailSummary from './DetailSummary.vue'
import OwnersDetail from './OwnersDetail.vue'

const props = defineProps<{
  item: ItemSummary | ItemDetail
}>()

const { ownerDetails } = useOwners(props)
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
