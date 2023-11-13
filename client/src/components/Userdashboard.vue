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
                <a @click="showContent('bookings')" href="#" class="nav-link px-0 align-middle">
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
          <div class="dropdown pb-7">
                    <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="hugenerd" width="50" height="50" class="rounded-circle">
                        <span class="d-none d-sm-inline mx-1">loser</span>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
                        <li><a class="dropdown-item" href="#">Sign out</a></li>
                    </ul>
        </div>

    </div>
    <div class="col py-3">
        
        <div v-if="currentContent === 'bookings'">
          <Bookings />
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
  </template>
  
  <script>
  import { ref } from 'vue';
  import HomeView from '../views/HomeView.vue';
  import Bookings from './Bookings.vue';
  import Appointment from './Appointment.vue';
  import Usersetting from './Usersetting.vue';
  import Inbox from './Inbox.vue';

  
  export default {
    components: {
      HomeView,
      Bookings,
      Appointment,
      Usersetting,
      Inbox

    },
    setup() {
      const currentContent = ref('appointment');
  
      const showContent = (contentName) => {
        currentContent.value = contentName;
      };

      return {
        currentContent,
        showContent
      };
    },
        methods: {

            logout() {
                this.$router.push('/');
            }
    
    }
}


  </script>
  
  <style>
  .backgroud {
    background-color: #0e263c;
  }
  </style>
  