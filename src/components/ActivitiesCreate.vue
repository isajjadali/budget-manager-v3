<template>
  <v-form v-model="invalid">
    <div>
      <v-row>
        <v-card width="100%">
          <v-card-title>
            <span class="text-h5 pa-3"><b> {{ headerTitle }} </b></span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4" class="ma-3">
                  <v-text-field
                    v-model.number="activity.amount"
                    label="Amount"
                    :prefix="CURRENCY_SYMBOL"
                    type="number"
                  />
                </v-col>
                <v-col cols="12" sm="6" md="4" class="ma-3">
                  <v-menu
                    v-model="dateMenu"
                    :close-on-content-click="true"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template #activator="{ on, attrs }">
                      <v-text-field
                        v-model="activity.date"
                        label="Enter Date"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      />
                    </template>
                    <v-date-picker
                      v-model="activity.date"
                      @input="menu2 = false"
                    />
                  </v-menu>
                </v-col>
              </v-row>
              <v-row>
                <v-col v-if="!isPayin">
                  <v-select
                    v-model="activity.employeeId"
                    :items="employees"
                    item-text="fullName"
                    item-value="id"
                    :rules="[requiredEmployee]"
                    label="Available Employees"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-select
                    v-model="activity.projectId"
                    :items="projects"
                    item-text="name"
                    :rules="[requiredProject]"
                    item-value="id"
                    label="Select Projects"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="blue darken-1" text @click="onCancel"> Close </v-btn>
            <v-btn
              :disabled="!invalid"
              color="primary"
              text
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

export default {
  name: "ActivityCreate",
  props: ["isPayin", "employees", "projects"],
  data: () => ({
    activity: {
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
    },
    requiredProject: (p) => !!p || "Project is required",
    requiredEmployee: (e) => !!e || "Employee is required",
    dateMenu: false,
    invalid: true,
    CURRENCY_SYMBOL,
    headerTitle: String,
  }),
  methods: {
    onSave() {
      this.$emit("save", this.activity);
      this.activity = {};
    },
    onCancel() {
      this.activity = {
        date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),
      };
      this.$emit("cancel");
    },
  },
  computed: {
  },
  mounted() {
    (this.invalid = false), this.activity;
    if (this.isPayin) {
      this.headerTitle = "Create Payin";
    }
    else {
      this.headerTitle = "Create Activity";
    }
  },
};
</script>
