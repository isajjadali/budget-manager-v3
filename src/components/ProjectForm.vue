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
        class="pb-0"
      >
        <v-text-field
          v-model="project.name"
          outlined
          label="Project Name"
          name="projectName"
          :rules="[rules.required]"
          type="text"
          @change="onChange"
          :hide-details="true"
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
import ProjectCTA from './ProjectCTA.vue';
import LoaderView from './LoaderView.vue';

const reNumberOnly = /\d+/g
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
    },
    isFormValid: true,
    isValid: true,
    pageHeader: "",
    queryDate: '',
    dateSelection:[]
  }),
  computed: {
  //   dateSelection() {
  //     if (!this.queryDate) {
  //       return [];
  //     }
  //     return [
  //       { label: this.queryDate + ' Days', value: this.queryDate + 'd' },
  //       { label: this.queryDate + ' Weeks', value: this.queryDate + 'w' },
  //       { label: this.queryDate + ' Months', value: this.queryDate + 'm' },
  //     ];
  //   },
  },
  methods: {
    onChange(val) {
      console.log(val)
      if (!val) {
        return;
      }
      const number = reNumberOnly.exec(val);
      this.queryDate = number ? number[0] : '';
      this.dateSelection = [
        { label: this.queryDate + ' Days', value: this.queryDate + 'd' },
        { label: this.queryDate + ' Weeks', value: this.queryDate + 'w' },
        { label: this.queryDate + ' Months', value: this.queryDate + 'm' },
      ]
      // this.$emit('projectChange', this.project);
    },
    onSave() {
      this.$emit('save', this.project);
    },
  },
  mounted() {
    this.project.expectedEntDate = '34d';
    this.queryDate = reNumberOnly.exec(this.project.expectedEntDate)[0];
    if (this.isProjectCreate) {
      this.pageHeader = "Create Project";
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
