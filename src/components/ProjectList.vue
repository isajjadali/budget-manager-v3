<template>
  <v-row>
    <v-col cols="12 d-flex justify-end">
      <router-link
          :to="{
            name: 'create-project',
          }"
        >
          <v-btn color="primary" dark rounded> Create Project </v-btn>
        </router-link>
    </v-col>
    <v-col cols="12">
      <div class="d-flex">
        <v-card width="100%">
          <v-simple-table>
            <template v-slot: default>
              <thead>
                <tr>
                  <th class="text-left">Name</th>
                  <th class="text-left">Client Email</th>
                  <th class="text-left">Status</th>
                  <th class="text-center">Edit</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="project in projects" :key="project.id">
                  <td @click="onItemClick(project)">{{ project.name }}</td>
                  <td @click="onItemClick(project)">
                    {{ project.clientEmail }}
                  </td>
                  <td @click="onItemClick(project)">{{ project.status }}</td>
                  <td class="text-center">
                    <v-btn
                      text
                      color="light-blue"
                      @click="onItemClick(project); reveal = true;"
                    >
                      Edit
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </div>
    </v-col>
  </v-row>
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
      this.$router.push(`update-project/${project.id}`);
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
