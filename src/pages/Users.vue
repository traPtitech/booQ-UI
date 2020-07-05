<template>
  <div>Users Page</div>
  <ul>
    <li v-for="user in users" :key="user.id">
      {{ user.displayName }} (@{{ user.name }})
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import apis, { User } from '/@/lib/apis'

export default defineComponent({
  name: 'Users',
  setup() {
    const users = ref<User[]>([])
    onMounted(async () => {
      const { data } = await apis.getUsers()
      users.value = data
    })

    return { users }
  }
})
</script>
