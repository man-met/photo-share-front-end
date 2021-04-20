import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Search from '../views/Search.vue';
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

const isUserLoggedin = (to, from, next) => {
  if (store.getters['auth/getUser']) {
    next();
  } else {
    next({ name: 'Login' });
  }
};

const isUserLoggedout = (to, from, next) => {
  if (!store.getters['auth/getUser']) {
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
