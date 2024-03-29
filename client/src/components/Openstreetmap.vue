<template>
    <!-- This is the bookings part -->
    <div class=" mb-4">
      <div class="card">
        <div class="card-body text-white mailbox-widget pb-0" style="background-color: #567890;">
          <h2 class="text-white pb-3">Schedule an Appointment</h2>
        </div>
        <!-- Conditional Form -->
        <div v-if="showForm">
          <h3>Reason for Visit</h3>
          <form @submit.prevent="confirmBooking">
            <label for="reason">Enter reason for visit:</label>
            <textarea class="form-control" id="reason" v-model="visitReason"></textarea>

            <button type="submit" class="btn btn-primary">Confirm</button>
            <button type="button" class="btn btn-secondary" @click="cancelForm">Cancel</button>
          </form>
        </div>
        <p v-if="error" class="text-danger">{{ error }}</p>
        <p v-if="responseMessage" class="text-success">{{ responseMessage }}</p>
      </div>
    </div>  
    <div v-if="bookings.length > 0" class="row">
      <div class="col-md-12">
        <div class="hidden-on-medium-small overflow-x:auto">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Dentist</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <select v-model="selectedDateFilter">
            <option value="2weeks">Next 2 Weeks</option>
            <option value="1month">Next Month</option>
            <option value="3months">Next 3 Months</option>
            <option value="All">All</option>
          </select>
          <tbody>
            <tr v-for="booking in bookings" :key="booking._id">
              <td>{{ booking.dentistName }}</td>
              <td>{{ booking.date }}</td>
              <td>{{ booking.time }}</td>
              <td>{{ booking.status }}</td>
              <td> <button style="width: 80%; display: flex; justify-content: center;" class="btn btn-success"
                  @click="openForm(booking)">BOOK</button> </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="hidden-on-large">
        <select v-model="selectedDateFilter">
            <option value="2weeks">Next 2 Weeks</option>
            <option value="1month">Next Month</option>
            <option value="3months">Next 3 Months</option>
            <option value="All">All</option>
          </select>
            <div class="booking-cards" v-for="booking in bookings" :key="booking._id">
                <div class="booking-card">
                    <p><strong>Dentist:</strong> {{ booking.dentistName }}</p>
                    <p><strong>Date:</strong> {{ booking.date }}</p>
                    <p><strong>Time:</strong> {{ booking.time }}</p>
                    <p><strong>Status:</strong> {{ booking.status }}</p>
                    <button style="width: 80%; display: flex; justify-content: center;" class="btn btn-success"
                  @click="openForm(booking)">BOOK</button>
                </div>
            </div>
        </div>
        <div class="pagination">
          <button @click="prevSection" :disabled="currentSection === 1">
            Prev</button>
          <button v-for="page in pagesInCurrentSection" :key="page" @click="changePage(page)"
            :class="{ active: currentPage === page }">
            {{ page }}
          </button>
          <button @click="nextSection" :disabled="currentSection === Math.ceil(totalPages / pagesPerSection)"> Next
          </button>
        </div>
      </div>
    </div>
    <div v-else-if="bookings === null && selectedClinic !== null">
      <p></p><!-- Loading -->
    </div>
    <div v-else-if="bookings.length === 0 && bookings !== null && selectedClinic !== null">
      <p>No bookings available at this location.</p>
    </div>
    <div v-else>
      <p>Select a clinic to view available bookings.</p>
    </div>

    <div id="mapContainer" ref="mapContainer"></div>
</template>

<script>
import axios from "axios";
const API_GATEWAY = import.meta.env.VITE_API_GATEWAY;

import "/node_modules/mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX;

export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user')),
      bookings: [],
      clinicName: "",
      clinicAddress: "",
      clinicEmail: "",
      clinicPassword: "",
      mapContainer: null,
      clinicsData: [],
      markers: [],
      error: null,
      responseMessage: null,
      visitReason: '', // To store the reason for the visit
      bookingToConfirm: null, // To store the booking data
      showForm: false,
      selectedDateFilter: '2weeks',
      selectedClinic: null,
      currentPage: 1,
      pagesPerSection: 5,
      currentSection: 1,
      totalPages: 0,
    };
  },
  computed: {
    pagesInCurrentSection() {
      const startPage = (this.currentSection - 1) * this.pagesPerSection + 1;
      const endPage = Math.min(this.currentSection * this.pagesPerSection, this.totalPages);
      return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    },
  },
  watch: {

    selectedDateFilter() {

      if (this.selectedClinic) {
        this.showClinicInformation(this.selectedClinic);
      }
    },
  },
  mounted() {
    this.initializeMap();
    this.getLocation();
  },
  unmounted() {
    if (this.mapContainer) {
      this.mapContainer.remove();
      this.mapContainer = null;
    }
  },
  methods: {
    changePage(page) {
      this.currentPage = page;
      this.currentSection = Math.ceil(page / this.pagesPerSection);
      if (this.selectedClinic) {
        this.showClinicInformation(this.selectedClinic);
      }
    },
    nextSection() {
      if (this.currentSection * this.pagesPerSection < this.totalPages) {
        this.currentSection++;
        if (this.selectedClinic) {
          this.showClinicInformation(this.selectedClinic);
        }
      }
    },
    prevSection() {
      if (this.currentSection > 1) {
        this.currentSection--;
        if (this.selectedClinic) {
          this.showClinicInformation(this.selectedClinic);
        }
      }
    },
    confirmBooking() {
      if (this.visitReason.trim() !== '') {
        // Handle your confirmation logic here
        console.log(this.user);
        console.log('email: ', this.user.email);

        axios.patch(`http://${API_GATEWAY}:8081/api/v1/bookings/${this.bookingToConfirm._id}`, {
          status: 'BOOKED',
          patientID: this.user.id,
          patientName: this.user.first_name + ' ' + this.user.last_name,
          patientEmail: this.user.email,
          message: this.visitReason,
        })
          .then((response) => {
            console.log('response: ', response);
            // this.responseMessage = "Booking successful.";
            alert("Booking sucessful")
            this.error = null;
            this.getAllBookings();
            // this.$router.push('/appointments')
          })
          .catch((error) => {
            console.error(error);
          });

        console.log('Booking confirmed with reason:', this.visitReason);

        // Reset and hide the form
        this.showForm = false;
        this.visitReason = '';

      } else {
        // Show an error message or handle empty reason case
        console.log('Please provide a reason for the visit.');
      }
    },
    openForm(booking) {
      this.bookingToConfirm = booking;
      this.visitReason = '';
      this.showForm = true;
    },
    cancelForm() {
      // Reset and hide the form
      this.showForm = false;
      this.visitReason = '';
    },

    initializeMap() {
      this.mapContainer = new mapboxgl.Map({
        container: this.$refs.mapContainer,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [11.9746, 57.7089],
        zoom: 10,
      });
      this.mapContainer.addControl(new mapboxgl.FullscreenControl()); // full screen control
      this.mapContainer.addControl(new mapboxgl.NavigationControl()); // zoom in/out control
      this.mapContainer.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
          showUserHeading: true,
        })
      );
    },
    async getLocation() {
      try {
        const response = await axios.get(`http://${API_GATEWAY}:3000/api/v1/clinics`);
        this.clinicsData = response.data.clinics;
        console.log(response.data.clinics)

        this.clearMarkers();
        this.displayClinicsOnMap();
      } catch (error) {
        console.error("Error fetching clinic data:", error);
      }
    },
    clearMarkers() {
      this.markers.forEach((marker) => marker.remove());
      this.markers = [];
    },
    displayClinicsOnMap() {
      this.clinicsData.forEach((clinic) => {
        const popupContent = this.createPopupContent(clinic);
        const marker = new mapboxgl.Marker()
          .setLngLat(clinic.location.coordinates)
          .setPopup(new mapboxgl.Popup().setDOMContent(popupContent))
          .addTo(this.mapContainer);

        // Add click event listener to the marker
        marker.getElement().addEventListener('click', () => {
          this.showClinicInformation(clinic);
          this.selectedClinic = clinic;
        });

        this.markers.push(marker);
      });
    },

    showClinicInformation(clinic) {
      const clinicId = clinic._id;
      localStorage.setItem('dentistId', clinic.dentistId);
      console.log(localStorage.getItem('dentistId'));
      localStorage.setItem('dentistName', clinic.dentistName);

      console.log('About to make axios request');
      axios.get(`http://${API_GATEWAY}:8081/api/v1/bookings/dentist/available/${clinic.dentistId}?dateFilter=${this.selectedDateFilter}&page=${this.currentPage}`)
        .then(response => {
          console.log('Response from axios request:', response);
          const clinicInfo = response.data.bookings;
          console.log('Clinic Information:', clinicInfo);

          // Use a temporary variable for better code readability
          const updatedBookings = clinicInfo;

          // Update the state property
          this.bookings = updatedBookings;
          this.totalPages = response.data.totalPages;
        })
        .catch(error => {
          console.error('Error fetching clinic information:', error);
        });
    },

    createPopupContent(clinic) {
      const popupContent = document.createElement("div");
      const editBtn = this.createEditButton(clinic);
      const deleteBtn = this.createDeleteButton(clinic._id);

      popupContent.innerHTML = `<strong>Clinic Name:</strong> ${clinic.clinicName}<br>${clinic.location.formattedAddress}`;
      // popupContent.appendChild(document.createTextNode(' '));
      // popupContent.appendChild(editBtn);
      // popupContent.appendChild(document.createTextNode(' '));
      // popupContent.appendChild(deleteBtn);

      return popupContent;
    },
    createEditButton(clinic) {
      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.addEventListener("click", () => this.editClinic(clinic));
      return editBtn;
    },
    createDeleteButton(clinicId) {
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => this.deleteClinic(clinicId));
      return deleteBtn;
    },
    async editClinic(clinic) {
      let newClinicName = prompt("Enter the new clinic name:", clinic.clinicName);
      let newAddress = prompt("Enter the new address:", clinic.location.formattedAddress);

      // ensur values are not null or empty strings
      newClinicName = newClinicName ? newClinicName.trim() : clinic.clinicName;
      newAddress = newAddress ? newAddress.trim() : clinic.location.formattedAddress;

      const updatedClinic_postgres = {
        name: newClinicName,
        location: newAddress,
      };

      try {
        const dentistToPatch = localStorage.getItem('dentistId');
        console.log('Updating dentist from postgres: ', dentistToPatch);
        await axios.patch(`http://${API_GATEWAY}:8000/api/v1/dentists/${dentistToPatch}/`, updatedClinic_postgres);
        console.log("Clinic updated successfully:", dentistToPatch);
      } catch (error) {
        console.error("Error updating clinic:", error);
      }

      const updatedClinic = {
        clinicName: newClinicName,
        address: newAddress,
      };

      try {
        await axios.patch(`http://${API_GATEWAY}:3000/api/v1/clinics/${clinic._id}`, updatedClinic);
        console.log("Clinic updated successfully:", clinic._id);
        this.getLocation();
      } catch (error) {
        console.error("Error updating clinic:", error);
      }
    },
    async createClinic() {
      console.log(this.clinicsData);
      if (!this.clinicName || !this.clinicAddress || !this.clinicEmail || !this.clinicPassword) {
        this.error = "Please enter all fields.";
        return;
      }
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.clinicEmail)) {
        this.error = "Please enter a valid email address.";
        return;
      }
      if (this.clinicsData.some(clinic => clinic.clinicName === this.clinicName)) {
        this.error = "Clinic name already exists.";
        return;
      }
      if (this.clinicsData.some(clinic => clinic.clinicEmail === this.clinicEmail)) {
        this.error = "Clinic email already exists.";
        return;
      }

      /**
      if (this.clinicsData.some(
        clinic => clinic.location.formattedAddress === this.clinicAddress)) {
        this.error = "Clinic address already exists.";
      }
       */

      const data_postgres = {
        name: this.clinicName,
        email: this.clinicEmail,
        password: this.clinicPassword,
        location: this.clinicAddress,
      };
      try {
        const response = await axios.post(`http://${API_GATEWAY}:8000/api/v1/dentists/`, data_postgres);
        console.log(response.data);
        console.log(response.data.data.id);
        var clinicId = response.data.data.id;

        this.responseMessage = response.data.message;
        this.error = null;

      } catch (error) {
        console.error("Error creating clinic:", error);
        this.error = "An error occurred while creating the clinic.";
      }

      const data = {
        clinicName: this.clinicName,
        clinicEmail: this.clinicEmail,
        dentistId: clinicId,
        address: this.clinicAddress,
      };

      try {
        const response = await axios.post(`http://${API_GATEWAY}:3000/api/v1/clinics`, data);
        console.log(response);
        this.getLocation();
      } catch (error) {
        console.error("Error creating clinic:", error);
        this.error = "An error occurred while creating the clinic.";
      }
    },
    async deleteClinic(clinicId) {
      try {
        const dentistToDelete = localStorage.getItem('dentistId');
        console.log('Deleting this dentist from postgres: ', dentistToDelete);
        await axios.delete(`http://${API_GATEWAY}:8000/api/v1/dentists/${dentistToDelete}/`);
        console.log("Clinic deleted successfully:", dentistToDelete);
      } catch (error) {
        console.error("Error deleting clinic:", error);
      }
      try {
        await axios.delete(`http://${API_GATEWAY}:3000/api/v1/clinics/${clinicId}`);
        console.log("Clinic deleted successfully:", clinicId);
        this.getLocation();
      } catch (error) {
        console.error("Error deleting clinic:", error);
      }
    },
    generateRandomPassword(length) {
      const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=";
      let password = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset.charAt(randomIndex);
      }
      this.clinicPassword = password;
    },
    openPostModal() {
      this.showPostModal = true;
    },
    closePostModal() {
      this.showPostModal = false;
    },
    openSuccessModal() {
      this.showSuccessModal = true;
    },
    closeSuccessModal() {
      this.showSuccessModal = false;
    },
    submitPost() {
      const dentistID = localStorage.getItem('dentistID');
      const dentistName = localStorage.getItem('dentistName');
      this.newBooking.dentistID = dentistID;
      this.newBooking.dentistName = dentistName;
      axios.post(`http://${API_GATEWAY}:8081/api/v1/bookings/`, {
        patientName: '',
        dentistName: this.newBooking.dentistName,
        dentistID: this.newBooking.dentistID,
        date: this.newBooking.date,
        time: this.newBooking.time,
        status: 'AVAILABLE'
      }).then(() => {
        this.showPostModal = false;
        this.openSuccessModal();
        this.getAllBookings();
      })
        .catch((error) => {
          console.error(error);
        });
    },
    getAllBookings() {
      let dentistID = localStorage.getItem('dentistID');
      axios.get(`http://${API_GATEWAY}:8081/api/v1/bookings/dentist/${dentistID}`)
        .then((response) => {
          this.bookings = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    cancelAndReOpenBooking(booking) {
      console.log(booking)
      console.log(this.dentistName)
      axios.patch(`http://${API_GATEWAY}:8081/api/v1/bookings/${booking._id}`, {
        status: 'CANCELED'

      })
        .then(() => {
          axios.post(`http://${API_GATEWAY}:8081/api/v1/bookings/`, {
            patientName: '',
            patientEmail: '',
            dentistName: booking.dentistName,
            dentistID: booking.dentistID,
            date: booking.date,
            time: booking.time,
            status: 'AVAILABLE'
          })
            .then(() => {
              this.getAllBookings();
            })


        })
        .catch((error) => {
          console.error(error);
        });
    },
    cancelBooking(booking) {
      console.log(booking)
      console.log(this.dentistName)
      axios.patch(`http://${API_GATEWAY}:8081/api/v1/bookings/${booking._id}`, {
        status: 'CANCELED'
      })
        .then(() => {
          this.getAllBookings();
        })
        .catch((error) => {
          console.error(error);
        });

    },
    resetResponseMessage() {
      this.responseMessage = null;
    },
  },
};
</script>

<style scoped>
#mapContainer {
  display: flex;
  height: 600px;
  width: 100%;
  padding: 0;
  flex: 1;
}

.map-header {
  background-color: rgb(211, 222, 222);
  padding: 0.5rem;
  border-radius: 0.25rem;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  margin: 0 5px;
  padding: 10px 20px;
  border: none;
  background-color: #f8f9fa;
  cursor: pointer;
  text-align: center;
}

.pagination button.active {
  background-color: #007bff;
  color: white;
}


/* Define card styles */
.booking-cards {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.booking-card {
    width: calc(50% - 20px);
    /* Adjust the width as needed for medium screens */
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Media query for small screens */
@media (max-width: 767px) {
    .booking-card {
        width: 100%;
    }
}

/* Define the media query to hide the div on medium and small screens */
@media (max-width: 991px) {
    .hidden-on-medium-small {
        display: none;
    }
}

/* Define the media query to hide the div on medium and small screens */
@media (min-width: 991px) {
    .hidden-on-large {
        display: none;
    }
}
</style>
