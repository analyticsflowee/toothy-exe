import Vue from "vue";
import VueRouter from "vue-router";
import MainArea from "@/views/MainArea.vue";
import SelectCabinet from "@/views/SelectCabinet.vue";
import AdminArea from "@/views/AdminArea.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "MainArea",
    component: MainArea,
    beforeEnter: async (to, from, next) => {
      const process = await window.electronSettings.get("process");
      if (!process) {
        next({ name: "AdminArea" });
        return;
      }
      const cabinet = await window.electronSettings.get("cabinet");
      if (!cabinet) {
        next({ name: "SelectCabinet" });
        return;
      }
      next();
    },
  },
  {
    path: "/select-cabinet",
    name: "SelectCabinet",
    component: SelectCabinet,
  },
  {
    path: "/admin-area",
    name: "AdminArea",
    component: AdminArea,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
