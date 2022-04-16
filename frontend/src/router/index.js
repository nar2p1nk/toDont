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
  },
  {path:'*',redirect:'/'}
]

const router = createRouter({
  mode:'history',
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next)=>{
  // redirect to login page if not logged in and
  // trying to access a restricted page
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if(authRequired && !loggedIn){
    return next('/login');
  }

  next();
})

export default router
