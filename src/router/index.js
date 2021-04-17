import Vue from "vue";
import VueRouter from "vue-router";
import Main from "@/views/Main.vue";
import SelectCabinet from "@/views/SelectCabinet.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
    beforeEnter: async (to, from, next) => {
      const cabinet = await window.electronSettings.get("cabinet");
      if (!cabinet) {
        next({ name: "SelectCabinet" });
      }
      next();
    },
  },
  {
    path: "/select-cabinet",
    name: "SelectCabinet",
    component: SelectCabinet,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
