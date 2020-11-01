<template>
  <div :class="$style.container">
    <user-icon :user-name="detail.userName" />
    <div :class="$style.numContainer">
      <div :class="$style.remain">{{ detail.count }}</div>
      <div :class="$style.all">{{ detail.all }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import UserIcon from '/@/components/UI/UserIcon.vue'
import { OwnerDetail } from './use/owners'

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
  margin-left: 0.5rem;
  text-align: center;
}

.all {
  padding: 1px 2px 0 2px;
  border-top: solid 1px;
}
</style>
