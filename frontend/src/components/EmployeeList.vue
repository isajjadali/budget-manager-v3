<template>
  <v-container>
    <v-row no-gutters>
      <v-col>
        <h1 class="text-center">{{ header }}</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="d-flex justify-center">
          <v-card width="700px">
            <v-simple-table>
              <template v-slot: default>
                <thead>
                  <tr>
                    <th class="text-left">Name</th>
                    <th class="text-left">Age</th>
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
                    <td>{{ employee.age }}</td>
                    <td>{{ employee.balance }}</td>
                    <td>{{ employee.rate }}</td>
                    <td>{{ employee.address }}</td>
                    <td v-if="employee.status">Available</td>
                    <td v-else>Not-Available</td>
                    <td><!-- Edit Button -->
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
    <v-row>
      <v-col class="text-center">
        <v-btn>Create</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "ProjectTaskList",
  data() {
    return {
      employees: [
        {
          fullName: "Jawad Haider",
          age: 19,
          balance: 100.1,
          rate: 120.1,
          address: "Lahore",
          status: true,
        },
        {
          fullName: "Ferasat",
          age: 21,
          balance: 200.1,
          rate: 110.1,
          address: "Karachi",
          status: false,
        },
        {
          fullName: "Ali",
          age: 20,
          balance: 150.2,
          rate: 100.1,
          address: "Lahore",
          status: false,
        },
      ],
      header: "All Employees ",
      activeProject: null,
    };
  },
};
</script>

<style>
th {
  width: 30%;
}
</style>
