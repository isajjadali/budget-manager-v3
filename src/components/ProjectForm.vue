<template>
  <v-row>
    <v-col cols="12" sm="12" md="12" width="100%" class="displayblock">
      <span class="text-h4 pa-3"><b> Create Project </b></span>
      <v-select
        :items="statuses"
        v-model="project.status"
        filled
        label="Status"
        class="float-right"
      ></v-select>
    </v-col>
    <v-col cols="12" sm="12" md="3">
      <v-text-field
        outlined
        v-model="project.name"
        label="Project Name"
        name="projectName"
        type="text"
    /></v-col>
    <v-col cols="12" sm="12" md="3">
      <v-text-field
        outlined
        v-model="project.clientEmail"
        label="Client Email"
        name="clientEmail"
    /></v-col>
    <v-col cols="12" sm="12" md="6">
      <v-text-field
        outlined
        v-model="project.clientAddress"
        label="Client Address"
        name="clientAddress"
    /></v-col>
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
    statuses: ["DRAFT", "PENDINGREVIEW", "ONGOING", "COMPLETED"],
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
