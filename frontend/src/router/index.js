import { createRouter, createWebHistory } from 'vue-router'
import userForm from '../userForm.vue'
import todoList from '../todoApp.vue'


const routes = [
  {
    path:'/',
    redirect:{name: 'login'}
  },
  {
    path: '/login',
    name: 'login',
    component: userForm
  },
  {
    path: '/todos',
    name: 'todos',
    component:todoList
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
