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
        rounded
      >
        Create Employee
      </v-btn>
    </template>
    <v-col cols="12">
      <EmployeeCreate
        ref="employeeCreateForm"
        :employee="newEmployee"
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
    newEmployee: {
      type: Object
    },
  }),
  computed: {
    ...mapState('global', ['isCreatingEmployee']),
  },
  methods: {
    ...mapActions('global', ['createEmployee']),

    onClose() {
      this.$emit('close');
      this.cleanUpForm();
    },
    async onSave(newEmployee) {
      await this.createEmployee(newEmployee);
      this.$emit('save', newEmployee);
      this.cleanUpForm();
    },
    cleanUpForm() {
      this.dialog = false;
      this.$refs.employeeCreateForm.$refs.createForm.resetValidation();
      this.$refs.employeeCreateForm.$refs.createForm.reset();
    }
  },
};
</script>
