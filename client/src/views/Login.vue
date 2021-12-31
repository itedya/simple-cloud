<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h3>Login</h3>
      </div>
      <div class="card-body">
        <input type="text" placeholder="Username" v-model="username" />
        <input type="password" placeholder="Password" v-model="password" />
      </div>
      <div class="card-footer">
        <button @click="login">Login</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { AuthStore } from "../store/auth.store";
import EventBus from "../composables/event-bus";

export default {
  name: "Home",

  setup() {
    const router = useRouter();
    const username = ref();
    const password = ref();

    const login = async () => {
      await AuthStore.login(username.value, password.value)
        .then(() => router.push("/explorer"))
        .catch(err => EventBus.emit("global-error-modal:show", null, err));
    };

    return { username, password, login };
  }
};
</script>

<style lang="scss" scoped>
@use "./../scss/variables";

.container {
  padding: 60px 0;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0 auto;
}

input {
  transition: .3s;
  outline: none;

  padding: 12px;

  border: 0;
  border-radius: 5px;

  background-color: variables.$slate-600;
  color: variables.$slate-200;
  font-size: variables.$text-base;

  width: 100%;

  &::placeholder {
    color: variables.$slate-400;
  }

  &:focus {
    background-color: variables.$slate-700;
  }
}

.card {
  width: 100%;
  max-width: 500px;
}

.card-body {
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  gap: 10px;
}

.card-footer {
  display: flex;
  justify-content: flex-end;
}

button {
  padding: 10px;
  border-radius: 10px;
  border: 0;
  font-size: variables.$text-base;
  background-color: variables.$slate-200;
}
</style>
