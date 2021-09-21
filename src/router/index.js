import Vue from "vue";
import VueRouter from "vue-router";
import MainArea from "@/views/MainArea.vue";
import AdminArea from "@/views/AdminArea.vue";
import NoConnection from "@/views/NoConnection";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "MainArea",
    component: MainArea,
    beforeEnter: async (to, from, next) => {
      try {
        const process = await window.electronSettings.get("process");
        const cabinet = await window.electronSettings.get("cabinet");
        if (!process || !cabinet) {
          next({ name: "AdminArea" });
          return;
        }
        next();
      } catch (e) {
        next({ name: "AdminArea" });
      }
    },
  },
  {
    path: "/admin-area",
    name: "AdminArea",
    component: AdminArea,
  },
  {
    path: "/no-connection",
    name: "NoConnection",
    component: NoConnection,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
