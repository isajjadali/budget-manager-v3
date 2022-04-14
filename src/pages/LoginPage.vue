<template>
  <v-app id="inspire">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Budget Manager - Login</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form v-model="valid">
                <v-text-field
                  v-model="email"
                  :rules="rules.email"
                  prepend-icon="mdi-account"
                  name="email"
                  label="Email"
                  type="text"
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  :rules="rules.password"
                  counter="8"
                  id="password"
                  prepend-icon="mdi-lock"
                  name="password"
                  label="Password"
                  type="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" :disabled="!valid" @click="onLogin"
                >Login</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "LoginPage",
  data: () => ({
    valid: false,
    email: "sajjad@gmail.com",
    password: "sajjad734",
    rules: {
      email: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      password: [
        (v) => !!v || "Password is required",
        (v) =>
          v.length >= 8 ||
          "Password must be greater than or equal to 8 characters",
      ],
    },
  }),
  created() {
    console.log('<<<<<--------------Start-------------------->>>>>');
    console.log(process.env);
    console.log('<<<<<---------------End--------------------->>>>>');
  },
  methods: {
    ...mapActions("global", ["login"]),
    async onLogin() {
      await this.login({
        email: this.email,
        password: this.password,
      });
      this.$router.push('/dashboard')
    },
  },
};
</script>
