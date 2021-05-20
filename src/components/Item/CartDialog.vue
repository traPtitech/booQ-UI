<template>
  <dialog-template title="一括で借りる物品に追加" @close="close">
    <div :class="$style.container">
      <h3 :class="$style.title">{{ item.name }}</h3>
      <form @submit.prevent="() => {}">
        <div :class="$style.flex">
          <img :src="imgUrl" :class="$style.img" />
          <div :class="$style.inputContainer">
            <input-number
              v-model="count"
              label="個数"
              :max="maxCount"
              :min="1"
            />
          </div>
        </div>
        <wide-icon-button
          icon="mdi:arrow-down-bold-circle"
          label="追加する"
          type="submit"
          :class="$style.button"
          @click="click"
        />
      </form>
    </div>
  </dialog-template>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import DialogTemplate from '/@/components/UI/DialogTemplate.vue'
import WideIconButton from '/@/components/UI/WideIconButton.vue'
import InputNumber from '/@/components/UI/InputNumber.vue'
import { ItemSummary, traP_ID } from '/@/lib/apis'
import NoImg from '/@/assets/img/no-image.svg'

export default defineComponent({
  name: 'AddOwnerDialog',
  components: {
    DialogTemplate,
    WideIconButton,
    InputNumber
  },
  props: {
    item: {
      type: Object as PropType<ItemSummary>,
      required: true
    }
  },
  emits: {
    close: () => true,
    add: (_: { id: number, count: number }) => true
  },
  setup(props, context) {
    const imgUrl = computed(() => props.item.imgUrl || NoImg)
    const maxCount = props.item.latestLogs?.find(v => v.ownerId === traP_ID)?.count ??
      props.item.owners.find(v => v.ownerId === traP_ID)?.count ??
      1
    const count = ref(1)

    const close = () => {
      context.emit('close')
    }

    const click = () => {
      context.emit('add', { id: props.item.id, count: count.value })
      close()
    }
    return { count, close, imgUrl, maxCount, click }
  }
})
</script>

<style lang="scss" module>
.container {
  max-width: 360px;
}
.title {
  word-break: break-all;
}
.flex {
  display: flex;
}
.img {
  max-width: 50%;
}
.inputContainer {
  margin-left: 1rem;
  width: 100%;
}
.button {
  margin: auto;
  margin-top: 32px;
}
</style>
