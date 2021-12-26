<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" md="8" lg="4" xl="3">
        <v-card>
          <v-toolbar color="primary">
            <v-icon>mdi-login</v-icon>
            <v-toolbar-title>Logowanie</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <v-text-field
              label="Nazwa użytkownika"
              v-model="credentials.login"
              filled
            />

            <v-text-field
              label="Hasło"
              v-model="credentials.password"
              filled
            />
          </v-card-text>

          <v-card-actions>
            <v-btn color="success" @click="login">Zaloguj</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { AuthStoreModule } from "../../store/auth.store-module";

export default {
  data() {
    return {
      credentials: {},
      disabled: false
    };
  },

  methods: {
    async login() {
      this.disabled = true;

      await AuthStoreModule.login(this.credentials);

      this.disabled = false;
    }
  }
};
</script>
