<template>
    
    <div class="container">
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-body text-white mailbox-widget pb-0" style=" background-color:  #567890">
                    <h2 class="text-white pb-3">Your Message</h2>
                    
        </div>
                
                            <!-- Mail list-->
                            <div class="table-responsive">
                                <table class="table email-table no-wrap table-hover v-middle mb-0 font-14">
                                    <tbody>
                                            <!-- label -->
                                            <tr v-for="message in messages" :key="message.id">
                                            <td class="pl-3">
                                                <div class="custom-control custom-checkbox">
                                                    <input type="checkbox" class="custom-control-input" :id="message.id" />
                                                    <label class="custom-control-label" :for="message.id">&nbsp;</label>
                                                </div>
                                            </td>
                        
                                            
                                            <td>
                                                <span class="mb-0 text-muted">{{ message.sender }}</span>
                                            </td>
                                            <!-- Message -->
                                            <td>
                                                <a class="link" href="javascript: void(0)">
                                                   
                                                    <span class="text-dark">{{ message.content }}</span>
                                                </a>
                                            </td>
                                            
                                            <!-- Time -->
                                            <td class="text-muted">{{ message.receivedTime }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
       
    
                         
</template>

<script>
export default {
    data() {
        return {
            messages: [
                {
                    id: 'M1',
                    sender: 'NAS',
                    content: 'More details in there',
                    receivedTime: 'May 22'
                },
                {
                    id: 'M2',
                    sender: 'ZE PEI',
                    content: 'Your appointment for dental cleaning has been successful',
                    receivedTime: 'May 13'
                },
                // ... more messages
            ]
        };
    },
    methods: {
        deleteMessage(messageId) {
            this.messages = this.messages.filter(msg => msg.id !== messageId);
        }
    }
}
</script>

<style >

body{
    background: #edf1f5;
    margin-top:70px;
}
.background-top {
    color:darkgrey
}
.card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 0 solid transparent;
    border-radius: 0;
}
.mailbox-widget .custom-tab .nav-item .nav-link {
    border: 0;
    color: #fff;
    border-bottom: 3px solid transparent;
}
.mailbox-widget .custom-tab .nav-item .nav-link.active {
    background: 0 0;
    color: #fff;
    border-bottom: 3px solid #2cd07e;
}
.no-wrap td, .no-wrap th {
    white-space: nowrap;
}
.table td, .table th {
    padding: .9375rem .4rem;
    vertical-align: top;
    border-top: 1px solid rgba(120,130,140,.13);
}
.font-light {
    font-weight: 300;
}

</style>