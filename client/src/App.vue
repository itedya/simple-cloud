<template>
  <global-error-modal />
  <header>
    <h1>SimpleCloud</h1>
  </header>
  <router-view />
  <footer>
    <router-link
      v-for="route in this.$router.options.routes"
      :key="route.path"
      :to="route.path"
      class="router-link"
    >
      {{ route.name }}
    </router-link>
  </footer>
</template>

<script>
import { AuthStore } from "./store/auth.store";
import GlobalErrorModal from "./components/GlobalErrorModal";
import { startRouter } from "./router";

export default {
  components: { GlobalErrorModal },

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

footer {
  z-index: 100;

  position: fixed;
  bottom: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  height: 60px;
  width: 100%;

  background-color: variables.$slate-800;

  .router-link {
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 60px;

    text-decoration: none;
    color: variables.$slate-50;

    font-size: variables.$text-lg;
    font-weight: 500;
  }
}
</style>
