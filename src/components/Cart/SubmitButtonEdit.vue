<template>
  <wide-icon-button
    v-if="!isDelete"
    icon="mdi:arrow-right-bold-circle"
    label="変更する"
  />
  <wide-icon-button
    v-else
    icon="mdi:arrow-right-bold-circle"
    label="削除する"
    variant="caution"
  />
</template>

<script lang="ts" setup>
import WideIconButton from '/@/components/UI/WideIconButton.vue';

const props = withDefaults(defineProps<{
    isDelete?: boolean
}>(), {
    isDelete: false
});
</script>
