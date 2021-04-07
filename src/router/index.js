import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Search from '../views/Search.vue';
import Camera from '../views/Camera.vue';
import Profile from '../views/Profile.vue';
import Settings from '../views/Settings.vue';
import Signup from '../views/Signup.vue';
import Login from '../views/Login.vue';
import store from '../store/index';

// TODO: check if the user is logged in
const isUserLoggedin = (to, from, next) => {
  if (store.getters['user/getUser']) {
    next();
  } else {
    next({ name: 'Login' });
  }
  // console.log(store.getters['user/getUser'].user);
};

const isUserLoggedout = (to, from, next) => {
  // console.log(store.getters['user/getUser']);
  if (!store.getters['user/getUser']) {
    next();
  } else {
    next({ name: 'Home' });
  }
};

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: isUserLoggedin,
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
    beforeEnter: isUserLoggedin,
  },
  {
    path: '/camera',
    name: 'Camera',
    component: Camera,
    beforeEnter: isUserLoggedin,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: isUserLoggedin,
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    beforeEnter: isUserLoggedin,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    beforeEnter: isUserLoggedout,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: isUserLoggedout,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
