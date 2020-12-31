<template>
  <div v-if="item">
    <item-wide :item="item"> {{ comment.text }} </item-wide>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, watchEffect, toRefs } from 'vue'
import apis, { Comment, ItemDetail } from '/@/lib/apis'
import ItemWide from '/@/components/ItemWide/ItemWide.vue'

export default defineComponent({
  name: 'UserComment',
  components: {
    ItemWide
  },
  props: {
    comment: {
      type: Object as PropType<Comment>,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      item: undefined as ItemDetail | undefined
    })
    watchEffect(async () => {
      const { data } = await apis.getItem(props.comment.itemId)
      state.item = data
    })

    return { ...toRefs(state) }
  }
})
</script>
