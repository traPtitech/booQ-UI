<template>
  <detail-summary title="ログ">
    <div v-for="log in logSummaries" :key="log.id" :class="$style.item">
      <user-icon :user-name="log.userName" />
      <div :class="$style.text">{{ log.text }}</div>
    </div>
  </detail-summary>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Log } from '/@/lib/apis'
import DetailSummary from './DetailSummary.vue'
import UserIcon from '/@/components/UI/UserIcon.vue'
import useLogs from './use/logs'

export default defineComponent({
  name: 'Logs',
  components: {
    DetailSummary,
    UserIcon
  },
  props: {
    logs: {
      type: Array as PropType<Log[]>,
      required: true
    }
  },
  setup(props) {
    const { logSummaries } = useLogs(props)
    return { logSummaries }
  }
})
</script>

<style lang="scss" module>
.item {
  display: flex;
}

.text {
  margin-left: 8px;
  align-self: center;
}
</style>
