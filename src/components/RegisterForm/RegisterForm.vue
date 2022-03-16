<template>
  <div :class="$style.container">
    <h1 :class="$style.title">物品登録</h1>
    <register-form-description :class="$style.item" />
    <register-form-owner :class="$style.item" />
    <normal-icon-button
      :class="$style.item"
      icon="mdi:plus-circle"
      label="登録"
      variant="primary"
      :disabled="isRegistering"
      @click="register"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { provideFormState } from './composables/useFormState'
import apis, { ItemPosted } from '/@/lib/apis'
import useAddOwner from '/@/components/ItemDetail/composables/useAddOwner'
import { useRouter } from 'vue-router'
import RegisterFormDescription from './RegisterFormDescription.vue'
import RegisterFormOwner from './RegisterFormOwner.vue'
import NormalIconButton from '/@/components/UI/NormalIconButton.vue'

const { formState, reset } = provideFormState()
const { addOwner } = useAddOwner(false)
const router = useRouter()

const isRegistering = ref(false)
const register = async () => {
  if (!confirm('本当に登録しますか？')) return

  isRegistering.value = true

  // 型変換しているのはreadOnlyのopenapiの生成がうまくいかないため
  try {
    const res = await apis.postItem(formState as unknown as ItemPosted)
    await addOwner({
      itemID: res.data.id,
      ownerType: formState.type,
      count: formState.count,
      rentalable: formState.rentalable
    })
    reset()

    router.push(`/items/${res.data.id}`)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
  }
  isRegistering.value = false
}
</script>

<style lang="scss" module>
.container {
  max-width: 600px;
  color: $color-text-primary;
  text-align: left;
}
.title {
  margin-top: 0;
  margin-bottom: 3rem;
}
.item {
  margin: 3rem 0;
  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
