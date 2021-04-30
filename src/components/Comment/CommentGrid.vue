<template>
  <ul :class="$style.list">
    <li v-for="(item, index) in items" :key="item.id">
      <comment :item="item">{{ texts[index] }}</comment>
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
    items: {
      type: Array as PropType<ItemSummary[]>,
      required: true
    },
    texts: {
      type: Array as PropType<string[]>,
      required: true
    }
  }
})
</script>

<style lang="scss" module>
.list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(24rem, 1fr));
  gap: 16px;
}
</style>
