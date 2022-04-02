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

<script lang="ts" setup>
import { ref } from 'vue'
import type { Comment } from '/@/lib/apis'
import apis from '/@/lib/apis'
import { useToast } from '/@/store/toast'
import DetailSummary from './DetailSummary.vue'
import UserIcon from '/@/components/UI/UserIcon.vue'
import CommentsTextarea from './CommentsTextarea.vue'

const props = withDefaults(
  defineProps<{
    itemId: number
    comments?: Comment[]
  }>(),
  {
    comments: () => []
  }
)

const emit = defineEmits<{
  (e: 'postComment', comment: Comment): void
}>()

const toastStore = useToast()

const inputComment = ref('')

const submit = async () => {
  try {
    const { data: comment } = await apis.postComment(props.itemId, {
      text: inputComment.value
    })
    toastStore.addToast({
      type: 'success',
      text: `コメントを投稿しました。`
    })
    emit('postComment', comment)
    inputComment.value = ''
  } catch {
    toastStore.addToast({
      type: 'error',
      text: 'コメントの投稿に失敗しました'
    })
  }
}
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
