import { createRouter, createWebHistory } from "vue-router";
import Auth from "../pages/Auth.vue";
import Dashboard from "../pages/Dashboard.vue"

const routes = [
  {
    path: "/auth",
    name: "auth",
    component: Auth
  },
  {
    path: "/",
    name: "dashboard",
    component: Dashboard
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_ENV),
  routes,
});

export default router;
