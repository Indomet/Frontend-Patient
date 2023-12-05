<template>
  <div class="container mt-5">
    <section class="map-header mb-1">
      <h3 >Our Locations</h3>
    </section>
    <div id="mapContainer" ref="mapContainer" ></div>
  </div>
</template>

<script>
import "/node_modules/mapbox-gl/dist/mapbox-gl.css"; // remove this later to test
import mapboxgl from "mapbox-gl";
import axios from "axios";
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX;
export default {
  data() {
    return {
      mapContainer: null,
      clinicsData: [],
    };
  },
  mounted() {
    const mapContainer = new mapboxgl.Map({
      container: this.$refs.mapContainer,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [11.9746, 57.7089],
      zoom: 11,
    });

    this.mapContainer = mapContainer;

    this.currentLocation();
    this.addLocation();
  },
  unmounted() {
    this.mapContainer.remove();
    this.mapContainer = null;
  },
  methods: {
    async addLocation() {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/clinics');
        this.clinicsData = response.data.clinics;

        this.clinicsData.forEach((clinic) => {
          const popupContent = `<strong>Clinic Name:</strong> ${clinic.clinicName}<br>${clinic.location.formattedAddress}`;
          new mapboxgl.Marker()
            .setLngLat(clinic.location.coordinates)
            .setPopup(new mapboxgl.Popup().setHTML(popupContent))
            .addTo(this.mapContainer);
        });
      } catch (error) {
        console.error('Error fetching clinic data:', error);
      }
    },
    currentLocation() {
      // this.mapContainer.addControl(new mapboxgl.FullscreenControl());
      this.mapContainer.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true,
          showUserHeading: true
        })
      );
    },
  }
};
</script>


<style scoped>
#mapContainer {
  display: flex;
  height: 600px;
  width:  100%;
  padding: 0;
  flex: 1;
}

.map-header {
    background-color: rgb(211, 222, 222); 
    padding: 0.5rem; 
    border-radius: 0.25rem;
    }
</style>
