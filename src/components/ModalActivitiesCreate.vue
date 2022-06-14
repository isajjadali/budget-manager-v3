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
        :is-payin="isPayin"
        :employees="employees"
        :projects="projects"
        :newActivity="newActivity"
        @cancel="onClose"
        @save="onSave"
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
    isPayin: Boolean,
  },
  data: () => ({
    dialog: false,
    newActivity: {
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
    },
  }),
  computed: {
    ...mapState('global', ['isCreatingActivity', 'employees', 'projects']),
    modalTitle() {
      return this.isPayin ? 'Payin' : 'Activity';
    }
  },
  methods: {
    ...mapActions('global', ['createActivity', 'fetchAllEmployees', 'fetchAllProjects', 'createPayin',]),
    onClose() {
      this.$emit('close');
      this.cleanUpModal();
    },
    async onSave(activity) {
      if (this.isPayin) {
        await this.createPayin(activity);
      } else {
        await this.createActivity(activity);
      }
      this.$emit('save', activity);
      this.cleanUpModal();
    },
    cleanUpModal() {
      this.dialog = false;
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
