<template>
  <v-form v-model="invalid" ref="createForm">
    <div>
      <v-row>
        <v-card width="100%">
          <v-card-title>
            <span class="text-h5 ma-3 pa-3"><b> Add Employee </b></span>
          </v-card-title>
          <v-card-text>
            <v-container class="my-0">
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
                    :prepend-icon="mdiAccount"
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
                    :prepend-icon="mdiAccount"
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
                    v-model="employee.email"
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
                    v-model="employee.rate"
                    value=""
                    label="Enter Rate per-day"
                    type="number"
                    :prefix="CURRENCY_SYMBOL"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="5"
                  class="ma-3"
                >
                  <v-text-field
                    v-model="employee.address"
                    value=""
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
              :disabled="!invalid"
              color="primary"
              @click="onSave"
              rounded
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
    </div>
  </v-form>
</template>

<script>
import { CURRENCY_SYMBOL } from '@/enums';
import { mdiAccount } from '@mdi/js';

export default {
  name: 'EmployeeCreate',
  props: {
    employee: Object,
  },
  data: () => ({
    rules: {
      required: (value) => !!value || 'Required.',
      min: v => v.length >= 8 || 'Min 8 characters',
    },
    invalid: true,
    show: false,
    CURRENCY_SYMBOL,
    mdiAccount,
  }),
  methods: {
    onSave() {
      this.$emit('save', this.employee);
    },
    onCancel() {
      this.$emit('cancel');
    },
  },
};
</script>
