<template>
    <div class="container-fluid">
      <div class="row flex-nowrap">

        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 backgroud">
          <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <span class="fs-4 d-none d-sm-inline">
              <div v-if="currentUser">
                <h4>Hello, {{ currentUser }}</h4>
              </div>
              <div v-else>
                ToothCheck App
              </div>
            </span>
            <hr style="background-color: white; width: 100%; height: 2px; margin-top: 2px; margin-bottom: 2px;">
            <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
              <li class="nav-item">
                <a href="/" class="nav-link align-middle px-0">
                  <i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline">Home</span>
                </a>
              </li>
              <li>
                <a @click="showContent('openstreetmap')" href="#" class="nav-link px-0 align-middle">
                  <i class="fs-4 bi-calendar2-event"></i> <span class="ms-1 d-none d-sm-inline">Schedule Appointments</span>
                </a>
              </li>


              <li>
                <a @click="showContent('appointment')" href="#" class="nav-link px-0 align-middle">
                  <i class="fs-4 bi-table"></i> <span class="ms-1 d-none d-sm-inline">My Appointments</span>
                </a>
              </li>
<!--
              <li>
                <a @click="showContent('message')" href="#" class="nav-link px-0 align-middle">
                  <i class="fs-4 bi-chat-dots"></i> <span class="ms-1 d-none d-sm-inline">Notifications</span>
                </a>
              </li>
-->
              <li>
                <a @click="showContent('profile')" href="#" class="nav-link px-0 align-middle">
                  <i class="fs-4 bi-person-circle"></i> <span class="ms-1 d-none d-sm-inline">Profile</span>
                </a>
              </li>
              <li>
                <a @click="logout()" href="#" class="nav-link px-0 align-middle">
                  <i class="fs-4 bi-box-arrow-right"></i> <span class="ms-1 d-none d-sm-inline">Sign out</span>
                </a>
              </li>

            </ul>
          </div>
    </div>
    <div class="col py-3">

        <div v-if="currentContent === 'openstreetmap'">
          <Openstreetmap/>
        </div>

        <div v-if="currentContent === 'appointment'">
          <Appointment />
        </div>
<!--
        <div v-if="currentContent === 'message'">
          <Inbox />
        </div>-->

        <div v-if="currentContent === 'profile'">
          <Profile/>
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
  import Profile from './Profile.vue';
  import Openstreetmap from './Openstreetmap.vue';
  import { getToken, logout} from '@/utils/auth';
  //import { mapActions } from 'vuex';mapActions



  export default {
    components: {
      HomeView,
      Booking,
      Appointment,
      Profile,
      Openstreetmap

    },
    data(){
        return {
            currentUser: JSON.parse(localStorage.getItem('user')).first_name,
        }
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
