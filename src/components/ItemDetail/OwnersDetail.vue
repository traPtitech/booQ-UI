<template>
  <div :class="$style.container">
    <user-icon :user-name="detail.userName" />
    <div :class="$style.numContainer">
      <div :class="$style.remain">{{ detail.remain }}</div>
      <div>{{ detail.all }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import UserIcon from '/@/components/UI/UserIcon.vue'
import { OwnerDetail } from './use/useOwners'

export default defineComponent({
  name: 'OwnersDetail',
  components: { UserIcon },
  props: {
    detail: {
      type: Object as PropType<OwnerDetail>,
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
  display: flex;
}

.numContainer {
  margin-left: 8px;
}

.remain {
  border-bottom: solid 1px;
}
</style>
