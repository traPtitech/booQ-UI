<template>
  <div :class="$style.container">
    <h3>管理者権限の付与</h3>
    <p>管理者権限を付与します。</p>
    <div :class="$style.users">
      <label v-for="user in users" :key="user.id" :class="$style.label">
        <input-checkbox
          :label="`@${user.name}`"
          :model-value="user.admin"
          @update:model-value="toggleAdmin(user.id)"
        />
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue';
import apis, { User } from '/@/lib/apis'
import { useToast } from '/@/store/toast'
</script>

<script lang="ts" setup>
import InputCheckbox from '/@/components/UI/InputCheckbox.vue';

const toastStore = useToast()

const users = ref<User[]>([])

const fetchData = async () => {
  const { data } = await apis.getUsers()
  users.value = data
}

onMounted(fetchData)

const toggleAdmin = async (userId: number) => {
  const user = users.value.find(u => u.id === userId)
  if (!user) return

  try {
    const res = await apis.editUser({ ...user, admin: !user.admin })
    const updatedUser = res.data

    const userIndex = users.value.findIndex(
      user => user.id === updatedUser.id
    )
    users.value[userIndex] = updatedUser
  } catch (e) {
    toastStore.addToast({
      type: 'error',
      text: `ユーザーの変更に失敗しました: ${e}`
    })
  }
}
</script>

<style lang="scss" module>
.container {
  text-align: left;
}
.users {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20ch, 1fr));
  gap: 0.5rem;
}
.label {
  display: flex;
  align-items: center;
}
.name {
  margin-left: 0.2rem;
}
</style>
