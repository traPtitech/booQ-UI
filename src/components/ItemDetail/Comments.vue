<template>
  <detail-summary title="コメント">
    <div
      v-for="comment in comments"
      :key="comment.id"
      :class="$style.container"
    >
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
.container {
  display: flex;
  margin-bottom: 0.5rem;
}

.text {
  margin-left: 8px;
  align-self: center;
  padding: 0.7rem;
  border: 1px solid $color-text-secondary;
  border-radius: 12px;
  width: 100%;
}
</style>
