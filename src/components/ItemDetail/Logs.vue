<template>
  <div>
    <h3>ログ</h3>
    <div :class="$style.itemContainer">
      <div v-for="(log, i) in logSummaries" :key="i" :class="$style.item">
        <user-icon :user-name="log.userName" />
        <div :class="$style.text">{{ log.text }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { Log } from '/@/lib/apis'
import UserIcon from '/@/components/UI/UserIcon.vue'
import useLogs from './use/useLogs'

export default defineComponent({
  name: 'Logs',
  components: { UserIcon },
  props: {
    logs: {
      type: Array as PropType<Log[]>,
      required: true
    }
  },
  setup(props) {
    const { getLogSummary } = useLogs()
    const logSummaries = computed(() => getLogSummary(props))
    return { logSummaries }
  }
})
</script>

<style lang="scss" module>
.itemContainer {
  padding-left: 8px;
}

.item {
  display: flex;
}

.text {
  margin-left: 16px;
  align-self: center;
}
</style>
