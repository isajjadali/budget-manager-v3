<template>
  <div>
    <v-row no-gutters>
      <v-col>
        <h1 class="text-center">
          {{ header }}
        </h1>
      </v-col>
    </v-row>
    <v-row class="ma-0">
      <v-col 
        v-for="employee in employees" 
        :key="employee.id" 
        class="d-flex child-flex ma-1 mx-13 mt-4"
        cols="3"
        @click="onEmployeeClick(employee)"
      >
        <EmployeeCard 
          :employee="employee" 
          @editEmployee="onEditEmployee"
          @delete="deleteEmployee"
          
        />
      </v-col>
      <ModalEdit 
      :isOpen="isToggleOpen" 
      :isEmployee="true" 
      :employee="activeEmployee" 
      @save="onSave" 
      @cancel="onCancel" 
      />
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ModalEdit from './ModalEdit.vue';
import EmployeeCard from './EmployeeCard.vue';

export default {
  name: "EmployeeList",
  data() {
    return {
      header: "All Employees ",
      activeEmployee: {
        type: Object,
      },
      isToggleOpen: false,
      activityQuery: "employeeIds=",
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
    async onEditEmployee(employee) {
      await this.updateEmployee(employee);
      this.fetchAllEmployees(true);
      this.isToggleOpen = false;
    },
    onCancel() {
      this.isToggleOpen = false;
    },
    onButtonClick(employee) {
      // this.$router.push({ name: 'all-activities', query: {employeeIds: `${employee.id}`}})
      // console.log(employee);
    },
    deleteEmployee(employee) {
      alert('Employee deleted', employee.fullName);
    }
  },
  computed: {
    ...mapState("global", ["employees"]),
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
