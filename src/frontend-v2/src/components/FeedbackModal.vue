<template>
    <div id="modal-container" v-if="this.open">
        <Teleport to="body">
        <div v-if="open" class="modal" :class="type">
            <div id="type-icon">
                
                <div v-if="this.type === 'Error'">❌</div>
                <div v-if="this.type === 'Warning'">⚠</div>
                <div v-if="this.type === 'Confirmation'">✔</div>
            </div>
            <b>{{this.type}}</b>
            <p>{{this.content}}</p>
            <button id="close-btn" @click="okPressed">Close</button>
        </div>
        </Teleport>

    </div>
</template>

<script>
export default {
    props: {
        open: false,
        type: {
            type: String,
            default: 'Confirmation',
        },
        content: {
            type: String,
            default: 'Content'
        }
    },
    methods: {
        okPressed(){
            this.$emit('modalClosed')
        }
    },
    emits: ['modalClosed']
}
</script>

<style scoped>
.modal {
    position: fixed;box-shadow: rgba(0, 0, 0, 0.56) 1px 50px 100px 20px;
    padding: 10px;
    background: #2a3139;
    color: white;
    backdrop-filter: blur(20px);
    border-radius: 0.5em;
    z-index: 9999;
    top: 40%;
    left: 50%;
    width: 400px;
    margin-left: -150px;
}
.Error {
    border-top: 15px solid rgb(219, 21, 21);
}
.Warning {
    border-top: 15px solid rgb(185, 161, 25);
}
.Confirmation {
    border-top: 15px solid green;
}
#close-btn{
    float: right;
    background: #2a3139;
    color: rgb(198, 190, 190);
    border: 1px solid white;
    border-radius: 0.5em;
    padding: 5px;
}
#close-btn:hover{
    opacity: 0.65;
    transition-duration: 200ms;
}
#type-icon{
    padding-right: 5px;
    float: right;
    border: none;
    background: #2a3139;
    color: white;
    font-size: 20px;
}
</style>
