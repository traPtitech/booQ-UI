<template>
  <user-icon :user-name="myName" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UserIcon from '/@/components/UI/UserIcon.vue'
import useMe from '/@/use/me'

export default defineComponent({
  name: 'MyIcon',
  components: {
    UserIcon
  },
  setup() {
    const { name: myName } = useMe()
    return { myName }
  }
})
</script>
