<template>
  <v-dialog 
    v-model="dialog" 
    persistent 
    max-width="600px"
  >
    <template #activator="{ on, attrs }">
      <v-btn 
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
    ...mapState('global', ['isCreatingActivity', 'employees']),
  },
  methods: {
    ...mapActions('global', ['createActivity', 'fetchAllEmployees']),
    onClose() {
      this.dialog = false;
      this.$emit('close');
    },
    async onSave(newActivity) {
      await this.createActivity(newActivity);
      this.$emit('save', newActivity);
      this.dialog = false;
    },
  },
  mounted() {
    this.fetchAllEmployees();
  }
};
</script>
