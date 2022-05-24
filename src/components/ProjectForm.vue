<template>
  <v-row>
    <v-card width="100%">
      <v-card-title>
        <span class="text-h5 pa-3"><b> Create Project </b></span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="6">
              <v-text-field
                v-model="project.name"
                :rules="[rules.required]"
                value=""
                label="Enter Name"
                required
              />
            </v-col>
            <v-col cols="12" sm="12" md="6">
              <v-text-field
                v-model="project.clientEmail"
                :rules="[rules.required]"
                label="Client Email"
                value=""
                type="email"
                required
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-text-field
                v-model="project.clientAddress"
                label="Client Address"
                required
                value=""
                type="text"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="blue darken-1" text @click="onCancel"> Close </v-btn>
        <v-btn color="blue darken-1" text @click="onSave"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-row>
</template>

<script>
export default {
  name: "ProjectCreate",
  props: {
    project: {
      type: Object,
    },
  },
  data: () => ({
    rules: {
      required: (value) => !!value || "Required.",
    },
  }),
  methods: {
    onSave() {
      console.log(this.project);
      this.$emit("save", this.project);
    },
    onCancel() {
      this.$emit("cancel");
    },
  },
};
</script>
