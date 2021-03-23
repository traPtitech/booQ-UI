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
    <div :class="[$style.container, inputComment ? '' : $style.input]">
      <user-icon :user-name="name" />
      <comments-textarea v-model="inputComment" :class="$style.text" />
    </div>
  </detail-summary>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { Comment } from '/@/lib/apis'
import DetailSummary from './DetailSummary.vue'
import UserIcon from '/@/components/UI/UserIcon.vue'
import CommentsTextarea from './CommentsTextarea.vue'
import useMe from '/@/use/me'

export default defineComponent({
  name: 'Comments',
  components: {
    DetailSummary,
    UserIcon,
    CommentsTextarea
  },
  props: {
    comments: {
      type: Array as PropType<Comment[]>,
      default: []
    }
  },
  setup() {
    const inputComment = ref('')
    const { name } = useMe()
    return { inputComment, name }
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

.input {
  opacity: 0.5;
  pointer-events: none;
  transition: opacity 0.5s;
  &:focus-within {
    opacity: 1;
  }
}
</style>
