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
        Create Employee
      </v-btn>
    </template>
    <v-col cols="12">
      <EmployeeCreate
        @cancel="onClose"
        @save="onSave"
      />
    </v-col>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import EmployeeCreate from './EmployeeCreate.vue';

export default {
  components: {
    EmployeeCreate,
  },
  data: () => ({
    dialog: false,
  }),
  computed: {
    ...mapState('global', ['isCreatingEmployee']),
  },
  methods: {
    ...mapActions('global', ['createEmployee']),
    onClose() {
      this.dialog = false;
      this.$emit('close');
    },
    async onSave(newEmployee) {
      await this.createEmployee(newEmployee);
      this.$emit('save', newEmployee);
      this.dialog = false;
    },
  },
};
</script>
