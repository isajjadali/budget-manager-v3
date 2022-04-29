<template>
  <div>
    <v-row no-gutters>
      <v-col>
        <h1 class="text-center">{{ header }}</h1>
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
                    <th class="text-left">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="employee in employees" :key="employee.name">
                    <td>{{ employee.fullName }}</td>
                    <td>{{ employee.balance }}</td>
                    <td>{{ employee.rate }}</td>
                    <td>{{ employee.address }}</td>
                    <td v-if="employee.status">Available</td>
                    <td v-else>Not-Available</td>
                    <td>
                      <!-- Edit Button -->
                      <div class="text-center pa-1">
                        <v-btn
                          style="height: 43px; width: 50px"
                          class="mx-1"
                          fab
                          dark
                          large
                          color="cyan"
                        >
                          <v-icon @click="editProject(project)" dark>
                            mdi-pencil
                          </v-icon>
                        </v-btn>
                      </div>
                    </td>
                  </tr>
                </tbody>
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

export default {
  name: "EmployeeList",
  data() {
    return {
      header: "All Employees ",
    };
  },
  methods: {
    ...mapActions("global", ["fetchAllEmployees"]),
  },
  computed: {
    ...mapState("global", ["employees"]),
  },
  mounted() {
    this.fetchAllEmployees();
  },
};
</script>

<style>
th {
  width: 30%;
}
</style>
