<template>
  <v-row>
    <v-col v-if="isLoading" cols="12" md="12">
      <LoadingModal :isLoading="true" :message="'Getting Employees Please Wait !!'" />
    </v-col>
    <v-col
      v-else
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
    <LoadingModal 
      v-if="employees.length === 0 && !isLoading" 
      :message="'Employee Not Found...'" 
      :isLoading="false"
    />
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
import { mapActions, mapState } from "vuex";
import ModalEdit from './ModalEdit.vue';
import EmployeeCard from './EmployeeCard.vue';
import LoadingModal from './LoadingModal.vue';

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
  computed: {
    ...mapState ('global', ['isLoadingData']),

    isLoading() {
      console.log(this.employees.length);
      return this.isLoadingData.employees;
    }
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
    LoadingModal,
  }
};
</script>
