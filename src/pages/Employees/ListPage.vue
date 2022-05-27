<template>
  <v-row class="align-center">
    <v-col
      cols="12"
      md="10"
    >
    <v-text-field
          v-model="searchEmployeeQuery"
          label="Search Employee..."
          clearable
          solo
          placeholder="Name"
          hide-details
        ></v-text-field>
    </v-col>
    <v-col 
      cols="12"
      md="2"
    >
      <ModalEmployeeCreate />
    </v-col>
    <v-col cols="12">
      <EmployeeList :employees="employeesList" />
    </v-col>
  </v-row>
</template>

<script>
import ModalEmployeeCreate from '../../components/ModalEmployeeCreate.vue';
import EmployeeList from '../../components/EmployeeList.vue';
import { mapState } from "vuex";

export default {
  name: 'EmployeesListPage',
  components: {
    ModalEmployeeCreate,
    EmployeeList,
  },
  data: () => {
    return {
      searchEmployeeQuery: '',
    };
  },
  computed: {
    ...mapState("global", ["employees"]),

    employeesList() {
      if (this.searchEmployeeQuery) {
        const regixExpression = new RegExp (`^${this.searchEmployeeQuery}`, 'i');
        return this.employees.filter((employee) => {
          return regixExpression.test(employee.fullName);
        });
      }
      return this.employees;
    }
  },
};
</script>
