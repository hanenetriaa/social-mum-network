/** @format */

import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import inscriptionView from "../views/inscriptionView.vue";
import ActuView from "../views/ActuView.vue";
import InputComment from "../views/InputComment.vue";
import EditProfile from "../views/EditProfile.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/inscription",
    name: "inscription",
    component: inscriptionView,
  },
  {
    path: "/Actu",
    name: "Actu",
    component: ActuView,
  },

  {
    path: "/InputComment",
    name: "InputComment",
    component: InputComment,},
  {
    path: "/editprofile",
    name: "editprofile",
    component: EditProfile,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
