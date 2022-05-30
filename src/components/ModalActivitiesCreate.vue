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
        Create {{ modalTitle }}
      </v-btn>
    </template>
    <v-col cols="12">
      <ActivitiesCreate
        :is-payin="isPayin"
        :employees="employees"
        :projects="projects"
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
      this.dialog = false;
      this.$emit('close');
    },
    async onSave(newActivity) {
      this.dialog = false;
      if (this.isPayin) {
        await this.createPayin(newActivity);
      } else {
        await this.createActivity(newActivity);
      }
      this.$emit('save', newActivity.data);
    },
  },
  mounted() {
    this.fetchAllEmployees();
    this.fetchAllProjects();
  }
};
</script>
