import { createRouter, createWebHistory } from 'vue-router'
import { apiIsLoggedIn } from '../helpers/auth'
import { getDiscordInformation } from '../helpers/discordmapper'
import { apiLoginDiscord } from '../api/login'
import { setOAUTH } from '../helpers/auth'

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
      const fragment = new URLSearchParams(window.location.hash.slice(1));
      const [access_token, token_type] = [fragment.get('access_token'), fragment.get('token_type')];

      if (access_token && token_type){
        return getDiscordInformation(`${token_type} ${access_token}`)
        .then((res) => {
            if (apiLoginDiscord(res.data)){
              setOAUTH(`${token_type} ${access_token}`)
              return next({
                name: 'Home'
              })
            } 
        })
      }
      next()
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
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
    path: '/movies',
    name: 'Movies',
    component: () => import('../views/Movies.vue'),
    beforeEnter: (to, from, next) => {
      if (!apiIsLoggedIn()){
        return next({
          name: 'Login'
        })
      } else {
        next();
      }
    },
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
