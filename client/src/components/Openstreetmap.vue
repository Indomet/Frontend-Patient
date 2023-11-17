<template>
    <div id="map" ></div>
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
    height: 400px;
    width:  1200px;
  }
  </style>
  