import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../pages/HomeView.vue';
import LoginPage from '../pages/Login.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
