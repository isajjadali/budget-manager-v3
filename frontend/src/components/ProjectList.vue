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
          <v-card width="500px">
            <v-simple-table>
              <template v-slot: default>
                <thead>
                  <tr>
                    <th class="text-left">Name</th>
                    <th class="text-left">Amount</th>
                    <th class="text-left">Notes</th>
                    <th class="text-left">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="project in projects" :key="project.name">
                    <td>{{ project.name }}</td>
                    <td>{{ project.amount }}</td>
                    <td>{{ project.notes }}</td>
                    <td>
                      <div class="text-center pa-1">
                        <router-link
                          :to="{
                            name: 'edit-project',
                            params: { id: project.id },
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
                            <v-icon @click="editProject(project)" dark>
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
  name: "ProjectList",
  methods: {
    ...mapActions("global", ["fetchAllProjects", "updateProject"]),

    editProject(project) {
      this.activeProject = project;
    },
  },
  data() {
    return {
      header: "All Projects ",
      dialogueOpen: "false",
      activeProject: null,
    };
  },
  computed: {
    ...mapState("global", ["projects"]),
  },
  mounted() {
    this.fetchAllProjects();
  },
};
</script>
