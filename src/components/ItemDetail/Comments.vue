<template>
  <detail-summary title="コメント">
    <div v-for="comment in comments" :key="comment.id" :class="$style.item">
      <user-icon :user-name="comment.user.name" />
      <div :class="$style.text">{{ comment.text }}</div>
    </div>
  </detail-summary>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Comment } from '/@/lib/apis'
import DetailSummary from './DetailSummary.vue'
import UserIcon from '/@/components/UI/UserIcon.vue'

export default defineComponent({
  name: 'Comments',
  components: {
    DetailSummary,
    UserIcon
  },
  props: {
    comments: {
      type: Array as PropType<Comment[]>,
      default: []
    }
  },
  setup() {
    return
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
