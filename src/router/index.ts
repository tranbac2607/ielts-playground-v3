import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../pages/HomeView.vue';
import RegisterPage from '../pages/register.vue';
import LoginPage from '../pages/login.vue';

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
  {
    path: '/register',
    name: 'register',
    component: RegisterPage,
  },
  {
    path: '/listening',
    name: 'listening',
    component: () => import('../pages/listening.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
