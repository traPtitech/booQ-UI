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
import { useRoute } from 'vue-router'
import { getFirstParam } from '/@/lib/params'
import apis, { ItemSummary, ItemDetail } from '/@/lib/apis'
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
  setup() {
    const route = useRoute()

    const state = reactive({
      username: computed(() => getFirstParam(route.params.name) ?? ''),
      items: [] as ItemSummary[],
      comments: [] as { text: string; item: ItemDetail }[]
    })
    watchEffect(async () => {
      const [{ data: items }, { data: commentObjs }] = await Promise.all([
        apis.getItems(state.username),
        apis.getComments(state.username)
      ])
      const comments = await Promise.allSettled(
        commentObjs.map(async ({ itemId, text }) => ({
          text,
          item: (await apis.getItem(itemId)).data
        }))
      )

      state.items = items
      state.comments = comments
        .filter((res): res is PromiseFulfilledResult<{
          text: string
          item: ItemDetail
        }> => {
          if (res.status === 'rejected') {
            // eslint-disable-next-line no-console
            console.error(res.reason)
            return false
          }
          return true
        })
        .map(res => res.value)
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
.subtitle {
  padding: 2rem 0 0.5rem 0;
}
</style>
