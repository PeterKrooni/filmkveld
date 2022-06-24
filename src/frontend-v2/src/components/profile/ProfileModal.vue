<template>    
    <div id="modal-container" v-if="this.open">
        <Teleport to="body">
        <div v-if="open" class="modal" :class="type">
                <div id="top"> <b>{{username}}</b> </div>
                <div id="mid">
                    <img src="profile_picture" style="width: 140px; height: 140px;" alt="">
                    <div>Karma: {{karma}}</div>
                </div>
        <button id="close-btn" @click="okPressed">Close</button>
        </div>
        </Teleport>
    </div>
</template>

<script>
export default {
    props: {
        open: false,
        username: {
            type: String,
            default: "None"
        },
        profile_picture: {
            type: String,
            default: "#" // TODO CDN default folder image
        },
        karma: {
            type: Number,
            default: 0
        },
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
#top {
    width: 100%;
    height: 20px;
    border-bottom: 1px solid rgb(125, 125, 125);
    margin: 10px;
    padding-bottom: 7.5px;
    font-size: 22px;
}
#mid {
    width: 100%;
    display: flex;
    flex-flow: row;
    justify-content: space-evenly;
    align-items: center;
}
.modal {
    position: absolute;
    top: 40%;
    left: 50%;
    box-shadow: rgba(0, 0, 0, 0.7) -75px 15px 100px 100vw;
    padding: 10px;
    background: #333c47;
    color: white;
    backdrop-filter: blur(20px);
    border-radius: 0.5em;
    z-index: 9999;
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
    background: #333c47;
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
    background: #333c47;
    color: white;
    font-size: 20px;
}
</style>