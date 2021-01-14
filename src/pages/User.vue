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
    <div v-for="commentedItem in commentedItems" :key="commentedItem.comment.id">
      <div v-if="commentedItem.item">
        <item-wide :item="commentedItem.item">
          {{ commentedItem.comment.text }}
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
      commentedItems: [] as {comment: {id: number, text: string}, item: ItemDetail}[]
    })
    watchEffect(async () => {
      apis.getComments(state.username).then(({data: comments}) => {
        comments.forEach((comment) => {
          apis.getItem(comment.itemId).then(({ data: commentedItem }) => {
            const {id, text} = comment
            state.commentedItems.push({comment: {id, text}, item: commentedItem})
          })
        });
      })
      const { data } = await apis.getItems(state.username)
      state.items = data
    })

    useTitle(computed(() => state.username))

    return { ...toRefs(state) }
  }
})
</script>
