<script setup>
import DisplayRoomList from "@/components/DisplayRoomList.vue";
import DisplayChatMsgs from "@/components/DisplayChatMsgs.vue";
import UserInfo from "@/components/UserInfo.vue";
import {onMounted, ref} from 'vue'
const roomName = ref("")
const username = ref("");

function setUsername(userInput) {
  username.value = userInput
}

function setRoomName(userInput) {
  roomName.value = userInput
}

// helper fn to extract the current userId from browser cookie
function getCookieValue(key) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(key + '=')) {
      return cookie.substring(key.length + 1, cookie.length);
    }
  }
  return '';
}

// helper fn to look up username
function lookupUsername(array) {
  const id = getCookieValue('publicUserId');
  for (let i = 0; i < array.length; i++) {
    if (array[i].publicUserId === id) {
      // found the user, return the current name
      return array[i].name;
    }
  }
  return '';
}

onMounted(() => {
  async function initializeUsername() {
    // do a get all users request in case shit happens
    const url = 'api/users';
    const response = await fetch(url);
    if (response.ok) {
      const result = await response.json();
      username.value = lookupUsername(result);
    } else {
      // if bad request, call the fn again
      await initializeUsername();
    }
  }
  initializeUsername();
})

</script>

<template>
  <section v-if="roomName === ''" class="display-room-list">
    <UserInfo :username="username" :setUsername = "setUsername"/>
    <DisplayRoomList :setRoomName="setRoomName"/>
  </section>
  <section v-else class="display-chat-msg">
    <UserInfo :username="username" :setUsername = "setUsername"/>
    <DisplayChatMsgs :roomName="roomName"/>
  </section>
</template>
