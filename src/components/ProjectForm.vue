<template>
  <v-form
    ref="projectForm"
    v-model="isFormValid"
    style="width: 100%"
  >
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="8"
        width="100%"
      >
        <span class="text-h4 pa-3"><b> Create Project </b></span>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="2"
        width="100%"
      >
        <v-select
          v-model="project.status"
          :items="statuses"
          item-text="label"
          item-value="value"
          filled
          label="Status"
          class="float-right"
          :rules="[rules.required]"
          @change="onChange"
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="2"
        width="100%"
      >
        <v-btn
          color="primary"
          class="ma-1 save-btn float-right"
          elevation="9"
          rounded
          :disabled="!isValid"
          @click="onSave"
        >
          Save
        </v-btn>
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="3"
      >
        <v-text-field
          v-model="project.name"
          outlined
          label="Project Name"
          name="projectName"
          :rules="[rules.required]"
          type="text"
          @change="onChange"
        />
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="3"
      >
        <v-text-field
          v-model="project.clientEmail"
          outlined
          label="Client Email"
          name="clientEmail"
          :rules="[rules.required]"
          type="email"
          @change="onChange"
        />
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="6"
      >
        <v-text-field
          v-model="project.clientAddress"
          outlined
          label="Client Address"
          name="clientAddress"
          @change="onChange"
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  name: 'ProjectCreate',
  props: {
    project: {
      type: Object,
    },
  },
  data: () => ({
    rules: {
      required: (value) => !!value || 'Required.',
    },
    isFormValid: true,
    isValid: true,
    statuses: [
      {
        label: 'Draft',
        value: 'DRAFT'
      },
      {
        label: 'Pending Review',
        value: 'PENDINGREVIEW'
      },
      {
        label: 'On Going',
        value: 'ONGOING'
      },
      {
        label: 'Completed',
        value: 'COMPLETED'
      },
    ],
  }),
  methods: {
    onChange() {
      this.$emit('projectChange', this.project);
    },
    onSave() {
      this.$emit('save', this.project);
    },
  },
};
</script>
<style>
.save-btn {
  width: 100%;
}
</style>
