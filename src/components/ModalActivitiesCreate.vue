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
        v-on="on"
      >
        Create Activity
      </v-btn>
    </template>
    <v-col cols="12">
      <ActivitiesCreate
        :employees="employees"
        :projects="projects"
        @cancel="onClose"
        @save="onSave"
      />
    </v-col>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import ActivitiesCreate from './ActivitiesCreate.vue';

export default {
  components: {
    ActivitiesCreate,
  },
  data: () => ({
    dialog: false,
  }),
  computed: {
    ...mapState('global', ['isCreatingActivity', 'employees', 'projects']),
  },
  methods: {
    ...mapActions('global', ['createActivity', 'fetchAllEmployees', 'fetchAllProjects']),
    onClose() {
      this.dialog = false;
      this.$emit('close');
    },
    async onSave(newActivity) {
      this.dialog = false;
      await this.createActivity(newActivity);
      this.$emit('save', newActivity.data);
    },
  },
  mounted() {
    this.fetchAllEmployees();
    this.fetchAllProjects();
  }
};
</script>
