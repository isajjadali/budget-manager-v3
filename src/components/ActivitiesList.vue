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
              <template
                v-slot:
                default
              >
                <thead>
                  <tr>
                    <th class="text-left">
                      Employee Name
                    </th>
                    <th class="text-left">
                      Amount
                    </th>
                    <th class="text-left">
                      Date
                    </th>
                    <th class="text-left">
                      Edit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="activity in activities"
                    :key="activity.id"
                  >
                    <td>{{ activity.employee.fullName }}</td>
                    <td>{{ activity.amount }}</td>
                    <td>{{ activity.date }}</td>
                    <td>
                      <!-- Edit Button -->
                      <div class="text-center pa-1">
                        <router-link
                          :to="{
                            name: 'edit-activity',
                            params: { id: activity.id },
                          }"
                        >
                          <v-btn
                            style="height: 43px; width: 50px"
                            class="mx-1"
                            fab
                            dark
                            large
                            color="cyan"
                          >
                            <v-icon
                              dark
                              @click="editActivity(activity)"
                            >
                              mdi-pencil
                            </v-icon>
                          </v-btn>
                        </router-link>
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
import {mapState, mapActions} from 'vuex';

export default {
  name: 'ActivitiesList',
  data() {
    return {
      header: 'All Activities ',
    };
  },
  methods: {
    ...mapActions('global', ['fetchAllActivities']),

    editActivity(activity) {
      this.currentActivity = activity;
    },
  },
  computed: {
    ...mapState('global', ['activities']),
  },
  mounted() {
    this.fetchAllActivities();
  },
};
</script>

<style>
th {
  width: 30%;
}
</style>
