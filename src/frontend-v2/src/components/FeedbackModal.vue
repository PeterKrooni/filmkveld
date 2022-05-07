<template>
    <div id="modal-container" v-if="this.open">
        <Teleport to="body">
        <div v-if="open" class="modal" :class="type">
            <b>{{this.type}}</b>
            <p>{{this.content}}</p>
            <button @click="okPressed">Ok</button>
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
    position: fixed;
    padding: 10px;
    background: rgba(201, 201, 201, 0.99);
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
    border-top: 15px solid rgb(224, 193, 17);
}
.Confirmation {
    border-top: 15px solid green;
}
</style>
