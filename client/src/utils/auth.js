import axios from 'axios';
import Router from '../router';

export const getToken = () => {
  const token = localStorage.getItem('token');
  return token;
}

// export const setToken = (token) => {
//   localStorage.setItem('token', token);
// }

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

export const login = (email, password) => {
    axios.post('http://localhost:8000/patient/login/', {
        email: email,
        password: password
    })
    .then((response) => {
        const token = response.data.token;
        const userId = response.data.user.id;
        localStorage.setItem('token', token); // save token in the localStorage
        localStorage.setItem('userId', userId); // save user id in localStorage
        console.log("authToken:",response.data.token);  
        console.log("userInfor:",response.data.user);  
        Router.push('/userdashboard');
    })
    .catch((error) => {
        //alert("Email or password is incorrect.");
        console.log("Error details:", error);
    });
}

// export const login = async (email, password) => {
//   try {
//     const response = await axios.post('http://localhost:8000/patient/login/', {
//       email: email,
//       password: password
//     });
//     localStorage.setItem('token', response.data.token); // save token in the localStorage
//     localStorage.setItem('userInfo', JSON.stringify(response.data)); // save user information in localStorage
//     console.log("authToken:",response.data.token);  // can got token
//     console.log("id:",response.data.id);  // can got token

//     Router.push('/userdashboard');
//     return true

//   } catch (error) {
//     alert("Email or password is incorrect.");
//     console.log("Error details:", error.response);
//   }
// }

export const logout = () => {
    if(confirm("Are you sure you want to logout?")){
        clearToken();
        Router.push('/login');
    }

}
