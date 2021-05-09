<template>
  <div :class="$style.container">
    <h1 :class="$style.header">
      <user-icon :user-name="username" :size="64" />
      <div :class="$style.username">@{{ username }}</div>
    </h1>
    <div>
      <h2 :class="$style.subtitle">所有物</h2>
      <item-flex-list :items="items" />
    </div>
    <div>
      <h2 :class="$style.subtitle">コメント</h2>
      <comment-grid :comments="comments" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, watchEffect, toRefs } from 'vue'
import apis, { ItemSummary, Comment } from '/@/lib/apis'
import useTitle from './use/title'
import UserIcon from '/@/components/UI/UserIcon.vue'
import ItemFlexList from '/@/components/Item/ItemFlexList.vue'
import CommentGrid from '../components/UserPage/CommentGrid.vue'

export default defineComponent({
  name: 'User',
  components: {
    UserIcon,
    ItemFlexList,
    CommentGrid
  },
  props: {
    name: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      username: computed(() => props.name),
      items: [] as ItemSummary[],
      comments: [] as Comment[]
    })
    watchEffect(async () => {
      const { data } = await apis.getItems(state.username)
      state.items = data
    })
    watchEffect(async () => {
      const { data } = await apis.getComments(state.username)
      state.comments = data
    })

    useTitle(computed(() => state.username))

    return { ...toRefs(state) }
  }
})
</script>

<style lang="scss" module>
.container {
  padding: 3rem;
  text-align: left;
}
.header {
  display: flex;
  align-items: center;
}
.username {
  padding: 1rem;
}
.subtitle {
  padding: 2rem 0 0.5rem 0;
}
</style>
