<template>
    <div class="m-3">
        <div class="mb-4">
            <div class="card">
                <div class="card-body text-white mailbox-widget pb-0" style="background-color: #567890">
                    <h2 class="text-white pb-3">Profile Setting</h2>
                </div>
    <div class="container rounded bg-white mt-5 mb-5">
        <div class="row">
            <div class="col-md-3 border-right">
                <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                    <img class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg">
                    <span class="font-weight-bold"><p>{{ user.fname }} {{ user.lname }}</p></span>
                    <span class="text-black-50">{{ user.email }}</span>
                </div>
            </div>
            <div class="col-md-5 border-right">
                <div class="p-3 py-5">
                    <div class="row mt-3">
                        <div class="col-md-12">
                            <label class="labels">User Email</label>
                            <span class="required">*</span>
                            <input type="email" class="form-control" placeholder="email"  v-model="user.email" required>
                        </div>
                        
                        <div class="col-md-12"><label class="labels">Password</label>
                            <span class="required">*</span>
                            <input type="password" class="form-control" placeholder="password  (at least 6 digits)" 
                            v-model="user.password" required>
                        </div>

                        <div class="col-md-12"><label class="labels">Frist Name</label>
                            <input type="text" class="form-control" placeholder="frist name"  v-model="user.first_name">
                        </div>

                        <div class="col-md-12"><label class="labels">Last Name</label>
                            <input type="text" class="form-control" placeholder="last name"  v-model="user.last_name">
                        </div>

                        <div class="col-md-12"><label class="labels">Mobile Number</label>
                            <input type="text" class="form-control" placeholder="phone number" v-model="user.phone_number">
                        </div>
                        
                    </div>
                    
                    <div class="mt-5 text-center"><button class="btn btn-primary profile-button" type="button" 
                        @click="saveProfile">Save Profile</button></div>
                </div>
            </div>
            
        </div>
    </div>
</div>
</div>
</div>
    
</template>

<script>
//import axiosInstance from '@/axios.js';
import axios from 'axios';
import { getToken } from '@/utils/auth'
export default {
    data() {
        return {
            user: {
                email: '',
                password: '',
                first_name: '',
                last_name: '',
                phone_number: ''
            },
        };
    },
     async mounted() {
            try {
               
                const token = getToken(); 
                if (!token) {
                console.error('No token found');
                return;
                }
                const userId = this.getUserId();
                if (!userId) {
                console.error('No user ID found');
                return;
                }
                const response = await axios.get(`http://localhost:8000/api/v1/patients/${userId}` , {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status === 200) {
                    this.user = response.data;
                    console.log('Profile updated successfully',response.data);
                } else {
                    console.error('Unexpected response status:', response.status);
                }
            } catch (error) {
                    console.error('Error updating profile:', error);
                if (error.response) {
                    console.error('Error details:', error.response);
                }
                }
        },
        methods: {
            getUserId() {
            try{
                const userInfo = localStorage.getItem('userInfo');
                    if (userInfo) {
                        const user = JSON.parse(userInfo);
                        console.log('User info retrieved:', user);
                    return user.id; 
                    } else {
                        console.error('No user info found in localStorage');
                    }
            } catch (error) {
                console.error('Error parsing user info from localStorage:', error);
        }
            return null; 
        }
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