import axios from 'axios';
import Router from '../router';

const userService = "localhost";

export const getToken = () => {
  const token = localStorage.getItem('token');
  return token;
}

export const clearToken = () => {
  localStorage.clear();
}

export const register = async (userData) => {
  try {
    const response = await axios.post(`http://${userService}:80/api/v1/patients/`, userData);
    alert(`Email: ${userData.email} Registration successful!`);
    console.log('Registration successful:', response.data);
    Router.push('/login');
  } catch (error) {
    console.error('Registration error:', error);
  }
}

export const login = (email, password) => {
  axios.post(`http://${userService}:80/patient/login/`, {
    email: email,
    password: password
  })
  .then((response) => {
    console.log("response: ", response);
    const token = response.data.token;
    const userId = response.data.user.id;
    const user = response.data.user;
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('user', JSON.stringify(user));
    console.log("token: ", response.data.token);
    console.log("user: ", response.data.user);
    Router.push('/userdashboard');
  })
  .catch((error) => {
    alert("Email or password is incorrect.");
    console.log("Error details:", error);
  });
}

export const logout = () => {
  if (confirm("Are you sure you want to logout?")) {
    clearToken();
    Router.push('/login');
  }
}
