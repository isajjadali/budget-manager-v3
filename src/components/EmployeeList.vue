<template>
  <div>
    <v-row no-gutters>
      <v-col>
        <h1 class="text-center">
          {{ header }}
        </h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="d-flex">
          <v-card width="100%">
            <v-simple-table>
              <template v-slot: default>
                <thead>
                  <tr>
                    <th class="text-left">Name</th>
                    <th class="text-left">Balance</th>
                    <th class="text-left">Rate</th>
                    <th class="text-left">Address</th>
                    <th class="text-left">Status</th>
                    <th class="text-left">View Activities</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                      v-for="employee in employees"
                      :key="employee.name"
                      @click="onEmployeeClick(employee)"
                    >
                      <td>{{ employee.fullName }}</td>
                      <td>{{ employee.balance }}</td>
                      <td>{{ employee.rate }}</td>
                      <td>{{ employee.address }}</td>
                      <td v-if="employee.status">Available</td> <td v-else>Not-Available</td>
                      <td>
                        <router-link
                          :to="{
                            name: 'all-activities',
                            query: {employeeIds: `${employee.id}`},
                          }"
                          @click="onButtonClick(employee)"
                        >
                          Click Here
                        </router-link>
                      </td>
                    </tr>
                </tbody>
                <ModalEdit :isOpen="isToggleOpen" :isEmployee="true" :employee="activeEmployee" @save="onSave" @cancel="onCancel" />
              </template>
            </v-simple-table>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ModalEdit from './ModalEdit.vue';

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
    async onSave(employee) {
      await this.updateEmployee(employee);
      this.fetchAllEmployees(true);
      // this.activeEmployee= {},
      this.isToggleOpen = false;
    },
    onCancel() {
      this.isToggleOpen = false;
    },
    onButtonClick(employee) {
      // this.$router.push({ name: 'all-activities', query: {employeeIds: `${employee.id}`}})
      // console.log(employee);
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
  }
};
</script>
