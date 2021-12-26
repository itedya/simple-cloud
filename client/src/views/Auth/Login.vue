<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" lg="4" xl="3">
        <v-card>
          <v-toolbar color="primary" dense dark>
            <v-icon>mdi-login</v-icon>
            <v-toolbar-title>Sign in</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <v-text-field
              label="Username"
              v-model="credentials.login"
              :rules="rules.username"
              filled
            />

            <v-text-field
              type="password"
              label="Password"
              v-model="credentials.password"
              :rules="rules.password"
              filled
            />
          </v-card-text>

          <v-card-actions>
            <v-btn color="success" @click="signIn">Sign in</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { AuthStoreModule } from "../../store/auth.store-module";
import { passwordRules, usernameRules } from "../../rules/user";

export default {
  data() {
    return {
      credentials: {},
      disabled: false,
      rules: {
        username: usernameRules,
        password: passwordRules
      }
    };
  },

  methods: {
    async signIn() {
      this.disabled = true;

      await AuthStoreModule.login(this.credentials);

      this.disabled = false;
    }
  }
};
</script>
