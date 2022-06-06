<template>
  <v-row class="align-center">
    <v-col
      cols="12"
      class="py-0 pending-amount"
    >
      <p
        class="ma-0"
        :class="{'red--text': pendingAmount > 0, 'green--text': pendingAmount <= 0 }"
      >
        Pending: <span style="font-size: 24px;"><b>{{ CURRENCY_SYMBOL }} {{ pendingAmount }}</b></span>
      </p>
    </v-col>
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
      />
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
import {sumBy} from 'lodash';
import {mapState} from 'vuex';
import ModalEmployeeCreate from '../../components/ModalEmployeeCreate.vue';
import EmployeeList from '../../components/EmployeeList.vue';
import {CURRENCY_SYMBOL} from '@/enums';

export default {
  name: 'EmployeesListPage',
  components: {
    ModalEmployeeCreate,
    EmployeeList,
  },
  data: () => {
    return {
      CURRENCY_SYMBOL,
      searchEmployeeQuery: '',
    };
  },
  computed: {
    ...mapState('global', ['employees']),

    pendingAmount() {
      return sumBy(this.employees, 'balance');
    },
    employeesList() {
      if (this.searchEmployeeQuery) {
        const regixExpression = new RegExp(`^${this.searchEmployeeQuery}`, 'i');
        return this.employees.filter((employee) => {
          return regixExpression.test(employee.fullName);
        });
      }
      return this.employees;
    }
  },
};
</script>
<style scoped>
.pending-amount {
  text-align: right;
}
</style>
