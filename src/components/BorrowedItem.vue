<template>
  <item-wide
    :item="item"
    :class="$style.container"
    :data-is-expired="isExpired"
  >
    <div :class="$style.due">{{ dueString }}</div>
  </item-wide>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { ItemSummary } from '/@/lib/apis'
import { getDue } from '/@/lib/item'
import { stringifyDateFromNumber, toNow } from '/@/lib/date'
import ItemWide from '/@/components/ItemWide/ItemWide.vue'

const props = defineProps<{
  item: ItemSummary
  borrower: string
}>()

const due = computed(() => getDue(props.item, props.borrower))
const dueString = computed(() => {
  const str = stringifyDateFromNumber(due.value)
  const diff = toNow(due.value)
  if (!diff) return str
  return `${str} (${diff})`
})
const isExpired = computed(() => Date.now() > due.value)
</script>

<style lang="scss" module>
.due {
  .container[data-is-expired='true'] & {
    color: $color-error;
  }
}
</style>
