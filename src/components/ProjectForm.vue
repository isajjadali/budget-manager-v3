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
        :rules="[rules.required]"
        @change="onChange"
      ></v-select>
    </v-col>
    <v-col cols="12" sm="12" md="3">
      <v-text-field
        outlined
        v-model="project.name"
        label="Project Name"
        name="projectName"
        :rules="[rules.required]"
        type="text"
        @change="onChange"
    /></v-col>
    <v-col cols="12" sm="12" md="3">
      <v-text-field
        outlined
        v-model="project.clientEmail"
        label="Client Email"
        name="clientEmail"
        :rules="[rules.required]"
        type="email"
        @change="onChange"
    /></v-col>
    <v-col cols="12" sm="12" md="6">
      <v-text-field
        outlined
        v-model="project.clientAddress"
        label="Client Address"
        name="clientAddress"
        @change="onChange"
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
    onChange() {
      this.$emit("projectChange", this.project);
    },
  },
};
</script>
