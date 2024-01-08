import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


const API_GATEWAY = import.meta.env.VITE_API_GATEWAY;


console.log("API_GATEWAY: ", API_GATEWAY);

// Connect to the WebSocket server
const socket = io(`ws://${API_GATEWAY}`);

// Event handler for connection
socket.on('connect', () => {
    console.log('Connected to WebSocket server');
});

const app = createApp(App)

app.use(router)

//app.use(store)

app.mount('#app')
