import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from "vue-router";
import AppRooms from "@/components/AppRooms.vue";
import Welcome from "@/components/Welcome.vue";

const routes = [
    { path: '/', name: "Welcome", component: Welcome },
    { path: '/rooms', name: "AppRooms", component: AppRooms },
];

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

// 5. Create and mount the root instance.
const app = createApp(App)
// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.use(router)
app.mount('#app')
//createApp(App).mount('#app')
