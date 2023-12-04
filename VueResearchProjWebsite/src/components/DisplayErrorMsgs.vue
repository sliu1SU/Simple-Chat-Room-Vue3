// error msg component to display error msg

<script setup>
// import {ref} from 'vue'
// const errorMsg = ref("")
const props = defineProps(['errorMsg'])
</script>

<template>
  <section class="error-msg">
    {{ props.errorMsg }}
  </section>
</template>

<style scoped>
.error-msg {
  color: red;
  font-weight: bold;
  font-size: 24px;
}
</style>