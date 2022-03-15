<template>
  <user-icon :user-name="myName" />
</template>

<script lang="ts">
import useMe from '/@/use/me'
</script>

<script lang="ts" setup>
import UserIcon from '/@/components/UI/UserIcon.vue'

const { name: myName } = useMe()
</script>
