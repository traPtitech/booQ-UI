<template>
  <div>Admin Page</div>
  <ul>
    <li v-for="user in users" :key="user.id">
      {{ user.displayName }} (@{{ user.name }})
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue'
import apis, { User } from '/@/lib/apis'
import useTitle from './use/title'

export default defineComponent({
  name: 'Admin',
  setup() {
    useTitle(computed(() => '管理画面'))

    const users = ref<User[]>([])
    onMounted(async () => {
      const { data } = await apis.getUsers()
      users.value = data
    })

    return { users }
  }
})
</script>
