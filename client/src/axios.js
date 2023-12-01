
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const axiosInstance = axios.create({
  // Axios configuration
});

const mock = new MockAdapter(axiosInstance);
// configurate Mock Adapter

mock.onDelete(new RegExp('/iterms/\\d+')).reply(200, {
  message: 'Appointment Item cancelled successfully'
});

mock.onPost('/submit-form').reply(200, {
  message: 'Booking Form submitted successfully'
});

mock.onPost('/api/login').reply(200, {
  token: 'mocked-token' ,// assum token
  message: 'Mock login successfully'

});

mock.onPost('/api/register').reply(200, {
  message: 'Mock Registration successful'
});

mock.onGet('api/users/profile').reply(200, {
  users: [{ email: 'luhui930@126.com', fname: 'John ',lname:'Smith',phone:'0703333232' }]
});


export default axiosInstance;
