<template>
  <vue-final-modal
    v-model="dialog"
    content-class="global-error-modal card card-red"
  >
    <div class="card-header">
      <h3>Error</h3>
    </div>

    <div class="card-body">
      <p v-for="message in messages" :key="message">{{ message }}</p>
    </div>

    <div class="card-footer">
      <button class="btn btn-red" @click="dialog = false">Ok</button>
    </div>
  </vue-final-modal>
</template>

<script>
import EventBus from "../composables/event-bus";

export default {
  data() {
    return {
      dialog: false,
      messages: []
    };
  },

  mounted() {
    EventBus.on("global-error-modal:show", (data) => {
      try {
        if (Array.isArray(data)) this.messages = data;

        if (data.response.data.message && Array.isArray(data.response.data.message)) {
          this.messages = data.response.data.message;
        } else if (data.response.data.message) {
          this.messages = [data.response.data.message];
        }
      } catch (e) {
        console.log(e);
        this.messages = ["Unknown error occured."];
      }

      this.dialog = true;
    });
  }
};
</script>

<style lang="scss">
.global-error-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 100%;
  max-width: 500px;
}
</style>
