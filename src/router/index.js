import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/pinia',
    name: 'pinia',
    component: () => import('../views/TaskPinia.vue'),
  },
  {
    path: '/book',
    name: 'book',
    component: () => import('../views/BookTask.vue'),
  },
  {
    path: '/newTask',
    name: 'newTask',
    component: () => import('../views/newTask.vue'),
  },
  {
    path: '/new2',
    name: 'new2',
    component: () => import('../views/new2.vue'),
  },

  {
    path: '/login',
    name: 'login',
    meta: {
      auth: true,
    },
    component: () => import('../views/LogIn.vue'),
  },

  {
    path: '/pages',
    name: 'Pages',
    meta: {
      permissions: 'pages',
    },
    component: () => import('../views/Pages.vue'),
  },
  {
    path: '/users',
    name: 'Users',
    meta: {
      permissions: 'users',
    },
    component: () => import('../views/Users.vue'),
  },
  {
    path: '/setting',
    name: 'Setting',
    meta: {
      permissions: 'settings',
    },
    component: () => import('../views/Setting.vue'),
  },

  {
    path: '/articles',
    name: 'Articles',
    meta: {
      permissions: 'articles',
    },
    component: () => import('../views/Articles.vue'),
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    meta: {
      auth: true,
    },
    component: () => import('../views/SignUp.vue'),
  },
  {
    path: '/access-denied',
    name: '401',

    component: () => import('../views/401.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
