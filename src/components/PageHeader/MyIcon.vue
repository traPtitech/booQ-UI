<template>
  <user-icon :user-name="myName" />
</template>

<script lang="ts" setup>
import useMe from '/@/use/me'
import UserIcon from '/@/components/UI/UserIcon.vue'

const { name: myName } = useMe()
</script>
