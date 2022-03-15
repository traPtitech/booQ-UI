<template>
  <div :class="$style.container">
    <h1 :class="$style.header">
      <user-icon :user-name="name" :size="64" />
      <div :class="$style.username">@{{ name }}</div>
    </h1>
    <div :class="$style.item">
      <h2 :class="$style.subtitle">所有物</h2>
      <item-flex-list :items="items" />
    </div>
    <div :class="$style.item">
      <h2 :class="$style.subtitle">コメント</h2>
      <comment-grid :comments="comments" />
    </div>
  </div>
</template>

<script lang="ts">
import { watchEffect, toRef, ref } from 'vue'
import apis, { ItemSummary, Comment } from '/@/lib/apis'
import useTitle from './use/title'
</script>

<script lang="ts" setup>
import UserIcon from '/@/components/UI/UserIcon.vue'
import ItemFlexList from '/@/components/Item/ItemFlexList.vue'
import CommentGrid from '/@/components/UserPage/CommentGrid.vue'

const props = defineProps<{
  name: string
}>()

useTitle(toRef(props, 'name'))

const items = ref<ItemSummary[]>([])
watchEffect(async () => {
  const { data } = await apis.getItems(props.name)
  items.value = data
})

const comments = ref<Comment[]>([])
watchEffect(async () => {
  const { data } = await apis.getComments(props.name)
  comments.value = data
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
  margin: 0;
}
.item {
  margin: 3rem 0;
  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    margin-bottom: 0;
  }
}
.username {
  padding: 1rem;
}
.subtitle {
  margin: 0;
  padding-bottom: 0.5rem;
}
</style>
