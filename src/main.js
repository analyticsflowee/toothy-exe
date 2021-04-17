import Vue from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";
import router from "./router";

Vue.config.productionTip = false;

Vue.use(firestorePlugin);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
