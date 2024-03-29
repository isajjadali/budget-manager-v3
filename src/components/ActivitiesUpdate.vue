<template>
  <v-form v-model="isFormValid">
    <div>
      <v-row>
        <v-card width="100%">
          <v-card-title>
            <span class="text-h5 pa-3"><b> Update Record ({{ ActivityTypeMap[currentData.type].label }}) </b></span>
            <v-icon>
              {{ActivityTypeMap[currentData.type].icon}}
            </v-icon>
          </v-card-title>
          <v-card-text>
            <v-alert
              v-if="!currentData.isPaid"
              dense
              text
              type="info"
            >
              <strong>Amount</strong> can be changed by deleting this <strong>Activity</strong> and creating a <strong>New</strong>
            </v-alert>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                  class="ma-3"
                >
                  <v-text-field
                    v-model.number="currentData.amount"
                    label="Amount"
                    :rules="amountFieldRules"
                    value=""
                    :prefix="CURRENCY_SYMBOL"
                    type="number"
                    :disabled="!currentData.isPaid"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                  class="ma-3"
                >
                  <v-menu
                    v-model="taskDateMenu"
                    :close-on-content-click="true"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template #activator="{ on, attrs }">
                      <v-text-field
                        v-model="currentData.date"
                        label="Enter Date"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      />
                    </template>
                    <v-date-picker
                      v-model="currentData.date"
                      @input="menu2 = false"
                    />
                  </v-menu>
                </v-col>
              </v-row>
              <v-row>
                <v-col v-if="currentData.employeeId">
                  <v-select
                    v-model="currentData.employeeId"
                    :items="employees"
                    item-text="fullName"
                    item-value="id"
                    label="Available Employees"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-select
                    v-model="currentData.projectId"
                    :items="projects"
                    item-text="name"
                    item-value="id"
                    label="Select Project"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions class="py-5 px-5">
            <v-spacer />
            <v-btn
              color="blue darken-1"
              text
              @click="onCancel"
            >
              Close
            </v-btn>
            <v-btn
              color="primary"
              rounded
              :disabled="!isFormValid"
              @click="onSave"
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
import { CURRENCY_SYMBOL, ActivityTypeMap, ActivityType } from '@/enums';

export default {
  name: 'ActivitiesUpdate',
  props: {
    currentData: {
      type: Object,
      required: true,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
    },
    employees: [],
    projects: [],
  },
  data: () => ({
    taskDateMenu: false,
    ActivityTypeMap,
    rules: {
      required: (value) => !!value || 'Required.',
      positiveAmount: (a) => a >= 0 || "Amount must be Positive",
    },
    CURRENCY_SYMBOL,
    isFormValid: true,
  }),
  methods: {
    onSave() {
      this.$emit('save', this.currentData);
    },
    onCancel() {
      this.$emit('cancel');
    },
  },
  computed: {
    amountFieldRules() {
      const rules = [this.rules.positiveAmount];
      if (!this.currentData.isLabour) {
        rules.push(this.rules.required);
      }
      return rules;
    },
  },
  mounted() {
  }
};
</script>
