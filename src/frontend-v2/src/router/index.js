import { createRouter, createWebHistory } from 'vue-router'
import { apiIsLoggedIn } from '../helpers/auth'
import { getDiscordId } from '../helpers/discordmapper'

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
    component: () => import('../views/Login.vue'),
    beforeEnter: (to, from, next) => {
      const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
      let access_token = params.code; 
      if (access_token){
        getDiscordId(access_token)
      }
      next()
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/movies',
    name: 'Movies',
    component: () => import('../views/Movies.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
