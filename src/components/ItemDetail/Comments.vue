<template>
  <detail-summary title="コメント">
    <div
      v-for="comment in comments"
      :key="comment.id"
      :class="$style.container"
    >
      <user-icon :user-name="comment.user.name" :class="$style.icon" />
      <div :class="$style.text">{{ comment.text }}</div>
    </div>
    <comments-textarea v-model="inputComment" @submit="submit" />
  </detail-summary>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { Comment } from '/@/lib/apis'
import DetailSummary from './DetailSummary.vue'
import UserIcon from '/@/components/UI/UserIcon.vue'
import CommentsTextarea from './CommentsTextarea.vue'
import useMe from '/@/use/me'
import apis from '/@/lib/apis'
import { useStore } from '/@/store'

export default defineComponent({
  name: 'Comments',
  components: {
    DetailSummary,
    UserIcon,
    CommentsTextarea
  },
  props: {
    itemId: {
      type: Number,
      required: true
    },
    comments: {
      type: Array as PropType<Comment[]>,
      default: () => []
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    postComment: (comment: Comment) => true
  },
  setup(props, context) {
    const store = useStore()

    const inputComment = ref('')
    const { name } = useMe()

    const submit = async () => {
      try {
        const { data: comment } = await apis.postComment(props.itemId, {
          text: inputComment.value
        })
        store.commit.addToast({
          type: 'success',
          text: `コメントを投稿しました。`
        })
        context.emit('postComment', comment)
        inputComment.value = ''
      } catch {
        store.commit.addToast({
          type: 'error',
          text: 'コメントの投稿に失敗しました'
        })
      }
    }
    return { inputComment, name, submit }
  }
})
</script>

<style lang="scss" module>
.container {
  display: flex;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.text {
  margin-left: 8px;
  align-self: center;
  padding: 0.7rem;
  border: 2px solid $color-text-secondary;
  border-radius: 12px;
  width: 100%;
}

.icon {
  flex-shrink: 0;
  margin: 0.2rem;
}
</style>
