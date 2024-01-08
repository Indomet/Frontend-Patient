<template>
    <div class="m-3">
        <div class="mb-4">
            <div class="card">
                <div class="card-body text-white mailbox-widget pb-0" style="background-color: #567890">
                    <h2 class="text-white pb-3">Profile Setting</h2>
                </div>
                <div class="container rounded bg-white mt-5 mb-5">
                    <div class="row" style="display: flex; justify-content: center;">
                        <div class="col-md-5 border-right">
                            <div class="p-3 py-5">
                                <form @submit.prevent="updateProfile">
                                    <div class="row mt-3">
                                        <div class="col-md-12">
                                            <label class="labels">User Email</label>
                                            <span class="required">*</span>
                                            <input type="email" class="form-control" placeholder="email"
                                                v-model="user.email" required>
                                        </div>

                                        <div class="col-md-12"><label class="labels">First Name</label>
                                            <input type="text" class="form-control" placeholder="first name"
                                                v-model="user.first_name">
                                        </div>

                                        <div class="col-md-12"><label class="labels">Last Name</label>
                                            <input type="text" class="form-control" placeholder="last name"
                                                v-model="user.last_name">
                                        </div>

                                        <div class="col-md-12"><label class="labels">Mobile Number</label>
                                            <input type="text" class="form-control" placeholder="phone number"
                                                v-model="user.phone_number" id="phone_number">
                                        </div>

                                    </div>

                                    <div class="mt-5 text-center">
                                        <button class="btn btn-primary profile-button" @click="submit">Save Profile</button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios';
const API_GATEWAY = import.meta.env.VITE_API_GATEWAY;

import { getToken } from '@/utils/auth';

export default {
    data() {
        return {
            user: localStorage.getItem('user'),
            userId: localStorage.getItem('userId'),
        };
    },
    mounted() {
        this.fetchData(); // Call the fetchData method from mounted
    },
    methods: {
        updateProfile() {
            const updatedData = {
                email: this.user.email,
                first_name: this.user.first_name,
                last_name: this.user.last_name,
                phone_number: this.user.phone_number,
            }

            axios.patch(`http://${API_GATEWAY}:80/api/v1/patients/${this.userId}/`, updatedData, {
                headers: {
                    Authorization: getToken()
                }
            }).then(response => {
                console.log(response.data);
                if (response.status === 200) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                    alert('Profile updated successfully.');
                    //window.location.reload();
                    this.fetchData();
                }

            }).catch(error => {
                alert('Error updating profile');
                console.error('Error:', error);
            });
        },
        async fetchData() {
            try {
                const response = await axios.get(`http://${API_GATEWAY}:80/api/v1/patients/${this.userId}`, {
                    headers: {
                        Authorization: getToken()
                    }
                });
                this.user = response.data;
                console.log(this.user);
            } catch (error) {
                console.error('User not found', error);
                console.log(error.response.data)
                if (error.response) {
                    console.error('Error details:', error.response);
                }
            }
        },

    }
}

</script>

<style>
.labels {
    font-size: 16px
}

.form-control {

    margin-bottom: 25px;
}

.required {
    color: red;
}
</style>
