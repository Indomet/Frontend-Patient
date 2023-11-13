<template>
    <div id = "bookings" class="container mt-5">
      
      <section class="booking-header mb-5">
      <h3 >Booking</h3>
    </section>
      <form @submit.prevent="submitForm" class="row g-3 mb-5">
        <div class="col-md-4 mb-5">
          <label for="appointmentDate" class="form-label mb-3"> Date</label>
          
          <input type="date" class="form-control" id="appointmentDate" v-model="appointment.date">
        </div>
        <div class="col-md-4">
          <label for="hospitalSelection" class="form-label mb-3">Clinic</label>
          <select class="form-select" id="hospitalSelection" v-model="appointment.hospital">
            <option value="" disabled>Selection Clinic</option>
            <option v-for="hospital in hospitals" :key="hospital.id" :value="hospital.name">{{ hospital.name }}</option>
          </select>
        </div>
        <div class="col-md-4">
          <label for="doctorSelection" class="form-label mb-3">Doctor</label>
          <select class="form-select" id="doctorSelection" v-model="appointment.doctor">
            <option value="" disabled>Selection Doctor</option>
            <option v-for="doctor in doctors" :key="doctor.id" :value="doctor.name">{{ doctor.name }}</option>
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
  
  export default {
    setup() {
      const appointment = ref({
        date: '',
        hospital: '',
        doctor: ''
      });
  
      const hospitals = ref([
        { id: 1, name: 'hospitalA' },
        { id: 2, name: 'hospitalB' },
        { id: 3, name: 'hospitalC' }
      ]);
  
      const doctors = ref([
        { id: 1, name: 'DoctorA' },
        { id: 2, name: 'DoctorB' },
        { id: 3, name: 'DoctorC' }
      ]);
  
      function submitForm() {
        console.log('booking information：', appointment.value);
        // This is where form submissions are handled, such as sending to an API or validation,
      }
  
      return {
        appointment,
        hospitals,
        doctors,
        submitForm
      };
    }
  };
  </script>
  
  <style>
    .booking-header {
    background-color: rgb(211, 222, 222); 
    
    padding: 0.5rem; /* Adjust padding as needed */
    border-radius: 0.25rem; /* Optional: adds rounded corners */
    /*margin-bottom: 9rem;*/
  }
    </style>
    
  