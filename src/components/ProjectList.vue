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
                    <th class="text-left">Client Email</th>
                    <th class="text-left">Status</th>
                    <th class="text-left">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="project in projects" :key="project.id">
                    <td @click="onItemClick(project)">{{ project.name }}</td>
                    <td @click="onItemClick(project)">
                      {{ project.clientEmail }}
                    </td>
                    <td @click="onItemClick(project)">{{ project.status }}</td>
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
                            <v-icon dark @click="editProject(project)">
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
import { mapState, mapActions } from "vuex";

export default {
  name: "ProjectList",
  data() {
    return {
      toggleModalOpen: false,
      header: "All Projects ",
      activeProject: {},
    };
  },
  methods: {
    ...mapActions("global", ["fetchAllProjects", "updateProject"]),

    async onSave(project) {
      await this.updateProject(project);
      await this.fetchAllProjects(true);
      this.toggleModalOpen = false;
    },
    onClose() {
      this.toggleModalOpen = false;
    },
    onItemClick(project) {
      this.$router.push("/create-project/", project.id);
    },

    editProject(project) {
      this.toggleModalOpen = true;
      this.activeProject = project;
    },
  },
  computed: {
    ...mapState("global", ["projects"]),
  },
  mounted() {
    this.fetchAllProjects();
  },
};
</script>
