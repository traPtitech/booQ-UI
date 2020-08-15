<template>
  <div>
    <h3>コメント</h3>
    <div :class="$style.itemContainer">
      <div v-for="(comment, i) in comments" :key="i" :class="$style.item">
        <user-icon :user-name="comment.user.name" />
        <div :class="$style.text">{{ comment.text }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Comment } from '/@/lib/apis'
import UserIcon from '/@/components/UI/UserIcon.vue'

export default defineComponent({
  name: 'Comments',
  components: { UserIcon },
  props: {
    comments: {
      type: Array as PropType<Comment[]>,
      default: []
    }
  },
  setup() {
    return
  }
})
</script>

<style lang="scss" module>
.itemContainer {
  padding-left: 8px;
}

.item {
  display: flex;
}

.text {
  margin-left: 16px;
  align-self: center;
}
</style>
