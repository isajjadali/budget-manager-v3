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
    <v-col cols="12" v-if="objURL">
      <!-- <pdf :src="objURL"></pdf> -->
      <iframe :src="objURL" width="100%" height="1000px"></iframe>
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
                  <th class="text-center">Actions</th>
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
                      v-if="project.status === 'DRAFT'"
                      text
                      color="light-blue"
                      @click="onItemClick(project); reveal = true;"
                    >
                      Edit
                    </v-btn>
                    <v-btn
                      v-else
                      text
                      color="light-blue"
                      @click="onItemClick(project); reveal = true;"
                    >
                      Detail
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
import pdf from 'vue-pdf'

export default {
  name: "ProjectList",
  data() {
    return {
      toggleModalOpen: false,
      header: "All Projects ",
      activeProject: {},
      objURL: null
    };
  },
  methods: {
    ...mapActions("global", ["fetchAllProjects", "updateProject", "fetchPreviewPDF"]),

    async onSave(project) {
      await this.updateProject(project);
      await this.fetchAllProjects(true);
      this.toggleModalOpen = false;
    },
    onClose() {
      this.toggleModalOpen = false;
    },
    onItemClick(project) {
      if (project.status === 'DRAFT') {
        this.$router.push(`update/${project.id}`);
      } else {
        this.$router.push(`detail/${project.id}`);
      }
    },
  },
  components: {
    pdf
  },
  computed: {
    ...mapState("global", ["projects"]),
  },
  async mounted() {
    this.fetchAllProjects(true);
    this.objURL = await this.fetchPreviewPDF(2)
  },
};
</script>
