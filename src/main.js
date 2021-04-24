import Vue from "vue";
import { firestorePlugin } from "vuefire";
import App from "./App.vue";
import "./assets/tailwind.css";
import router from "./router";
import { i18n } from "./i18n";

Vue.config.productionTip = false;

Vue.use(firestorePlugin);

new Vue({
  router,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
