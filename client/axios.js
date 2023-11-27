
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const axiosInstance = axios.create({
  // Axios configuration
});

const mock = new MockAdapter(axiosInstance);
// configurate Mock Adapter

mock.onDelete(new RegExp('/iterms/\\d+')).reply(200, {
  message: 'Item cancelled successfully'
});

mock.onPost('/submit-form').reply(200, {
<<<<<<< Updated upstream:client/axios.js
  message: 'Form submitted successfully'
=======
  message: 'Booking Form submitted successfully'
});

mock.onPost('/api/login').reply(200, {
  token: 'mocked-token' ,// assum token
  message: 'Mock login successfully'
>>>>>>> Stashed changes:client/src/axios.js
});

mock.onPost('/api/register').reply(200, {
  message: 'Mock Registration successful'
})

export default axiosInstance;
