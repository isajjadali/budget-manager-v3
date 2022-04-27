<template>
  <div>
    <validation-observer ref="observer" v-slot="{ invalid }">
      <form @submit.prevent="submit">
        <v-row class="ma-6 pa-3" justify="center">
          <v-card width="960px">
            <v-card-title>
              <span class="text-h5 ma-3 pa-3"><b> Update Employee </b></span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4" class="ma-3">
                    <v-text-field
                      v-model="employee.firstName"
                      :rules="[rules.required]"
                      value=""
                      label="Enter First Name"
                      required
                      :prepend-icon="icons.mdiAccount"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" class="ma-3">
                    <v-text-field
                      v-model="employee.lastName"
                      :rules="[rules.required]"
                      value=""
                      label="Enter Last Name"
                      required
                      :prepend-icon="icons.mdiAccount"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="4" class="ma-3">
                    <validation-provider
                      v-slot="{ errors }"
                      name="email"
                      rules="required|email"
                    >
                      <v-text-field
                        v-model="employee.email"
                        :rules="[rules.required]"
                        value=""
                        label="Enter Email"
                        required
                        prepend-icon="mdi-email"
                        :error-messages="errors"
                      ></v-text-field>
                    </validation-provider>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" class="ma-3">
                    <v-text-field
                      v-model="employee.password"
                      :rules="[rules.required, rules.min]"
                      :type="show ? 'text' : 'password'"
                      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                      prepend-icon="mdi-lock"
                      value=""
                      label="Enter Password"
                      required
                      counter
                      hint="At least 8 characters"
                      @click:append="show = !show"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="4" class="ma-3">
                    <v-text-field
                      v-model="employee.rate"
                      value=""
                      label="Enter Rate per-day"
                      type="number"
                      prefix="$"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" class="ma-3">
                    <v-text-field
                      v-model="employee.address"
                      value=""
                      label="Enter Address"
                      prepend-icon="mdi-map-marker"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="onCancel()">
                Close
              </v-btn>
              <v-btn
                type="submit"
                :disabled="invalid"
                color="blue darken-1"
                text
                @click="onSave()"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-row>
      </form>
    </validation-observer>
  </div>
</template>

<script>
import { mdiAccount } from "@mdi/js";
import { email } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

extend("email", {
  ...email,
  message: "Email must be valid",
});

export default {
  // props: {
  //   project: {
  //     type: Object,
  //     required: true,
  //   },
  // },
  name: "ProjectCreate",
  data: () => ({
    icons: {
      mdiAccount,
    },
    employee: {
      type: Object,
      firstName: "Jawad",
      lastName: "Haider",
      email: "jawad@gmail.com",
      password: "pakistan",
      rate: 120.1,
      address: "Lahore",
    },
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
    },
    show: false,
    email: "",
  }),
  methods: {
    onSave() {
      this.$emit("project-save", this.project);
    },
    onCancel() {
      this.$emit("cancel");
    },
    submit() {
      this.$refs.observer.validate();
    },
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
};
</script>
