<template>
  <icon
    v-if="isAdmin"
    name="mdi:cogs"
    :class="$style.container"
    @click="onClick"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import Icon from '/@/components/UI/Icon.vue'
import useMe from '/@/use/me'

export default defineComponent({
  name: 'AdminPageLink',
  components: {
    Icon
  },
  setup() {
    const { admin: isAdmin } = useMe()
    const router = useRouter()

    const onClick = () => {
      router.push('/admin')
    }

    return { isAdmin, onClick }
  }
})
</script>

<style lang="scss" module>
.container {
  cursor: pointer;
}
</style>
