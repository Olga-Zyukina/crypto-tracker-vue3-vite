import { createRouter, createWebHistory } from 'vue-router'
import { ROUTES_PATHS } from '../constants/index'
import Home from '../pages/Home.vue'
import UserProfile from '../pages/UserProfile.vue'
import Faq from '../pages/Faq.vue'
import Contact from '../pages/Contact.vue'
import Register from '../pages/Register.vue'
import Login from '../pages/Login.vue'
import Error_404 from '../pages/Error-404.vue'
import Chart from '../pages/Chart.vue'
import Cap from '../pages/Cap.vue'
import Price from '../pages/Price.vue'
import News from '../pages/News.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTES_PATHS.HOME,
      name: 'home',
      component: Home,
      props: true
    },
    {
      path: ROUTES_PATHS.USERPROFILE,
      name: 'userprofile',
      component: UserProfile
    },
    {
      path: ROUTES_PATHS.FAQ,
      name: 'faq',
      component: Faq
    },
    {
      path: ROUTES_PATHS.CONTACT,
      name: 'contact',
      component: Contact
    },
    {
      path: ROUTES_PATHS.REGISTER,
      name: 'register',
      component: Register
    },
    {
      path: ROUTES_PATHS.LOGIN,
      name: 'login',
      component: Login
    },
    {
      path: ROUTES_PATHS.ERROR_404,
      name: 'error-404',
      component: Error_404
    },
    {
      path: ROUTES_PATHS.CHART,
      name: 'chart',
      component: Chart,
      props: true
    },
     {
      path: ROUTES_PATHS.CAP,
      name: 'cap',
      component: Cap
    },
    {
      path: ROUTES_PATHS.PRICE,
      name: 'price',
      component: Price
    },
    {
      path: ROUTES_PATHS.NEWS,
      name: 'news',
      component: News
    },
  ]
})

export default router