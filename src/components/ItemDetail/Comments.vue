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
    <form @submit.prevent="submit">
      <div :class="[$style.container, inputComment ? '' : $style.input]">
        <user-icon :user-name="name" />
        <comments-textarea v-model="inputComment" :class="$style.text" />
      </div>
      <wide-icon-button
        icon="mdi:send"
        label="送信する"
        variant="secondary"
        type="submit"
      />
    </form>
  </detail-summary>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { Comment } from '/@/lib/apis'
import DetailSummary from './DetailSummary.vue'
import UserIcon from '/@/components/UI/UserIcon.vue'
import CommentsTextarea from './CommentsTextarea.vue'
import WideIconButton from '/@/components/UI/WideIconButton.vue'
import useMe from '/@/use/me'

export default defineComponent({
  name: 'Comments',
  components: {
    DetailSummary,
    UserIcon,
    CommentsTextarea,
    WideIconButton
  },
  props: {
    comments: {
      type: Array as PropType<Comment[]>,
      default: []
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    submit: (val: string) => true
  },
  setup(_, context) {
    const inputComment = ref('')
    const { name } = useMe()
    const submit = async () => {
      context.emit('submit', inputComment.value)
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

.input {
  opacity: 0.5;
  pointer-events: none;
  transition: opacity 0.5s;
  &:focus-within {
    opacity: 1;
  }
}
</style>
