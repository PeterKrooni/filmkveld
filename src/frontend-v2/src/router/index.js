import { createRouter, createWebHistory } from 'vue-router'
import { apiIsLoggedIn } from '../helpers/auth'

const routes = [
  {
    path: '/',
    name: 'Home',   
    component: () => import('../views/Home.vue'),
    beforeEnter: (to, from, next) => {
      if (!apiIsLoggedIn()){
        return next({
          name: 'Login'
        })
      } else {
        next();
      }
    },
  },
  {
    path: '/login',
    name: 'Login',   
    component: () => import('../views/Login.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
