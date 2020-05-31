// ./source/routes.js
import Login from "./components/login/Login.vue";
import ListTaskgroup from "./components/taskgroup/list-taskgroup/ListTaskgroup.vue";
import ShowTaskgroup from "./components/taskgroup/show-taskgroup/Show-Taskgroup.vue";

export const routes = [
  {
    name: "login",
    path: "/login",
    component: Login
  },
  {
    name: "listTaskgroup",
    path: "/taskgroup/list",
    component: ListTaskgroup,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: "showTaskgroup",
    path: "/taskgroup/show/:id",
    component: ShowTaskgroup,
    props: true,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: "*",
    component: Login
  }
];
