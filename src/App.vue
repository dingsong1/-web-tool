<script setup lang="ts">
import Navigation from "./components/Navigation.vue";
</script>

<template>
  <n-message-provider>
    <navigation></navigation>
    <n-divider />
    <router-view></router-view>
  </n-message-provider>
</template>

<style scoped>
</style>
