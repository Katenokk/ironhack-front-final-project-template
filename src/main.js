import { createApp } from "vue";
import "./index.css";
import App from "./App.vue";
import router from "./router/index";
import { createPinia } from "pinia";
import piniaPersist from 'pinia-plugin-persist'

const pinia = createPinia();
pinia.use(piniaPersist)

createApp(App).use(router).use(pinia).mount("#app");
