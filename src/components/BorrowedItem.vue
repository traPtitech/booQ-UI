<template>
  <div :class="$style.container" :data-is-expired="isExpired">
    <div :class="$style.title">{{ item.name }}</div>
    <div>{{ dueString }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { ItemSummary } from '/@/lib/apis'
import { getDue } from '/@/lib/item'
import { stringifyDateFromNumber, toNow } from '/@/lib/date'

export default defineComponent({
  name: 'BorrowedItem',
  props: {
    item: {
      type: Object as PropType<ItemSummary>,
      required: true
    }
  },
  setup(props) {
    const due = computed(() => getDue(props.item))
    const dueString = computed(() => {
      const str = stringifyDateFromNumber(due.value)
      const diff = toNow(due.value)
      if (!diff) return str
      return `${str} (${diff})`
    })
    const isExpired = computed(() => Date.now() > due.value)

    return { dueString, isExpired }
  }
})
</script>

<style lang="scss" module>
.container {
  padding: 16px;
  background: $color-secondary;
}
.title {
  font-weight: bold;
}
</style>
