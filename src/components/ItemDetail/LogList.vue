<template>
  <detail-summary title="ログ">
    <div v-for="log in logSummaries" :key="log.id" :class="$style.item">
      <user-icon :user-name="log.userName" :class="$style.icon" />
      <div :class="$style.text">
        <div>{{ log.text }}</div>
        <div :class="$style.meta">@{{ log.userName }} {{ log.date }}</div>
      </div>
    </div>
  </detail-summary>
</template>

<script lang="ts" setup>
import { Log } from '/@/lib/apis'
import useLogs from './composables/useLogs'
import DetailSummary from './DetailSummary.vue'
import UserIcon from '/@/components/UI/UserIcon.vue'

const props = defineProps<{
  logs: Log[]
}>()

const { logSummaries } = useLogs(props)
</script>

<style lang="scss" module>
.item {
  display: flex;
  margin: 1rem 0.5rem;
}

.icon {
  flex-shrink: 0;
}

.text {
  margin-left: 8px;
  align-self: center;
  word-break: break-all;
}

.meta {
  opacity: 0.7;
  font-size: 0.85rem;
}
</style>
