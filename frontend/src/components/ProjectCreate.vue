<template>
  <v-row>
      <v-card width="100%">
        <v-card-title>
          <span class="text-h5 pa-3"><b> Create Project </b></span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4" class="ma-3">
                <v-text-field
                 v-model="project.name"
                  :rules="[rules.required]"
                  value=""
                  label="Enter Name"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4" class="ma-3">
                <v-text-field
                  v-model="project.amount"

                  label="Amount"
                  required
                  value=""
                  prefix="$"
                  type="number"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="4" class="ma-3 pa-1">
                <v-menu
                  v-model="startDateMenu"
                  :close-on-content-click="true"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="project.startDate"
                      label="Enter Start Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="project.startDate"
                    @input="menu2 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="12" sm="6" md="4" class="ma-3 pa-1">
                <v-menu
                  v-model="endDateMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="project.endDate"
                      label="Enter End Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="project.endDate"
                    @input="menu2 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-textarea
                  v-model="project.notes"
                  value="Enter Notes here :)"
                  class="pa-1"
                  clearable
                  clear-icon="mdi-close-circle"
                  label="Notes"
                  auto-grow
                ></v-textarea>
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
  // props: {
  //   project: {
  //     type: Object,
  //     required: true,
  //   },
  // },
  name: "ProjectCreate",
  data: () => ({
    rules: {
      required: (value) => !!value || "Required.",
    },
    
    startDateMenu: false,
    endDateMenu: false,
    project: {
      startDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
    endDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    }
  }),
  methods: {
    onSave() {
      this.$emit("save", this.project);
    },
    onCancel() {
      this.$emit("cancel");
    },
  },
};
</script>
