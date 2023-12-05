<template>
    <nav id="mainNav" class="navbar navbar-expand-lg sticky-top custom-navbar">
     <div class="container-fluid">
       <router-link to="/" class="navbar-brand  text-white">Gothenburg Dentist Clinic</router-link>
       <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
         <span class="navbar-toggler-icon"></span>
       </button>
       <div class="collapse navbar-collapse" id="navbarSupportedContent">
         <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
              <a href="#home" class="nav-link">Home</a>
            </li>
            <li class="nav-item">
              <a href="#service" class="nav-link">Services</a>
            </li>
            <li class="nav-item">
              <a href="#bookings" class="nav-link">Booking</a>
            </li>
            <li class="nav-item">
              <a href="#locations" class="nav-link">Our Locations</a>
            </li>
            <li class="nav-item">
              <a href="#aboutus" class="nav-link">About Us</a>
            </li>
         </ul>
         <span class="navbar-text" v-if="!isUserLoggedIn">
           <button @click="redirectToLogin" class="btn btn-primary me-2" style="width: 100px;">Login</button>
           
           <button @click="redirectToSignUp" class="btn btn-outline-primary" style="width: 100px;">Sign-up</button>
         </span>
         <span class="navbar-text" v-else>
           <router-link to="/userdashboard" class="btn btn-primary me-2">Account</router-link>
           <button @click="logout" class="btn btn-outline-primary">Log out</button>
         </span>
       </div>
     </div>
   </nav>
  </template>
  
  <script>
 // import { ref , onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { getToken, logout  } from '../utils/auth'
  
  
  export default {
        data() {
            return {
                isUserLoggedIn: false,
                navbarCollapsed: true
            }
        },
        mounted() {
            this.isUserLoggedIn = (getToken()) ? true : false;
            console.log(this.isUserLoggedIn)
        },
        methods: {
            logout() {
                logout();
            },
            redirectToLogin() {
                this.$router.push('/login');
            },
            redirectToSignUp() {
                this.$router.push('/register');
            },
            

        },
        components: {
          useRouter
        }
    }
</script>
  
  <style>
  
  
  .custom-navbar {
   background-color: rgb(211, 222, 222);
   
  }
  
  .nav-link:hover {
    color: hsla(160, 100%, 37%, 1); 
    background-color: rgba(44, 99, 124, 0.1); 
    transition: color 0.3s, background-color 0.3s; 
  }
  
  #navbarSupportedContent ul.navbar-nav {
    margin-left: 8%; 
    
  }
  
 
  #navbarSupportedContent .navbar-text {
    margin-right: 10%; 
  }
  
  </style>