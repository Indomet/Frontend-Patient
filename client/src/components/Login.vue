<template>
    <div id="app">
      <div style="width: 400px; margin: 100px auto; text-align: center; border: 1px solid #eee; padding: 30px 0 50px 0;
       border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);">
        <div style="width: 80%; margin: 0 auto ">
          <div style="margin: 30px; color: #010813">
            <h3>Log   In</h3>
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text"><i class="bi bi-person-circle"></i></span>
            <input type="text" class="form-control" placeholder="user name" v-model="username">
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text"><i class="bi bi-lock-fill"></i></span>
            <input type="password" class="form-control" placeholder="password" v-model="password">
          </div>
          <div class="mb-3">
            <button style="width: 100%" class="btn btn-primary" @click="login">Log in</button>
          </div>
          <div style="text-align: right;"><a href="/register">Sign up</a></div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  
  
  export default {
    name: 'App',
    data() {
      return {
        username: '',
        password: ''
        
      }
    },
    methods: {
      login() {
        
        console.log('log in', this.username, this.password);
        
        this.$router.push('/userdashboard');
      }
    }
  }
  </script>
  
  <style scoped>
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
  
  