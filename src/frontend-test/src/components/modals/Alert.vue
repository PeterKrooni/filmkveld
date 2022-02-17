<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">{{header}}</slot>
              <button
                class="modal-default-button"
                @click="$emit('close')"
              >{{confirmation}}</button>
          </div>

          <div class="modal-body">
            <slot name="body">{{body}}</slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
            </slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script scoped>
export default {
    props: {
      show: Boolean,
      header: String,
      body: String,
      footer: String,
      confirmation: String
    }
}
</script>


<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.15);
  display: table;
  transition: opacity 0.15s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 0.2em;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.15s ease;
  text-align: left;
}

.modal-header {
  margin-top: 0;
  text-align: left;
  font-weight: bolder;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
  background-color: white;
  border: 1px solid rgb(165, 165, 165);
  border-radius: 0.1em;
  padding-left: 10px;
  padding-right: 10px;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>