<template>
  <ul :class="$style.list">
    <li v-for="{ text, item } in comments" :key="item.id">
      <comment :text="text" :item="item" />
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ItemSummary } from '/@/lib/apis'
import Comment from './Comment.vue'

export default defineComponent({
  name: 'CommentGrid',
  components: {
    Comment
  },
  props: {
    comments: {
      type: Array as PropType<{ text: string; item: ItemSummary }[]>,
      required: true
    }
  }
})
</script>

<style lang="scss" module>
.list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
  gap: 16px;
}
</style>
