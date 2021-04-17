import Vue from "vue";
import VueI18n from "vue-i18n";
import { firestorePlugin } from "vuefire";
import App from "./App.vue";
import "./assets/tailwind.css";
import router from "./router";

Vue.config.productionTip = false;

Vue.use(firestorePlugin);
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: "en",
});

new Vue({
  router,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
