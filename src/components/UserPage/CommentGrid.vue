<template>
  <ul :class="$style.list">
    <li v-for="{ text, item } in comments" :key="item.id">
      <comment-panel :text="text" :item="item" />
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { Comment } from '/@/lib/apis'
import CommentPanel from './CommentPanel.vue'

defineProps<{
  comments: Comment[]
}>()
</script>

<style lang="scss" module>
.list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
  gap: 16px;
}
</style>
