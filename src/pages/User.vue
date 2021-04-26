<template>
  <div :class="$style.container">
    <h1 :class="$style.header">
      <user-icon :user-name="username" :size="64" />
      <div :class="$style.username">@{{ username }}</div>
    </h1>
    <div>
      <h2>所有物</h2>
      <item-flex-list :items="items" />
    </div>
    <div>
      <h2>コメント</h2>
      <item-wide-grid :items="commentedItems" :texts="comments" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, watchEffect, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { getFirstParam } from '/@/lib/params'
import apis, { ItemSummary, ItemDetail } from '/@/lib/apis'
import useTitle from './use/title'
import UserIcon from '/@/components/UI/UserIcon.vue'
import ItemFlexList from '/@/components/Item/ItemFlexList.vue'
import ItemWideGrid from '/@/components/ItemWide/ItemWideGrid.vue'

export default defineComponent({
  name: 'User',
  components: {
    UserIcon,
    ItemFlexList,
    ItemWideGrid
  },
  setup() {
    const route = useRoute()

    const state = reactive({
      username: computed(() => getFirstParam(route.params.name)),
      items: [] as ItemSummary[],
      commentedItems: [] as ItemDetail[],
      comments: [] as string[]
    })
    watchEffect(async () => {
      const { data } = await apis.getItems(state.username)
      state.items = data
      const { data: commentObjects } = await apis.getComments(state.username)
      const comments = commentObjects.map(({ text }) => text)
      const items = await Promise.all(
        commentObjects.map(({ itemId }) =>
          apis
            .getItem(itemId)
            .then(({ data }) => data)
            // eslint-disable-next-line no-console
            .catch(error => console.error(error))
        )
      )
      state.comments = comments.filter((_, index) => items[index])
      state.commentedItems = items.filter<ItemDetail>(
        (item): item is ItemDetail => !!item
      )
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
}
.username {
  padding: 1rem;
}
h2 {
  padding: 2rem 0 0.5rem 0;
}
</style>
