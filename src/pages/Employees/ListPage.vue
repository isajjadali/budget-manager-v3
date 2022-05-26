<template>
  <v-row>
    <v-col cols="12" class="d-flex justify-end">
    <ModalEmployeeCreate />
    </v-col>
    <v-col cols="12">
      <EmployeeList />
    </v-col>
  </v-row>
</template>

<script>
import ModalEmployeeCreate from '../../components/ModalEmployeeCreate.vue';
import EmployeeList from '../../components/EmployeeList.vue';

export default {
  name: 'EmployeesListPage',
  components: {
    ModalEmployeeCreate,
    EmployeeList,
  },
};
</script>