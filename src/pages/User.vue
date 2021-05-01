<template>
  <div>User Page: {{ username }}</div>
  <ul>
    <li v-for="item in items" :key="item.id">{{ item.name }}</li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, watchEffect, toRefs } from 'vue'
import apis, { ItemSummary } from '/@/lib/apis'
import useTitle from './use/title'

export default defineComponent({
  name: 'User',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      username: computed(() => props.name),
      items: [] as ItemSummary[]
    })
    watchEffect(async () => {
      const { data } = await apis.getItems(state.username)
      state.items = data
    })

    useTitle(computed(() => state.username))

    return { ...toRefs(state) }
  }
})
</script>
