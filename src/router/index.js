import { createRouter, createWebHistory } from "vue-router";
import Auth from "../pages/Auth.vue";
import Dashboard from "../pages/Dashboard.vue";
import ResetPassword from "../pages/ResetPassword.vue";

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
  },
  {
    path: "/reset_pwd",
    name: "reset_pwd",
    component: ResetPassword
  },
  {
    path: "/*",
    component: 404
    },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_ENV),
  routes,
});

export default router;
