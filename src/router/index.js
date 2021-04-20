import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Search from '../views/Search.vue';
import Camera from '../views/Camera.vue';
import Comments from '../views/Comments.vue';
import Gallery from '../views/Gallery.vue';
import Profile from '../views/Profile.vue';
import ProfileExternalUser from '../views/ProfileExternalUser.vue';
import ProfileEdit from '../views/ProfileEdit.vue';
import SinglePost from '../views/SinglePost.vue';
import Settings from '../views/Settings.vue';
import Signup from '../views/Signup.vue';
import Login from '../views/Login.vue';
import store from '../store/index';

// TODO: check if the user is logged in
const isUserLoggedin = (to, from, next) => {
  // console.clear();
  if (store.getters['auth/getUser']) {
    next();
  } else {
    next({ name: 'Login' });
  }
  // console.log(store.getters['auth/getUser'].user);
};

const isUserLoggedout = (to, from, next) => {
  // console.clear();
  // console.log(store.getters['auth/getUser']);
  if (!store.getters['auth/getUser']) {
    next();
  } else {
    next({ name: 'Home' });
  }
};

// const getPreviousRoute = (to, from, next) => {
//   // console.log(store);
//   // store.commit('utilsStore/setTrackRoute', from.name);
//   router.prevRoute = from;
//   next();
// };

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
    path: '/comments/:jsonPost',
    name: 'Comments',
    component: Comments,
    beforeEnter: isUserLoggedin,
    props: true,
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: Gallery,
    beforeEnter: isUserLoggedin,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: isUserLoggedin,
  },
  {
    path: '/post/:postId',
    name: 'SinglePost',
    component: SinglePost,
    beforeEnter: [isUserLoggedin],
    props: true,
  },
  {
    path: '/user/:userId',
    name: 'ProfileExternalUser',
    component: ProfileExternalUser,
    beforeEnter: [isUserLoggedin],
    props: true,
  },
  {
    path: '/profile-edit',
    name: 'ProfileEdit',
    component: ProfileEdit,
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
