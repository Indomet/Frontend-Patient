import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Booking from '../components/Booking.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Userdashboard from '../components/Userdashboard.vue'
import { getToken } from '../utils/auth'


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
      component: Userdashboard,
      meta: {requiresAuth: true}
    }
    
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
      // Check if the user is authenticated
      const token = getToken();

      if (!token) {
          return next('/login'); // Redirect to the login page if not authenticated
      }

      // Continue to the protected route
      next();
  } else {
      next(); // Allow access to public routes
  }
});

function isUserLoggedIn(to, from, next) {
  if (!getToken()) {
      next();
  } else {
      next('/userdashboard');
  }
}

export default router
