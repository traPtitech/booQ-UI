<template>
  <a-selector v-model="value" label="所有者" :options="options" />
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { OwnerMayWithCount } from './use/owners'
import ASelector from '/@/components/UI/ASelector.vue'

export default defineComponent({
  userName: 'OwnerSelector',
  components: {
    ASelector
  },
  props: {
    ownerDetails: {
      type: Object as PropType<OwnerMayWithCount[]>,
      required: true
    },
    modelValue: {
      type: String,
      required: true
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:modelValue': (_value: string) => true
  },
  setup(props, context) {
    const value = computed<string>({
      get() {
        return props.modelValue
      },
      set(v) {
        context.emit('update:modelValue', v)
      }
    })
    const options = computed(() =>
      props.ownerDetails.map(d => ({
        key: d.userName,
        label: `${d.userName} ${d.count ? `(${d.count})` : ''}`,
        disabled: d.count === 0
      }))
    )
    return { value, options }
  }
})
</script>
