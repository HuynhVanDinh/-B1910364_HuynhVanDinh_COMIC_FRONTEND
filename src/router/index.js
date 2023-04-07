import { createWebHistory, createRouter } from "vue-router";
import Comic from "@/views/Comic.vue";
const routes = [
  {
    path: "/",
    name: "comic",
    component: Comic,
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
