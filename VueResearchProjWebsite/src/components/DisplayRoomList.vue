<script setup>
import DisplayErrorMsgs from "@/components/DisplayErrorMsgs.vue";
import {onMounted, ref} from "vue";
const props = defineProps(['setRoomName']);
const rooms = ref([]);
const inputName = ref("");
const inputDes = ref("");
const error = ref("");

// some local vars to display static texts
const titleName = 'room name: ';
const titleDesc = 'room description: ';

// helper fn to get all rooms in the DB
async function getAllRooms() {
  const url = "api/rooms";
  const response = await fetch(url);
  if (response.ok) {
    rooms.value = await response.json();
  } else {
    await getAllRooms();
  }
}

// helper fn to create a new room
async function createOneRoom() {
  console.log(inputName.value, " ", inputDes.value)
  const url = 'api/rooms';
  const data = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: inputName.value,
      description: inputDes.value
    })
  }
  const response = await fetch(url, data);
  if (response.ok) {
    error.value = "";
    // need to call the get all rooms again to update the rooms (array) so that
    // react will rerender this portion
    await getAllRooms();
  } else {
    error.value = "ERROR: professor screwed up! please try again.";
  }
}

onMounted(() => {
  getAllRooms();
  const interval = setInterval(getAllRooms, 3000);
})
</script>

<template>
  <section class="room-list">
    <ul>
      <li v-for="room in rooms" key={{room.name}}>
        <a @click="props.setRoomName(room.name)">{{room.name}} - {{room.description}}</a>
      </li>
    </ul>
  </section>
  <section class="room-create">
    <label>
      {{titleName}}
      <input id="room-name-input" type="text" placeholder='enter room name here...'
             v-model = "inputName" />
    </label>
    <label>
      {{titleDesc}}
      <input id="room-description-input" type="text" placeholder='enter description here...'
             v-model = "inputDes" />
      <button id="submit-create-room-bt" @click="createOneRoom()">create</button>
    </label>
    <DisplayErrorMsgs :errorMsg="error"/>
  </section>
</template>

<style scoped>
  li {
    font-size: 24px;
  }
</style>