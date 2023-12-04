<template>
    <div class="modal modal-sheet position-static d-block bg-body-secondary p-4 py-md-5" tabindex="-1" role="dialog"
      id="modalSignin">
      <div class="modal-dialog" role="document">
        <div class="modal-content rounded-4 shadow">
          <div class="modal-header p-5 pb-4 border-bottom-0">
            <h1 class="fw-bold mb-0 fs-2">Sign up for free</h1>
          </div>
  
          <div class="modal-body p-5 pt-0">
            <form class="" @submit.prevent="register">
              <div class="form-floating mb-3">
                <input type="email" v-model="email" class="form-control rounded-3" id="floatingInput"
                  placeholder="name@example.com">
                <label for="floatingInput">Email address</label>
              </div>
  
              <div class="form-floating mb-3">
                <input type="password" v-model="password" class="form-control rounded-3" id="floatingPassword"
                  placeholder="Password">
                <label for="floatingPassword">Password</label>
              </div>
              <div class="form-floating mb-3">
                <input type="text" v-model="first_name" class="form-control rounded-3" id="floatingInput"
                  placeholder="First name">
                <label for="floatingInput">First name</label>
              </div> 
              <div class="form-floating mb-3">
                <input type="text" v-model="last_name" class="form-control rounded-3" id="floatingInput"
                  placeholder="Last name">
                <label for="floatingInput">Last name</label>
              </div>
              <div class="form-floating mb-3">
                <input type="num" v-model="phone_number" class="form-control rounded-3" id="floatingInput"
                  placeholder="Telphone Number">
                <label for="floatingInput">Telphone Number</label>
              </div>
              <button class="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit" >Sign up</button>
              <small class="text-body-secondary">By clicking Sign up, you agree to the terms of use.</small>
              <hr class="my-4">
              <h2 class="fs-5 fw-normal mb-3">Already have an account</h2>
  
              <button class="w-100 py-2 mb-2 btn btn-outline-primary rounded-3" type="submit" @click="redirectToLogin">
                <svg class="bi me-1" width="16" height="16"></svg>
                Sign in with Email
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  //import axiosInstance from '@/axios.js'; 
  import axios from 'axios'; 
  
  export default {
    data() {
      return {
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        phone_number: ''
        
      }
    },
    methods: {
      redirectToLogin() {
        // use router.push Navigate to the login page
        this.$router.push('/login');
      },

  async register() {
  const userData = {
    email: this.email,
    first_name: this.first_name,
    last_name: this.last_name,
    password: this.password,
    phone_number: this.phone_number,
  };

  try {
    const response = await axios.post('http://localhost:8000/api/v1/patients/', userData);
    console.log('Registration successful:', response.data);
    this.redirectToLogin();
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      // Here you can add a user-friendly error message or action
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
  }
}
  },
}

  
</script>
  