<template>
  <v-row>
    <v-card width="100%">
      <v-card-title>
        <span class="text-h5 ma-3 pa-3"><b> Add Employee </b></span>
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
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4" class="ma-3">
              <v-text-field
                v-model="employee.lastName"
                :rules="[rules.required]"
                value=""
                label="Enter Last Name"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" md="4" class="ma-3">
              <v-text-field
                v-model="employee.email"
                :rules="[rules.required]"
                value=""
                label="Enter Email"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4" class="ma-3">
              <v-text-field
                v-model="employee.password"
                :rules="[rules.required, rules.min]"
                :type="show ? 'text' : 'password'"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
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
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4" class="ma-3">
              <v-text-field
                v-model="employee.address"
                value=""
                label="Enter Address"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="onCancel"> Close </v-btn>
        <v-btn color="blue darken-1" text @click="onSave"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-row>
</template>

<script>
export default {
  name: "EmployeeCreate",
  data: () => ({
    employee: {},

    rules: {
      required: (value) => !!value || "Required.",
    },
    show: false,
  }),
  methods: {
    onSave() {
      this.$emit("save", this.employee);
    },
    onCancel() {
      this.$emit("cancel");
    },
  },
};
</script>
