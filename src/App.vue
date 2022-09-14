<script setup lang="ts">
import Navigation from "./components/Navigation.vue";
window.oncontextmenu = function(e){
  //取消默认的浏览器自带右键
  e.preventDefault();
}
</script>

<template>
  <div class="container">
    <n-message-provider>
      <navigation></navigation>
      <n-divider />
      <router-view></router-view>
    </n-message-provider>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
