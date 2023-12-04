<script setup>
import {RouterView, RouterLink} from "vue-router";
import {ref} from "vue";
const roomName = ref("")
const username = ref("");

function setUsername(userInput) {
  username.value = userInput
}

function setRoomName(userInput) {
  roomName.value = userInput
}
</script>

<template>
  <main>
    <router-view />
  </main>

</template>

<style scoped>

</style>