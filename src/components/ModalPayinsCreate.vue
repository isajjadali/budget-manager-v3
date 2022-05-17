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
        Create Payin
      </v-btn>
    </template>
    <v-col cols="12">
      <ActivitiesCreate
        :isPayin="true"
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
    ...mapState('global', ['projects', 'employees']),
  },
  methods: {
    ...mapActions('global', ['createPayin', 'fetchAllEmployees', 'fetchAllProjects']),
    onClose() {
      this.dialog = false;
      this.$emit('close');
    },
    async onSave(newPayin) {
      await this.createPayin(newPayin);
      this.$emit('save', newPayin);
      this.dialog = false;
    },
  },
  mounted() {
    this.fetchAllEmployees();
    this.fetchAllProjects();
  },
};
</script>
