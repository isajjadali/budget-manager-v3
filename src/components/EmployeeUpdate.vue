<template>
  <div>
    <v-row>
      <v-card width="100%">
        <v-card-title>
          <span class="text-h5 ma-3 pa-3"><b> Update Employee </b></span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="5"
                class="ma-3"
              >
                <v-text-field
                  v-model="employee.firstName"
                  :rules="[rules.required]"
                  value=""
                  label="Enter First Name"
                  required
                  :prepend-icon="icons.mdiAccount"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="5"
                class="ma-3"
              >
                <v-text-field
                  v-model="employee.lastName"
                  :rules="[rules.required]"
                  value=""
                  label="Enter Last Name"
                  required
                  :prepend-icon="icons.mdiAccount"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="5"
                class="ma-3"
              >
                <v-text-field
                  v-model="employeeEmail"
                  :rules="[rules.required]"
                  value=""
                  label="Enter Email"
                  required
                  prepend-icon="mdi-email"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="5"
                class="ma-3"
              >
                <v-text-field
                  v-model="employeeRate"
                  value=""
                  label="Enter Rate per-day"
                  type="number"
                  :prefix="CURRENCY_SYMBOL"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="5"
                class="ma-3"
              >
                <v-text-field
                  v-model="employee.address"
                  label="Enter Address"
                  prepend-icon="mdi-map-marker"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="pa-5">
          <v-spacer />
          <v-btn
            color="blue darken-1"
            text
            @click="onCancel"
          >
            Close
          </v-btn>
          <v-btn
            type="submit"
            color="primary"
            rounded
            @click="onSave"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </div>
</template>

<script>
import { mdiAccount } from '@mdi/js';
import { CURRENCY_SYMBOL } from '@/enums';

export default {
  name: 'EmployeeUpdate',
  props: {
    employee: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    icons: {
      mdiAccount,
    },
    rules: {
      required: (value) => !!value || 'Required.',
      min: (v) => v.length >= 8 || 'Min 8 characters',
    },
    show: false,
    CURRENCY_SYMBOL,
    employeeRate: Number,
    employeeEmail: "",
  }),
  methods: {
    onSave() {
      this.employee.rate = this.employeeRate;
      this.employee.email = this.employeeEmail;
      this.$emit('save', this.employee);
    },
    onCancel() {
      this.employeeRate = this.employee.rate;
      this.employeeEmail = this.employee.email;
      this.$emit('cancel');
    },
  },
  mounted() {
    this.employeeRate = this.employee.rate;
    this.employeeEmail = this.employee.email;
  }
};
</script>
