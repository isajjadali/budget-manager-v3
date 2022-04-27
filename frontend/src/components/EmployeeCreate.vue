<template>
  <div>
    <v-row class="ma-6 pa-3" justify="center">
      <v-card width="960px">
        <v-card-title>
          <span class="text-h5 ma-3 pa-3"><b> Add Employee </b></span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4" class="ma-3">
                <!-- <v-icon>{{ icons.mdiAccount }}</v-icon> -->
                <v-text-field
                  :rules="[rules.required]"
                  value=""
                  label="Enter First Name"
                  required
                  prepend-icon="mdi-Account"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4" class="ma-3">
                <v-text-field
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
                  :rules="[rules.required]"
                  value=""
                  label="Enter Email"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4" class="ma-3">
                <v-text-field
                  :rules="[rules.required]"
                  value=""
                  label="Enter Password"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="4" class="ma-3">
                <v-text-field
                  value=""
                  label="Enter Rate per-day"
                  type="number"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4" class="ma-3">
                <v-text-field value="" label="Enter Address"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="onCancel()"> Close </v-btn>
          <v-btn color="blue darken-1" text @click="onSave()"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </div>
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
    startDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    endDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    startDateMenu: false,
    endDateMenu: false,
  }),
  methods: {
    onSave() {
      this.$emit("project-save", this.project);
    },
    onCancel() {
      this.$emit("cancel");
    },
  },
};
</script>
