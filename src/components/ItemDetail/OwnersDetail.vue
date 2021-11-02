<template>
  <div :class="$style.container">
    <div :class="$style.userIconWrapper">
      <a-icon
        v-if="!ownerDetail.rentalable"
        :class="$style.icon"
        name="mdi:cancel"
      />
      <user-icon :user-name="ownerDetail.userName" />
    </div>
    <div :class="$style.numContainer">
      <div>{{ ownerDetail.count }}</div>
      <div :class="$style.all">{{ ownerDetail.all }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import UserIcon from '/@/components/UI/UserIcon.vue'
import { OwnerDetail } from './use/owners'
import AIcon from '/@/components/UI/AIcon.vue'

export default defineComponent({
  name: 'OwnersDetail',
  components: {
    AIcon,
    UserIcon
  },
  props: {
    ownerDetail: {
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

.userIconWrapper {
  position: relative;
}

.icon {
  position: absolute;
  bottom: 0;
  left: 0;
  color: $color-text-secondary;
  pointer-events: none;
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
