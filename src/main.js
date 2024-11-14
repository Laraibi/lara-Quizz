// import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Optional if you need Bootstrap's JavaScript components

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { BiCheckSquareFill,IoChatbubblesSharp,RiCloseLine } from "oh-vue-icons/icons";
addIcons(BiCheckSquareFill, IoChatbubblesSharp,RiCloseLine);

// import router from './router'

const app = createApp(App)

app.use(createPinia())
// app.use(router)
app.component("v-icon", OhVueIcon);

app.mount('#app')
