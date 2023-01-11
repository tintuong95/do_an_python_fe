import { createWebHistory, createRouter } from "vue-router";
import DashBoard from "../views/DashBoard";
import StudentList from "../views/Student/StudentList.vue";
import StudentCreate from "../views/Student/StudentCreate.vue";
import StudentUpdate from "../views/Student/StudentUpdate.vue";
import ClassList from "../views/Class/ClassList.vue";
import ClassCreate from "../views/Class/ClassCreate.vue";
import ClassUpdate from "../views/Class/ClassUpdate.vue";
import Login from "../views/Auth/Login.vue";
import BaseLayout from "../layout/BaseLayout.vue";


const routes = [
  {
    path: "/",
    component: BaseLayout,
    children: [
      { path: "/", component: DashBoard },
      { path: "/students", component: StudentList },
      { path: "/students/:id", component: StudentList },
      { path: "/student-create", component: StudentCreate },
      { path: "/student-update/:id", component: StudentUpdate },
      { path: "/class-list", component: ClassList },
      { path: "/class-create", component: ClassCreate },
      { path: "/class-update/:id", component: ClassUpdate },
    ],
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    component: Login,
    meta: { requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const isAuth =JSON.parse(sessionStorage.getItem("isLogin"))
  if (to.meta.requiresAuth && !isAuth) {
    return {
      path: "/login",
    };
  }
});
export default router;
