<template>
    <div id = "bookings" class="container mt-5">
      
      <section class="booking-header mb-5">
      <h3 >Booking</h3>
    </section>
      <form @submit.prevent="submitForm" class="row g-3 mb-5">
        <div class="col-md-4 mb-5">
          <label for="appointmentDate" class="form-label mb-3"> Date</label>
          
          <input type="date" class="form-control" id="appointmentDate" v-model="appointment.date" required>
        </div>

        <div class="col-md-4">
          <label for="timeSelection" class="form-label mb-3">Time</label>
          <select class="form-select" id="timeSelection" v-model="appointment.time" required>
            <option value="" disabled>Selection Time</option>
            <option v-for="time in times" :key="time.id" :value="time.name">{{ time.name }}</option>
          </select>
        </div>

        <div class="col-md-4">
          <label for="hospitalSelection" class="form-label mb-3">Clinic</label>
          <select class="form-select" id="hospitalSelection" v-model="appointment.hospital" required>
            <option value="" disabled>Selection Clinic</option>
            <option v-for="hospital in hospitals" :key="hospital.id" :value="hospital.name">{{ hospital.name }}</option>
          </select>
        </div>
        
        <div class="col-12 ">
          <button type="submit" class="btn btn-primary mb-3" style="width: 120px;">Submit</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import axios from '@/axios.js'; 
  
  export default {
    setup() {
      const appointment = ref({
        date: '',
        hospital: '',
        time: ''
      });

      const hospitals = ref([
        { id: 1, name: 'hospitalA' },
        { id: 2, name: 'hospitalB' },
        { id: 3, name: 'hospitalC' }
      ]);
      function generateTimes() {
        const times = [];
          for (let hour = 8; hour < 18; hour++) { 
            times.push({ id: hour, name: `${hour}:00` });
          }
            return times;
      }
        const times = ref(generateTimes());


    async function submitForm() {
      try {
        const response = await axios.post('/submit-form', appointment.value);
        console.log('Mocked Response:', response.data);
        
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
        hospitals,
        times,
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
    </style>
    
  