<template>
  <global-error-modal />
  <header>
    <h1>SimpleCloud</h1>
  </header>
  <router-view />
  <app-footer />
  <iframe id="download-frame" style="display: none;"></iframe>
</template>

<script>
import { AuthStore } from "./store/auth.store";
import GlobalErrorModal from "./components/GlobalErrorModal";
import { startRouter } from "./router";
import AppFooter from "./components/AppFooter";

export default {
  components: { GlobalErrorModal, AppFooter },

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

<style lang="scss" scoped>
@use "./scss/variables";

header {
  z-index: 100;

  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 60px;
  width: 100%;

  background-color: variables.$slate-800;
  color: variables.$slate-50;

  padding: 10px;

  h1 {
    font-family: Montserrat, sans-serif;
    font-weight: 700;
    font-size: variables.$text-3xl;
  }
}
</style>
