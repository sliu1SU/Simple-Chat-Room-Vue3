<script setup>
import DisplayErrorMsgs from "@/components/DisplayErrorMsgs.vue";
import {onMounted, ref} from "vue";
const props = defineProps(['roomName']);
const msgList = ref([]);
const userInput = ref("");
const error = ref("");

// helper fn to add poster name and post date to the message array
async function postprocessMsgList(msgList) {
  // get all users first
  const url = "api/users";
  const response = await fetch(url);
  if (response.ok) {
    const userList = await response.json();
    // get all users via api call, then lookup the username
    // and convert the timestamp to actual date
    for (let i = 0; i < msgList.length; i++) {
      const id = msgList[i].posterId;
      msgList[i]["posterName"] = userList.find(({publicUserId}) => publicUserId === id).name;
      msgList[i]["date"] = new Date(Number(msgList[i].timestamp)).toLocaleString('en-US');
    }
  } else {
    await postprocessMsgList(msgList);
  }
}

// helper fn to get all the chat msgs in this room
async function getAllTxt() {
  const url = "api/rooms/" + props.roomName.value + "/chats";
  const response = await fetch(url);
  if (response.ok) {
    const result  = await response.json(); // this will return an array of msgs
    // attach username and date for output purpose
    await postprocessMsgList(result);
    // call setter once postprocessing is done
    msgList.value = result;
  } else {
    await getAllTxt();
  }
}

// helper fn to handle sending one msg to the current chat room
async function sendOneMsg() {
  const url = "api/rooms/" + props.roomName.value + "/chats";
  const data = {
    method: 'POST',
    body: userInput.value
  };
  const response = await fetch(url, data);
  if (response.ok) {
    error.value = "";
    // call this fn again to let react know to rerender the chat list
    await getAllTxt();
  } else {
    error.value = "ERROR: professor screwed up! please try again.";
  }
}

onMounted(() => {
  getAllTxt();
  setInterval(getAllTxt, 3000);
})
</script>

<template>
  <section class="show-msgs">
    <h1 id="chat-room-title">Chat Room: {{ props.roomName }}</h1>
    <ul class="chat-msg-ul">
      <li v-for="msg in msgList" key={{msg.timestamp}}>
        {{ msg.posterName }} @ {{ msg.date }}: {{ msg.messageText }}
      </li>
    </ul>
  </section>
  <section class="new-chat-msg-input">
    <input id="new-msg-input" type="text" v-model="userInput"/>
    <button id="send-new-msg-bt" @click="sendOneMsg()">send</button>
  </section>
  <DisplayErrorMsgs :errorMsg="error"/>
</template>

<style scoped>
.chat-msg-ul {
  color: yellowgreen;
  font-size: 24px;
}

#chat-room-title {
  font-weight: bold;
  font-size: 48px;
  background: linear-gradient(to right, #ef5350, #f48fb1, #7e57c2, #2196f3, #26c6da, #43a047, #eeff41, #f9a825, #ff5722);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

#send-new-msg-bt {
  font-size: 24px;
  background-color: #f48fb1;
}

#new-msg-input {
  height: 36px;
  width: 512px;
  margin-right: 12px;
}
</style>