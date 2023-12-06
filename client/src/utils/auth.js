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
    console.log('Registration successful:', response.data); // can got date here from backend
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

    setToken(response.data.token); // save token in the localStorage
    localStorage.setItem('userInfo', JSON.stringify(response.data)); // save user information in localStorage
    console.log(response.data)   // can not get date 
    console.log("authToken:",response.data.token);  // can got token
    
    Router.push('/userdashboard');

  } catch (error) {
    if (error.response && error.response.status === 401) {
          alert("Email or password is incorrect.");
        } else {
          alert("You are logged in. Please log out and try again later.");
        }
        console.error("Login error:", error);
        console.log("Error details:", error.response);
  }
}

export const logout = () => {
  clearToken();
  Router.push('/login');
}
