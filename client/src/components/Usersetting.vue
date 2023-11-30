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
                    <span class="font-weight-bold">Edogaru</span><span class="text-black-50">edogaru@mail.com.my</span><span> 
                    </span></div>
            </div>
            <div class="col-md-5 border-right">
                <div class="p-3 py-5">

                    <div class="row mt-3">
                        <div class="col-md-12"><label class="labels">User Email</label><span class="required">*</span>
                            <input type="email" class="form-control" placeholder="email" value="" required></div>
                        <div class="col-md-12"><label class="labels">Password</label><span class="required">*</span>
                            <input type="password" class="form-control" placeholder="password  (at least 6 digits)" value="" required></div>
                        <div class="col-md-12"><label class="labels">Frist Name</label><input type="text" class="form-control" placeholder="frist name" value=""></div>
                        <div class="col-md-12"><label class="labels">Last Name</label><input type="text" class="form-control" placeholder="last name" value=""></div>
                        <div class="col-md-12"><label class="labels">Mobile Number</label><input type="text" class="form-control" placeholder="phone number" value=""></div>
                        
                    </div>
                    
                    <div class="mt-5 text-center"><button class="btn btn-primary profile-button" type="button">Save Profile</button></div>
                </div>
            </div>
            
        </div>
    </div>
</div>
</div>
</div>
    
    </template>
    
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