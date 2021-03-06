<template>
  <div :class="$style.container">
    <div :class="$style.titleWrapper">
      <h2 :class="$style.title">{{ item.name }}</h2>
      <like-button
        :likes="item.likes"
        :item-id="item.id"
        @updateLikes="updateLikes"
      />
    </div>
    <div :class="$style.description">{{ item.description }}</div>
    <owners :item="item" />
    <comments
      :item-id="item.id"
      :comments="item.comments"
      @postComment="postComment"
    />
    <logs :logs="item.logs" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ItemDetail, Comment, User } from '/@/lib/apis'
import Owners from './Owners.vue'
import Comments from './Comments.vue'
import Logs from './Logs.vue'
import LikeButton from './LikeButton.vue'

export default defineComponent({
  name: 'Information',
  components: {
    Owners,
    Comments,
    Logs,
    LikeButton
  },
  props: {
    item: {
      type: Object as PropType<ItemDetail>,
      required: true
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateItem: (item: ItemDetail) => true
  },
  setup(props, context) {
    const postComment = (comment: Comment) => {
      const newItem = {
        ...props.item,
        comments: [...props.item.comments, comment]
      }
      context.emit('updateItem', newItem)
    }
    const updateLikes = (likes: User[]) => {
      context.emit('updateItem', { ...props.item, likes: likes })
    }
    return { postComment, updateLikes }
  }
})
</script>

<style lang="scss" module>
.container {
  text-align: left;
}

.titleWrapper {
  display: flex;
}

.title {
  word-break: normal;
  overflow-wrap: break-word; // for Safari
  overflow-wrap: anywhere;
}

.description {
  color: $color-text-secondary;
}
</style>
