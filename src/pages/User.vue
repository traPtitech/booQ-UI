<template>
  <div>
    <h1>
      <user-icon :user-name="username" />
      @{{ username }}
    </h1>
    <div>
      <h2>所有物</h2>
      <item-grid :items="items" />
    </div>
    <h2>コメント</h2>
    <div v-for="comment in comments" :key="comment.id">
      <user-comment :comment="comment" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, watchEffect, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { getFirstParam } from '/@/lib/params'
import apis, { ItemSummary, Comment } from '/@/lib/apis'
import useTitle from './use/title'
import UserIcon from '/@/components/UI/UserIcon.vue'
import ItemGrid from '/@/components/Item/ItemGrid.vue'
import UserComment from '/@/components/UserPage/UserComment.vue'

export default defineComponent({
  name: 'User',
  components: {
    UserIcon,
    ItemGrid,
    UserComment
  },
  setup() {
    const route = useRoute()

    const state = reactive({
      username: computed(() => getFirstParam(route.params.name) ?? ''),
      items: [] as ItemSummary[]
    })
    watchEffect(async () => {
      const { data: items } = await apis.getItems(state.username)
      state.items = items
      const { data: comments } = await apis.getComments(state.username)
      state.comments = comments
    })

    useTitle(computed(() => state.username))

    return { ...toRefs(state) }
  }
})
</script>
