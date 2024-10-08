import { createPinia } from "pinia";
import { createApp } from "vue";

import App from "./ui/App.vue";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.mount("#ui");
