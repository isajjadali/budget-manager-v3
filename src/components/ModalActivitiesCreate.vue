<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        rounded
        color="primary"
        dark
        v-bind="attrs"
        width="100%"
        v-on="on"
      >
        Create Record
      </v-btn>
    </template>
    <v-col cols="12">
      <ActivitiesCreate
        ref="activityCreateForm"
        :employees="employees"
        :projects="projects"
        :newActivity="newActivity"
        @cancel="onClose"
        @save="onSave"
        @addAndCreate="onAddAndCreateClick"
      />
    </v-col>
  </v-dialog>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import ActivitiesCreate from './ActivitiesCreate.vue';

export default {
  components: {
    ActivitiesCreate,
  },
  props: {
  },
  data: () => {
    return {
      dialog: false,
      newActivity: {
        date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),
      },
    };
  },
  computed: {
    ...mapState('global', ['isCreatingActivity', 'employees', 'projects']),
  },
  methods: {
    ...mapActions('global', ['createActivity', 'fetchAllEmployees', 'fetchAllProjects']),
    onClose() {
      this.$emit('close');
      this.cleanUpModal();
      this.dialog = false;
    },
    async onSave(activity) {
      await this.createActivity(activity);
      this.$emit('save', activity);
      this.cleanUpModal();
      this.dialog = false;
    },
    async onAddAndCreateClick(activity) {
      await this.createActivity(activity);
      this.cleanUpModal();
      this.$emit('save', activity);
    },
    cleanUpModal() {
      this.$refs.activityCreateForm.$refs.createForm.resetValidation();
      this.newActivity = {
        date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      };
    },
  },
  mounted() {
    this.fetchAllEmployees();
    this.fetchAllProjects();
  }
};
</script>
