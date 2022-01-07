<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import validateRoute from "../composables/router/validate-route.composable";

const router = useRouter();
const routes = computed(() => router.options.routes.filter(ele => {
  const validation = validateRoute(ele);

  return validation.pass;
}));
</script>

<template>
  <header>
    <div class="container">
      <h1>SimpleCloud</h1>

      <nav>
        <a v-for="route in routes" :key="route.path" :href="route.path" class="nav-item">{{ route.name }}</a>
      </nav>
    </div>
  </header>
</template>

<style lang="scss">
@use "./../scss/variables";

header {
  z-index: 100;

  position: fixed;
  top: 0;
  left: 0;

  background-color: variables.$slate-800;

  height: 60px;
  width: 100%;

  .container {
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    color: variables.$slate-50;

    padding: 0 10px;

    h1 {
      font-family: "Montserrat", sans-serif;
      font-weight: 400;
      font-size: variables.$text-3xl;
      line-height: 60px;
    }

    nav {
      display: none;

      @media (min-width: variables.$breakpoint-md) {
        display: flex;
      }

      justify-content: center;
      align-items: center;

      .nav-item {
        text-decoration: none;
        color: variables.$slate-200;
        font-size: variables.$text-lg;
        font-weight: 700;
        font-family: "Roboto", sans-serif;
        line-height: 60px;
        padding: 0 12px;
      }
    }
  }
}
</style>
