<template>
    <div  class="container mt-5">
      
      <section class="map-header mb-5">
      <h3 >Our Locations</h3>
    </section>
    <div id ="map"></div>
    
    </div>
</template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import 'leaflet/dist/leaflet.css';
  import L from 'leaflet';
  
  export default {
    
    setup() {
      const map = ref(null);
  
      onMounted(() => {
        // create a  map
        map.value = L.map('map').setView([57.7089, 11.9746], 13);
  
        //  add OpenStreetMap layout
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map.value);
      });
  
      return {
        map,
      };
    },
  };
  </script>
  
  <style>
  #map {
    height: 600px;
    width:  100%;
  }

  .map-header {
    background-color: rgb(211, 222, 222); /* Replace with your desired color */
    padding: 0.5rem; /* Adjust padding as needed */
    border-radius: 0.25rem; /* Optional: adds rounded corners */
    }
  </style>
  