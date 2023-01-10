import { createWebHistory, createRouter } from "vue-router"
import DashBoard from "../views/DashBoard"
import About from "../views/About.vue"
import StudentList from "../views/Student/StudentList.vue"
import StudentCreate from "../views/Student/StudentCreate.vue"
import StudentUpdate from "../views/Student/StudentUpdate.vue"
import ClassList from "../views/Class/ClassList.vue"
import ClassCreate from "../views/Class/ClassCreate.vue"
import ClassUpdate from "../views/Class/ClassUpdate.vue"


const routes = [
    { path: '/', component: DashBoard },
    { path: '/about', component: About },
    { path: '/students', component: StudentList },
    { path: '/students/:id', component: StudentList },
    { path: '/student-create', component: StudentCreate },
    { path: '/student-update/:id', component: StudentUpdate },
    { path: '/class-list', component: ClassList },
    { path: '/class-create', component: ClassCreate },
    { path: '/class-update/:id', component: ClassUpdate },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router

