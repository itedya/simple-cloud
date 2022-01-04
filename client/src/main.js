import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { vfmPlugin } from "vue-final-modal";
import "./scss/_reset.scss";
import "./scss/_container.scss";
import "./scss/_card.scss";
import "./scss/_button.scss";
import "./composables/shift-is-pressed-listener.composable";

createApp(App).use(vfmPlugin).use(router).mount("#app");
