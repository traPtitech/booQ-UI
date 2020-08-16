<template>
  <div :class="$style.container">
    <div :class="$style.titleWrapper">
      <h2>{{ item.name }}</h2>
      <button :class="$style.favBtn">💛</button>
    </div>
    <div>{{ item.description }}</div>
    <owners :item="item" />
    <comments :comments="item.comments" />
    <logs :logs="item.logs" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ItemSummary } from '/@/lib/apis'
import Owners from './Owners.vue'
import Comments from './Comments.vue'
import Logs from './Logs.vue'

export default defineComponent({
  name: 'Information',
  components: {
    Owners,
    Comments,
    Logs
  },
  props: {
    item: {
      type: Object as PropType<ItemSummary>,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="scss" module>
.container {
  text-align: left;
}

.titleWrapper {
  display: flex;
}

.favBtn {
  border: none;
  background: white;
}
</style>
