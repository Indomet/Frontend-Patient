<template>
    
    <div  class="m-3">
    <div class=" mb-4">
        <div class="card">
            <div class="card-body text-white mailbox-widget pb-0" style="background-color: #567890;"> 
                <h2 class="text-white pb-3">Appointment</h2>
                    
                </div>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table custom-table">
        <thead class="table-light sticky-header">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            <th scope="col">Clinic</th>
            <th scope="col">Address</th>
            <th scope="col">Message</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(iterm, index) in Iterms" :key="iterm.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ iterm.date }}</td>
            <td>{{ iterm.time }}</td>
            <td>{{ iterm.clinic }}</td>
            <td>{{ iterm.address }}</td>
            <td>{{ iterm.message }}</td>
            
            <td>
              <button class="btn btn-danger" @click="cancelIterms(iterm.id)">Cancel</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; 

export default {
  name: 'AppointmentTable',
  data() {
    return {
      Iterms: [],
      // showBoookings: true,
    };
  },
  mounted() {
    this.fetchIterms(); 
  },
  methods: {
    async fetchIterms() {
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.get('/api/user/booking', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.status === 200 && response.data.Iterms) {
      this.Iterms = response.data.Iterms;
      // this.showBoookings = false;
      console.log(this.Iterms);
    }
  } catch (error) {
    console.error('Error bookings', error);
    // this.showBoookings = false;
  }
},
  
    cancelIterms(itermId) {
      axios.delete(`/iterms/${itermId}`).then(response => {
        console.log(response.data);
        if (response.status === 200) {
          this.Iterms = this.Iterms.filter(iterm => iterm.id !== itermId);
        }
      }).catch(error => {
        console.error('Error:', error);
      });
    },
  
  }
}

</script>

<style>
.sticky-header {
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 20;
}

.text-center {
  margin-bottom: 32rem; 
}
.custom-table {
  min-width: 50vw; 
}


.table td,
.table th {
  padding: 1rem; 
}


.table th,
.table td {
  font-size: 1.25rem; 
}
</style>

