
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

mock.onGet('/api/user/profile').reply(200, {
  email: 'luhui930@126.com', password :'123455',fname: 'John ',lname:'Smith',phone:'0703333232' 
});

mock.onGet('/api/user/booking').reply(200, {
  Iterms: [
    { date: '2023-12-25', time: '08:50' ,clinic:'A',address:'lindholmen A', message:'jack'},
    { date: '2024-02-25', time: '10:30' ,clinic:'b',address:'lindholmen B', message:'ikckqq'},
    { date: '2023-02-11', time: '09:50' ,clinic:'c',address:'lindholmen 110',message:'mack'},
    { date: '2023-03-05', time: '12:10' ,clinic:'d',address:'lindholmen 78', message:'lmnack'}
  ],
});


export default axiosInstance;
