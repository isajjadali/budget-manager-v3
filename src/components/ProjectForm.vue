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
        <span class="text-h4 pa-3"><b> {{ pageHeader }} </b></span>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="4"
        class="d-flex justify-end"
      >
        <v-btn
          color="blue darken-1"
          text
          class="mr-1"
          :disabled="!isFormValid"
          @click="onSave"
        >
          Save As Draft
        </v-btn>
        <ProjectCTA :project="project" />
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="3"
        class="pb-0 mb-0"
      >
        <v-text-field
          v-model="project.name"
          outlined
          label="Project Name"
          name="projectName"
          :rules="[rules.required]"
          type="text"
          @change="onChange"
          hide-details="auto"
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
          hide-details="auto"
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
          :rules="[rules.required]"
          label="Client Address"
          name="clientAddress"
          @change="onChange"
          hide-details="auto"
        />
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="3"
      >
        <v-text-field
          v-model="project.expectedEndDate"
          outlined
          :rules="[rules.validateExpectedEndDate]"
          label="Expected End Date"
          name="expectedEndDate"
          @change="onChange"
          hint="End date should be like 1D, 1W OR 1M"
          persistent-hint
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import ProjectCTA from './ProjectCTA.vue';
import LoaderView from './LoaderView.vue';
import {ProjectStatus} from '@/enums';

export default {
  name: 'ProjectCreate',
  props: {
    project: {
      type: Object,
    },
    isProjectCreate: Boolean,
  },
  data: () => ({
    rules: {
      required: (value) => !!value || 'Required.',
      validateExpectedEndDate(value) {
        const reEndDate = /^\d*[D|M|W]$/g;
        if(value && !reEndDate.test(value)) {
          return 'End date should be like 1D, 1W OR 1M';
        }
        return true;
      },
    },
    isFormValid: true,
    pageHeader: "",
    ProjectStatus,
  }),
  computed: {
    validateExpectedEndDate(value) {
      const reEndDate = /^\d*[D|M|W]$/g;
      if(value && !reEndDate.test(value)) {
        return 'end date should be like 1D, 1W OR 1M';
      }
      return value;
    },
  },
  methods: {
    onChange() {
      this.$emit('projectChange', this.project);
    },
    onSave() {
      this.$emit('save', this.project);
    },
  },
  mounted() {
    if (this.isProjectCreate) {
      this.pageHeader = "Create Project";
      this.project.status = ProjectStatus.draft;
    } else {
      this.pageHeader = "Update Project";
    }
  },
  components: {
    ProjectCTA,
    LoaderView,
  },
};
</script>
<style>
.save-btn {
  width: 100%;
}
</style>
