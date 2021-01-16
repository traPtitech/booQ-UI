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

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { provideFormState } from './use/formState'
import RegisterFormDescription from './RegisterFormDescription.vue'
import RegisterFormOwner from './RegisterFormOwner.vue'
import apis, { ItemPosted } from '/@/lib/apis'
import useAddOwner from '/@/components/ItemDetail/use/addOwner'
import NormalIconButton from '/@/components/UI/NormalIconButton.vue'

export default defineComponent({
  name: 'RegisterForm',
  components: {
    RegisterFormDescription,
    RegisterFormOwner,
    NormalIconButton
  },
  setup() {
    const { formState, reset } = provideFormState()
    const { addOwner } = useAddOwner()

    const isRegistering = ref(false)
    const register = async () => {
      if (!confirm('本当に登録しますか？')) return

      isRegistering.value = true

      // 型変換しているのはreadOnlyのopenapiの生成がうまくいかないため
      try {
        const res = await apis.postItem((formState as unknown) as ItemPosted)
        await addOwner({
          itemID: res.data.id,
          ownerType: formState.type,
          count: formState.count,
          rentalable: formState.rentalable
        })
        reset()
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e)
      }
      isRegistering.value = false
    }

    return { formState, isRegistering, register }
  }
})
</script>

<style lang="scss" module>
.container {
  max-width: 600px;
  color: $color-text-primary;
  text-align: left;
}
.title {
  margin-top: 0;
  margin-bottom: 2rem;
}
.item {
  margin: 2rem 0;
  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
