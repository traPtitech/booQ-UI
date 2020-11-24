<template>
  <div>
    <user-icon :user-name="username" />
    @{{ username }}
    <div>
      所有物
      <item-grid :items="items" />
    </div>
    コメント
    <div v-for="comment in comments" :key="comment.id">
      <user-comment :comment="comment" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, watchEffect, toRefs, PropType } from 'vue'
import { useRoute } from 'vue-router'
import { getFirstParam } from '/@/lib/params'
import apis, { ItemSummary, Comment, ItemDetail } from '/@/lib/apis'
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
      const {data: items} = await apis.getItems(state.username)
      state.items = items
      const {data: comments} = await apis.getComments(state.username)
      state.comments = comments
    }),

    useTitle(computed(() => state.username))

    return { ...toRefs(state) }
  }
})
</script>
