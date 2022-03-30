import { createRouter, createWebHistory } from 'vue-router'
import userForm from '../userForm.vue'
import todoList from '../todoApp.vue'


const routes = [
  {
    path:'/',
    redirect:{name: 'login'}
  },
  {
    path: '/login/',
    name: 'login',
    component: userForm,
    props:{
      default:true,

      loginOrRegister:true
    }
  },
  {
    path: '/todos',
    name: 'todos',
    component:todoList
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
