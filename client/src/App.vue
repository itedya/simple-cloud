<template>
  <global-error-modal />
  <app-header />
  <router-view />
  <app-footer />
  <a id="download-href" style="display: none;"></a>
</template>

<script>
import { AuthStore } from "./store/auth.store";
import GlobalErrorModal from "./components/GlobalErrorModal";
import { startRouter } from "./router";
import AppFooter from "./components/AppFooter";
import AppHeader from "./components/AppHeader";

export default {
  components: { GlobalErrorModal, AppFooter, AppHeader },

  mounted() {
    AuthStore.fetchUser()
      .then(() => {
        startRouter();
      })
      .catch(() => {
        startRouter();
        return false;
      });
  }
};
</script>
