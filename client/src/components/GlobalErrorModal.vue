<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-toolbar color="error" dense>
        <v-app-bar-nav-icon>
          <v-icon>mdi-alert</v-icon>
        </v-app-bar-nav-icon>
        <v-toolbar-title>Error occurred</v-toolbar-title>
      </v-toolbar>

      <v-card-text class="pt-5">
        <span v-for="(message, i) in messages" :key="message">
          {{ message }}
          <br v-if="messages.length - 1 !== i" />
        </span>
      </v-card-text>

      <v-card-actions>
        <v-btn @click="dialog = false" color="error">Ok</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import EventBus from "../plugins/event-bus";

export default {
  data() {
    return {
      messages: [],
      dialog: false
    };
  },

  mounted() {
    EventBus.$on("global-error:modal:show", err => {
      try {
        if (Array.isArray(err)) {
          this.messages = err;
          this.dialog = true;
          return;
        }

        const message = err.response.data.message;

        if (message && typeof message === "string") {
          this.messages = [err.response.data.message];
          this.dialog = true;
          return;
        }

        if (message && Array.isArray(message)) {
          this.messages = message;
          this.dialog = true;
        }
      } catch (error) {
        console.log(err, error);
        this.messages = ["Unknown error occurred."];
        this.dialog = true;
      }
    });
  }
};
</script>
