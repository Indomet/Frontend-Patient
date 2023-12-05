import axios from 'axios';
import Router from '../router';

export const getToken = () => {
  return localStorage.getItem('token');
}

export const setToken = (token) => {
  localStorage.setItem('token', token);
}

export const clearToken = () => {
  localStorage.removeItem('token');
}

export const register = async (userData) => {
  try {
    const response = await axios.post('http://localhost:8000/api/v1/patients/', userData);
    alert(`Email: ${userData.email} Registration successful!`);
    console.log('Registration successful:', response.data);
    Router.push('/login');
  } catch (error) {
    console.error('Registration error:', error);
  }
}

export const login = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:8000/patient/login/', {
      email: email,
      password: password
    });

    setToken(response.data.token);
    console.log("authToken:",response.data.token);
   

    Router.push('/userdashboard');

  } catch (error) {
    if (error.response && error.response.status === 401) {
          alert("Email or password is incorrect.");
        } else {
          alert("An error occurred. Please try again later.");
        }
        console.error("Login error:", error);
        console.log("Error details:", error.response);
  }
}

export const logout = () => {
  clearToken();
  
  Router.push('/login');
}
