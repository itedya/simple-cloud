<template>
  <v-app>
    <global-error-modal />
    <v-app-bar
      app
      color="primary"
      dark
    >
      <h1 class="display-1">SimpleCloud</h1>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { startRouter } from "./router";
import GlobalErrorModal from "./components/GlobalErrorModal";
import { AuthStoreModule } from "./store/auth.store-module";

export default {
  name: "App",

  components: {
    GlobalErrorModal
  },

  data: () => ({
    //
  }),

  mounted() {
    AuthStoreModule.fetchUser()
      .then(() => startRouter())
      .catch(() => {
        startRouter();
        return false;
      });
  }
};
</script>
