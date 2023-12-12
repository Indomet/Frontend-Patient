<template>
    <div class="m-3">
        <div class=" mb-4">
            <div class="card">
                <div class="card-body text-white mailbox-widget pb-0" style="background-color: #567890;">
                    <h2 class="text-white pb-3">Bookings</h2>

                </div>
            </div>
        </div>
        <div style="padding-bottom: 5px;">
            <input type="checkbox" v-model="showCancelled" id="show_cancelled">
            <label for="show_cancelled" style="margin-left: 3px; font-weight: bold;">Show cancelled bookings</label>
        </div>
        <div class="table-responsive">
            <table class="table custom-table">
                <thead class="table-light sticky-header">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Date</th>
                        <th scope="col">Time</th>
                        <th scope="col">Clinic</th>
                        <th scope="col">Message</th>
                        <th scpop="col">Status</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in filteredBookings" :key="item.id">
                        <th scope="row">{{ index + 1 }}</th>
                        <td>{{ item.date }}</td>
                        <td>{{ item.time }}</td>
                        <td>{{ item.dentistName }}</td>
                        <td>{{ item.message }}</td>
                        <td>{{ item.status }}</td>
                        <td>
                            <button v-if="item.status != 'CANCELED'" class="btn btn-danger"
                                @click="cancelBooking(item)">Cancel</button>
                            <p v-else>N/A</p>
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
            bookings: [],
            userId: localStorage.getItem('userId'),
            token: localStorage.getItem('token'),
            showCancelled: false
        };
    },
    computed: {
        filteredBookings() {
            if (this.showCancelled) {
                return this.bookings;
            } else {
                return this.bookings.filter(booking => booking.status !== 'CANCELED');
            }
        }
    },
    mounted() {
        this.fetchBookings();
    },
    methods: {
        fetchBookings() {
            var temp = []
            console.log(this.userId)
            axios.get(`http://localhost:8081/api/v1/bookings/patient/${this.userId}`, {
                headers: {
                    Authorization: this.token
                }
            })
                .then(response => {
                    console.log("Response", response)
                    if (response.status === 200) {
                        for (const each of response.data) {
                            temp.push(each)
                        }
                        console.log(this.bookings)
                        this.bookings = temp
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Error fetching bookings');
                });
        },

        cancelBooking(booking) {
            console.log('Booking:', booking)

            axios.patch(`http://127.0.0.1:8081/api/v1/bookings/${booking._id}`, {
                status: 'CANCELED'
            })
                .then(() => {
                    axios.post('http://127.0.0.1:8081/api/v1/bookings/', {
                        patientName: '',
                        dentistName: booking.dentistName,
                        dentistID: booking.dentistID,
                        date: booking.date,
                        time: booking.time,
                        status: 'AVAILABLE'
                    }).then(() => {
                        alert('Booking canceled successfully');
                        this.fetchBookings();
                    })
                })

                .catch((error) => {
                    console.error(error);
                    alert('Error canceling booking');
                });

        }

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

