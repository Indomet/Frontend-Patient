<template>
    <div class="m-3">
        <div class="mb-4">
            <div class="card">
                <div class="card-body text-white mailbox-widget pb-0" style="background-color: #567890">
                    <h2 class="text-white pb-3">Your Message</h2>
                </div>

                <!-- Mail list -->
                <div class="table-responsive">
                    <table class="table email-table no-wrap table-hover mb-0 font-14">
                        <thead class="table-light sticky-header">
                            <tr>
                                <th>
                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" id="checkAllBottom" v-model="selectAll" @change="toggleSelectAll" />
                                        <label class="custom-control-label" for="checkAllBottom"> All</label>
                                    </div>
                                </th>
                                <th>Sender</th>
                                <th>Content</th>
                                <th>Received Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="message in messages" :key="message.id">
                                <td class="pl-3">
                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" :id="'check_' + message.id" v-model="message.selected" />
                                        <label class="custom-control-label" :for="'check_' + message.id">&nbsp;</label>
                                    </div>
                                </td>
                                <td>
                                    <span class="mb-0 text-muted">{{ message.sender }}</span>
                                </td>
                                <td>
                                    <a class="link" href="javascript:void(0)" @click="showMessageDetails(message)">
                                        <span class="text-dark">{{ message.content }}</span>
                                    </a>
                                </td>
                                <td class="text-muted">{{ message.receivedTime }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div> 
        </div>

        <div class="row justify-content-start mt-4">
            <div class="col-auto">
                <button class="btn btn-danger" @click="deleteSelectedMessages">Delete </button>
            </div>
        </div>

        <div v-if="selectedMessage" class="message-details">
        <h3>Message Details</h3>
        <p><strong>Sender:</strong> {{ selectedMessage.sender }}</p>
        <p><strong>Content:</strong> {{ selectedMessage.content }}</p>
        <p><strong>Received Time:</strong> {{ selectedMessage.receivedTime }}</p>
    </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectAll: false,
            selectedMessage: null,
            messages: [
                {
                    id: 'M1',
                    sender: 'NAS',
                    content: 'More details in there',
                    receivedTime: 'May 22',
                    selected: false
                },
                {
                    id: 'M2',
                    sender: 'ZE PEI',
                    content: 'Your appointment for dental cleaning has been successful',
                    receivedTime: 'May 13',
                    selected: false
                },
                
            ]
        };
    },
    methods: {
        toggleSelectAll() {
            this.messages.forEach(message => {
                message.selected = this.selectAll;
            });
        },
        deleteSelectedMessages() {
            this.messages = this.messages.filter(msg => !msg.selected);
        },
        showMessageDetails(message) {
            this.selectedMessage = message;
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

.email-table {
    width: 100%;
}

</style>