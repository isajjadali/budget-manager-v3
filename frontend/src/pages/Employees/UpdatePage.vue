<template>
  <p v-if="!currentEmployee"><b> Invalid ID </b></p>
  <EmployeeUpdate
    @save="onSave"
    @cancel="onCancel"
    v-else
    :employee="currentEmployee"
  />
</template>

<script>
import { mapState, mapActions } from "vuex";
import EmployeeUpdate from "../../components/EmployeeUpdate.vue";

export default {
  name: "UpdatePage",
  components: {
    EmployeeUpdate,
  },
  computed: {
    ...mapState("global", ["employees"]),
    currentEmployee() {
      const id = this.$route.params.id;
      if (id) {
        const employee = this.employees.find((employee) => employee.id === +id);
        return employee;
      }
      return null;
    },
  },
  methods: {
    ...mapActions("global", ["updateEmployee"]),

    onCancel() {
      this.$router.push({ name: 'all-employee' });
    },

    onSave(employee) {
      this.updateEmployee(employee);
      this.$router.push({ name: 'all-employee' });
    },
  },
};
</script>
