<template>
  <div>
    <v-row
      class="ma-6 pa-3"
      justify="center"
    >
      <v-card width="960px">
        <v-card-title>
          <span class="text-h5 pa-3"><b> Create Task </b></span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
                class="ma-3"
              >
                <v-text-field
                  :rules="[rules.required]"
                  value=""
                  label="Enter Name"
                  required
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
                class="ma-3 pa-1"
              >
                <v-text-field
                  :rules="[rules.required]"
                  value=""
                  prefix="$"
                  label="Enter Labour Cost"
                  required
                  type="number"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
                class="ma-3 pa-1"
              >
                <v-text-field
                  :rules="[rules.required]"
                  value=""
                  prefix="$"
                  label="Enter Material Cost"
                  required
                  type="number"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-textarea
                  value="Task Description..."
                  class="pa-1"
                  clearable
                  clear-icon="mdi-close-circle"
                  label="Notes"
                  auto-grow
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue darken-1"
            text
            @click="onCancel()"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="onSave()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'ProjectTaskCreate',
  data: () => ({
    rules: {
      required: (value) => !!value || 'Required.',
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
      this.$emit('project-save', this.project);
    },
    onCancel() {
      this.$emit('cancel');
    },
  },
};
</script>
