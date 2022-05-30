<template>
  <v-row>
      <v-col 
        v-for="employee in employees" 
        :key="employee.id" 
        class=""
        cols="12"
        md="3"
      >
        <EmployeeCard 
          :employee="employee" 
          @editEmployee="onEmployeeClick"
          @delete="deleteEmployee"
          @activityLink="onActivityButtonClick"
        />
      </v-col>
      <ModalEdit 
      :isOpen="isToggleOpen" 
      :isEmployee="true" 
      :employee="activeEmployee" 
      @save="onSaveEditEmployee" 
      @cancel="onCancel" 
      />
    </v-row>
</template>

<script>
import { mapActions } from "vuex";
import ModalEdit from './ModalEdit.vue';
import EmployeeCard from './EmployeeCard.vue';

export default {
  name: "EmployeeList",
  props: {
    employees: [],
  },
  data() {
    return {
      header: "All Employees",
      activeEmployee: {
        type: Object,
      },
      isToggleOpen: false,
    };
  },
  methods: {
    ...mapActions("global", ['fetchAllEmployees', 'updateEmployee']),
    editEmployee(employee) {
      this.activeEmployee = employee;
    },
    onEmployeeClick(employee) {
      this.activeEmployee = employee;
      this.isToggleOpen = true;
    },
    async onSaveEditEmployee(employee) {
      await this.updateEmployee(employee);
      this.fetchAllEmployees(true);
      this.isToggleOpen = false;
    },
    onCancel() {
      this.isToggleOpen = false;
    },
    onActivityButtonClick(employee) {
      this.$router.push({ name: 'all-activities', query: {employeeIds: `${employee.id}`}});
    },
    deleteEmployee(employee) {
      alert('Employee deleted', employee.fullName);
    }
  },
  mounted() {
    this.fetchAllEmployees();
  },
  components: {
    ModalEdit,
    EmployeeCard,
  }
};
</script>
