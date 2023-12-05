<template>
    <div class="container-fluid">
      <div class="row flex-nowrap">

        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 backgroud">
          <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
              <span class="fs-5 d-none d-sm-inline">User Accounter</span>
            </a>
            <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
              <li class="nav-item">
                <a href="/" class="nav-link align-middle px-0">
                  <i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline">Home</span>
                </a>
              </li>
              <li>
                <a @click="showContent('booking')" href="#" class="nav-link px-0 align-middle">
                  <i class="fs-4 bi-calendar2-event"></i> <span class="ms-1 d-none d-sm-inline">Booking</span>
                </a>
              </li>

              <li>
                <a @click="showContent('appointment')" href="#" class="nav-link px-0 align-middle">
                  <i class="fs-4 bi-table"></i> <span class="ms-1 d-none d-sm-inline">Appointment</span>
                </a>
              </li>

              <li>
                <a @click="showContent('message')" href="#" class="nav-link px-0 align-middle">
                  <i class="fs-4 bi-chat-dots"></i> <span class="ms-1 d-none d-sm-inline">Message</span>
                </a>
              </li>

              <li>
                <a @click="showContent('profile')" href="#" class="nav-link px-0 align-middle">
                  <i class="fs-4 bi-person-circle"></i> <span class="ms-1 d-none d-sm-inline">Profile</span>
                </a>
              </li>
              <li>
                <a @click="logout " href="#" class="nav-link px-0 align-middle">
                  <i class="fs-4 bi-box-arrow-right"></i> <span class="ms-1 d-none d-sm-inline">Sign out</span> 
                </a>
              </li>

            </ul>
          </div>
    </div>
    <div class="col py-3">
        
        <div v-if="currentContent === 'booking'">
          <Booking />
        </div>

        <div v-if="currentContent === 'appointment'">
          <Appointment />
        </div>

        <div v-if="currentContent === 'message'">
          <Inbox />
        </div>

        <div v-if="currentContent === 'profile'">
          <Usersetting />
        </div>
      </div>
      </div>
    </div>

  </template>
  
  <script>
  import { ref } from 'vue';
  import HomeView from '../views/HomeView.vue';
  import Booking from './Booking.vue';
  import Appointment from './Appointment.vue';
  import Usersetting from './Usersetting.vue';
  import Inbox from './Inbox.vue';
  import { getToken,logout } from '@/utils/auth'
  

  
  export default {
    components: {
      HomeView,
      Booking,
      Appointment,
      Usersetting,
      Inbox

    },
    setup() {
      const currentContent = ref('appointment');
  
      const showContent = (contentName) => {
        currentContent.value = contentName;
      };

      const token = getToken();
      const isUserLoggedIn = !!token;  // check if the user is logged with token



    return {
      currentContent,
      showContent,
      logout,
      isUserLoggedIn
      
    };
  },

    methods: {
    logout() {
        logout();
      }
    
  }
}


  </script>
  
  <style>
  .backgroud {
    background-color: #0e263c;
  }
  </style>
  