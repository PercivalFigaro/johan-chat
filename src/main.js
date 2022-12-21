import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';
import PocketBase from 'pocketbase';
import 'bootstrap/dist/js/bootstrap.js';

import 'bootstrap/dist/css/bootstrap.css';
const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.provide('pocketbase', pb);

app.mount('#app');

export default pb;
