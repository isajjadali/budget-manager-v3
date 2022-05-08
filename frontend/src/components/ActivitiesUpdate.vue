<template>
  <div>
    <v-row class="ma-6 pa-3" justify="center">
      <v-card width="960px">
        <v-card-title>
          <span class="text-h5 pa-3"><b> Update Activity </b></span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4" class="ma-3">
                <v-text-field
                  v-model="activity.amount"
                  label="Amount"
                  :rules="[rules.required]"
                  value=""
                  prefix="$"
                  type="number"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4" class="ma-3">
                <v-menu
                  v-model="taskDateMenu"
                  :close-on-content-click="true"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="activity.date"
                      label="Enter Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="activity.date"
                    @input="menu2 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-select
                  v-model="activity.employeeId"
                  :items="employees"
                  item-text="fullName"
                  item-value="id"
                  label="Available Employees"
                ></v-select>
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
  </div>
</template>

<script>
export default {
  name: "ActivitiesUpdate",
  props: {
    activity: {
      type: Object,
      required: true,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
    },
    employees: [],
  },
  data: () => ({
    taskDateMenu: false,
    rules: {
      required: (value) => !!value || "Required.",
    },
  }),
  methods: {
    onSave() {
      this.$emit("save", this.activity);
    },
    onCancel() {
      this.$emit("cancel");
    },
  },
};
</script>
