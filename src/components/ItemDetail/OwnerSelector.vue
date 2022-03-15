<template>
  <a-selector v-model="value" label="所有者" :options="options" />
</template>

<script lang="ts">
import { computed } from 'vue';
import { OwnerMayWithCount } from './use/owners'
</script>

<script lang="ts" setup>
import ASelector from '/@/components/UI/ASelector.vue';

const props = defineProps<{
    ownerDetails: OwnerMayWithCount[],
    modelValue: string
}>();

const emit = defineEmits<{
    (e: "update:modelValue", _value: string): void
}>();

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
</script>
