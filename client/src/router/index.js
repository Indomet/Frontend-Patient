import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Booking from '../components/Booking.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Userdashboard from '../components/Userdashboard.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path:'/booking',
      name: 'booking',
      component: Booking
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/userdashboard',
      name: 'userdashboard',
      component: Userdashboard
    },
    
    
   
    
  ]
})

export default router
