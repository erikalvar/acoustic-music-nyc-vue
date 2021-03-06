import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import EventsIndex from "../views/EventsIndex.vue";
import EventsApproveIndex from "../views/EventsApproveIndex.vue";
import EventsNew from "../views/EventsNew.vue";
import EventsShow from "../views/EventsShow.vue";
import EventsEdit from "../views/EventsEdit.vue";
import UsersShow from "../views/UsersShow.vue";
import UsersEdit from "../views/UsersEdit.vue";

Vue.use(VueRouter);

const routes = [
  // Events Index should be home path
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout
  },
  {
    path: '/',
    name: 'events-index',
    component: EventsIndex
  },
  {
    path: '/events/approve',
    name: 'events-approve-index',
    component: EventsApproveIndex
  },
  {
    path: '/events/new',
    name: 'events-new',
    component: EventsNew
  },
  {
    path: '/events/:id',
    name: 'events-show',
    component: EventsShow
  },
  {
    path: '/events/:id/edit',
    name: 'events-edit',
    component: EventsEdit
  },
  {
    path: '/users/:id',
    name: 'users-show',
    component: UsersShow
  },
  {
    path: '/users/:id/edit',
    name: 'users-edit',
    component: UsersEdit
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
