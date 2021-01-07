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
      <div v-if="commentedItems.get(comment.itemId)">
        <item-wide :item="commentedItems.get(comment.itemId)">
          {{ comment.text }}
        </item-wide>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, watchEffect, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { getFirstParam } from '/@/lib/params'
import apis, { ItemSummary, Comment, ItemDetail } from '/@/lib/apis'
import useTitle from './use/title'
import UserIcon from '/@/components/UI/UserIcon.vue'
import ItemGrid from '/@/components/Item/ItemGrid.vue'
import ItemWide from '/@/components/ItemWide/ItemWide.vue'

export default defineComponent({
  name: 'User',
  components: {
    UserIcon,
    ItemGrid,
    ItemWide
  },
  setup() {
    const route = useRoute()

    const state = reactive({
      username: computed(() => getFirstParam(route.params.name)),
      items: [] as ItemSummary[],
      comments: [] as Comment[],
      commentedItems: new Map() as Map<number, ItemDetail>
    })
    watchEffect(async () => {
      const [{ data: items }, { data: comments }] = await Promise.all([
        apis.getItems(state.username),
        apis.getComments(state.username)
      ])
      state.items = items
      state.comments = comments
      for (const comment of comments) {
        apis.getItem(comment.itemId).then(({ data: commentedItem }) => {
          state.commentedItems.set(commentedItem.id, commentedItem)
        })
      }
    })

    useTitle(computed(() => state.username))

    return { ...toRefs(state) }
  }
})
</script>
