<template>
    <div id="app">
      <div class="login-form">
        <form @submit.prevent="login">
          <div class="form-inner" style="margin: 30px; color: #010813">
            <h3>Log In</h3>
            
          </div>
          <div class="input-group mb-3" style="width: 80%; margin: 0 auto ">
            <span class="input-group-text"><i class="bi bi-person-circle"></i></span>
            <input type="email" class="form-control" placeholder="user email" v-model="email" required>
          </div>
          <div class="input-group mb-3" style="width: 80%; margin: 0 auto ">
            <span class="input-group-text"><i class="bi bi-lock-fill"></i></span>
            <input type="password" class="form-control" placeholder="password" v-model="password" required>
          </div>
          <div class="mb-3">
            <button style="width: 80%; margin: 0 auto " type="submit" class="btn btn-primary" :disabled="!canLogin">Log in</button>  
          </div>
      </form>
      <div class="signup-link" >
        <a href="/register" >Sign up</a>
      </div>
    </div>
  </div>
  </template>
  
  <script>
  import axiosInstance from '@/axios.js';

  export default {
    name: 'App',
    data() {
      return {
        email: '',
        password: ''
        
      }
    },
    computed: {
        canLogin() {
            return this.email.trim() !== '' && this.password.trim() !== '';
        }
    },

    methods: {
      async login() {
      try {
        if (this.password.length < 6) {
            alert("Password must be at least 6 characters long.");
              return;
        }
          const response = await axiosInstance.post('/api/login', {
            email: this.email,
            password: this.password

          });

          const token = response.data.token; 
          console.log('authToken:', token);
          localStorage.setItem('authToken', token); 

          if (response.status ===200){
            console.log(response.data);
          this.$router.push('/userdashboard'); } 
        } catch (error) {
            console.error('Login error:', error);
            console.log("Error details:", error.response);
    }
  }
},
      
}
  
</script>
  
  <style scoped>
  .login-form {
    width: 450px;
    margin: 100px auto;
    text-align: center;
    border: 1px solid #eee;
    padding: 30px 0 50px 0;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
  .signup-link {
    margin-left: 280px; 
  }
  #app {
    display: flex;
    justify-content: center; 
    align-items: center; 
    min-height: 100vh; 
    width: 100vw; 
    background: url('../assets/02.png') no-repeat center center fixed;
    background-size: cover;
  }

  
  
  @media (max-width: 768px) {
    .login-box {
      padding: 20px;
      margin: 20px;
    }
  }
  </style>
  
  