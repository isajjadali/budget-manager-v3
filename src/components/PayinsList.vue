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
                      Project Name
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
                    v-for="payin in payins"
                    :key="payin.id"
                  >
                    <td>{{ payin.project.name }}</td>
                    <td>{{ payin.amount }}</td>
                    <td>{{ payin.date }}</td>
                    <td>
                      <!-- Edit Button -->
                      <div class="text-center pa-1">
                        <router-link
                          :to="{
                            name: 'edit-payins',
                            params: { id: payin.id },
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
                              @click="editPayin(payin)"
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
  name: 'PayinsList',
  data() {
    return {
      header: 'All Payins',
    };
  },
  methods: {
    ...mapActions('global', ['fetchAllPayins']),

    editPayin(payin) {
      this.currentPayin = payin;
    },
  },
  computed: {
    ...mapState('global', ['payins']),
  },
  mounted() {
    this.fetchAllPayins();
  },  
};
</script>

<style>
th {
  width: 30%;
}
</style>
