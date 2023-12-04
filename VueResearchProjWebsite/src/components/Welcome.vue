<script setup>
import {RouterView, RouterLink} from "vue-router";
</script>

<template>
  <p>
    Hello! Welcome to the Simple Chat Room!
  </p>
  <div class="links">
    <RouterLink to="/rooms">Go!</RouterLink>
  </div>
</template>

<style scoped>
p {
  font-size: 100px;
  font-weight: bold;
}

.links {
  font-size: 50px;
}
</style>