import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PocketBase from "pocketbase";
import "bootstrap/dist/js/bootstrap.js";

import "bootstrap/dist/css/bootstrap.css";
const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);

const app = createApp(App);

app.use(router);
app.provide("pocketbase", pb);

app.mount("#app");
