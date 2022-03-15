<template>
  <div :class="$style.container">
    <div :class="$style.titleWrapper">
      <h2 :class="$style.title">{{ item.name }}</h2>
      <like-button
        :likes="item.likes"
        :item-id="item.id"
        @update-likes="updateLikes"
      />
    </div>
    <div :class="$style.description">{{ item.description }}</div>
    <owner-list :item="item" />
    <comment-list
      :item-id="item.id"
      :comments="item.comments"
      @post-comment="postComment"
    />
    <log-list :logs="item.logs" />
  </div>
</template>

<script lang="ts">
import { ItemDetail, Comment, User } from '/@/lib/apis'
</script>

<script lang="ts" setup>
import OwnerList from './OwnerList.vue';
import CommentList from './CommentList.vue';
import LogList from './LogList.vue';
import LikeButton from './LikeButton.vue';

const props = defineProps<{
    item: ItemDetail
}>();

const emit = defineEmits<{
    (e: "updateItem", item: ItemDetail): void
}>();

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
