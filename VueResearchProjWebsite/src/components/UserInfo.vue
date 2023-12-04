<script setup>
import DisplayErrorMsgs from '@/components/DisplayErrorMsgs.vue';
const props = defineProps(['username', 'setUsername'])
import {onMounted, onUnmounted, ref} from 'vue'
const inEdit = ref(false)
const title = ref("Your Name: ")
const title2 = ref('new username name: ')
const error = ref("");
const userInput = ref("");

function setInEdit() {
  if (inEdit.value === false) {
    inEdit.value = true;
  } else {
    inEdit.value = false;
  }
}
async function changeUserName() {
  console.log(userInput.value);
  const url = 'api/account/name';
  const data = {
    method: 'PUT',
    body: userInput.value
  };
  // use fetch to call account api to update username
  const response = await fetch(url, data);
  if (response.ok) {
    props.setUsername(userInput.value);
    error.value = "";
    // update the setInEdit var to tell react to re-render
    inEdit.value = false;
  } else {
    error.value = "ERROR: professor screwed up! please try again.";
  }
}
</script>

<template>
  <section class="username-display-edit">
    <section v-if="!inEdit">
      <div>{{title}}{{username}}</div>
      <button id="edit-username-bt" @click="setInEdit()">edit</button>
    </section>
    <section v-else>
      {{title2}}
      <input
          id="username-input"
          type="text"
          v-model = "userInput"
          placeholder='Enter your new username' />
      <button id="submit-username-change-bt" @click="changeUserName()">save</button>
    </section>
    <DisplayErrorMsgs :errorMsg="error" />
  </section>
</template>

<style scoped>

</style>