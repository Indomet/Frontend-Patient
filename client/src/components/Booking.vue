<template>
    <div id = "bookings" class="container mt-5">
      <section class="booking-header mb-5">
      <h3 >Booking</h3></section>

    <div class="row">
      <div class="col-md-6">
      <form @submit.prevent="submitForm" class="row g-3 mb-5">
        <div class="mb-3">
          <label for="appointmentDate" class="form-label mb-3"> Date</label>
          <input type="date" class="form-control" id="appointmentDate" v-model="appointment.date" required>
        </div>

        <div class="mb-3">
          <label for="timeSelection" class="form-label mb-3">Time</label>
          <select class="form-select" id="timeSelection" v-model="appointment.time" required>
            <option value="" disabled>Selection Time</option>
            <option v-for="time in times" :key="time.id" :value="time.name">{{ time.name }}</option>
          </select>
        </div>

        <div class="mb-3">
          <label for="clinicSelection" class="form-label mb-3">Clinic</label>
          <select class="form-select" id="cliniclSelection" v-model="appointment.clinic" required>
            <option value="" disabled>Selection Clinic</option>
            <option v-for="clinic in clinics" :key="clinic.id" :value="clinic.name">{{ clinic.name }}</option>
          </select>
        </div>

        <div class="mb-3">
          <label for="messageInput" class="form-label mb-3">Message</label>
            <textarea class="form-control" id="messageInput" v-model="appointment.message" rows="3" >
            </textarea>
        </div>

       
        
        <div class="col-12 ">
          <button type="submit" class="btn btn-primary mb-3" style="width: 120px;">Submit</button>
        </div>
      </form>
      </div>

      <div class="col-md-6">
                <img src="@/assets/sign.jpg" class=" img-fluid image-margin" alt="Dental" >
      </div>
    </div>
  </div>

  
  </template>
  
  <script>
  import { ref ,onMounted } from 'vue';
  import axios from 'axios';
  const API_GATEWAY = import.meta.env.VITE_API_GATEWAY;
  
  export default {
    setup() {
      const appointment = ref({
        date: '',
        clinic: '',
        time: '',
        message: ''
       
      });

      const clinics = ref([]);
      const times = ref([]);
      const message = ref([]);

    // Fetch data from backend
    const fetchData = async () => {
      try {
        console.log('Attempting to get bookings from backend')
        const response = await axios.get(`http://${API_GATEWAY}:80/api/v1/bookings/`);
        console.log(response)

        clinics.value = response.data.dentistName;
        times.value = response.data.time;
        message.value = response.data.message;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    onMounted(fetchData);
    async function submitForm() {
      try {
        const response = await axios.post(`http://${API_GATEWAY}:80/api/v1/bookings/${booking._id}`, appointment.value);
        console.log('submitForm Response:', response.data);
        
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }

      /*function submitForm() {
        console.log('booking information：', appointment.value);
        // This is where form submissions are handled, such as sending to an API or validation,
      }*/
  
      return {
        appointment,
        clinics,
        times,
        message,
        submitForm
      };
    }
  };
  </script>
  
  <style>
    .booking-header {
    background-color: rgb(211, 222, 222); 

    padding: 0.5rem;
    border-radius: 0.25rem; 
  
  }

  .image-margin {
  margin-top: 38px; 
}
    </style>
    
  