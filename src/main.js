import { createApp } from "vue";
import "./index.css";
import App from "./App.vue";
import router from "./router/index";
import { createPinia } from "pinia";
import piniaPersist from 'pinia-plugin-persist'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faCircleCheck, faFloppyDisk, faTrash, faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faCircleCheck, faFloppyDisk, faTrash, faArrowRotateLeft)


const pinia = createPinia();
pinia.use(piniaPersist)

createApp(App).use(router).use(pinia).component('font-awesome-icon', FontAwesomeIcon).mount("#app");
