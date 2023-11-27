// axios.js
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
  message: 'Form submitted successfully'
});

export default axiosInstance;
