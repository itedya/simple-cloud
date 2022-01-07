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
  <footer>
    <router-link
      v-for="route in routes"
      :key="route.path"
      :to="route.path"
      class="router-link"
    >
      {{ route.name }}
    </router-link>
  </footer>
</template>

<style lang="scss">
@use "./../scss/variables";

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

  background-color: variables.$slate-700;

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

@media (min-width: variables.$breakpoint-md) {
  footer {
    display: none;
  }
}
</style>
