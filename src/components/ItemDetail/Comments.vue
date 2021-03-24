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
      default: []
    }
  },
  setup(props) {
    const store = useStore()

    const inputComment = ref('')
    const { name } = useMe()

    const submit = async () => {
      await apis.postComment(props.itemId, { text: inputComment.value })
      store.commit.addToast({
        type: 'success',
        text: `コメントを投稿しました。`
      })
      inputComment.value = ''
    }
    return { inputComment, name, submit }
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
