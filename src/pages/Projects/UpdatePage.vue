<template>
  <v-row>
    <v-col cols="12">
      <ProjectTaskCreate 
        :isProjectCreate="false"
        :project="project" 
        @cancel="onClose" 
        @save="onSave" 
    />
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ProjectTaskCreate from "../../components/ProjectTaskCreate.vue";

export default {
  name: "ProjectUpdatePage",
  components: {
    ProjectTaskCreate,
  },
  data: () => ({
    dialog: false,
    // project: {
    //   tasks: [],
    // },
  }),
  computed: {
    ...mapState("global", ["isCreatingProject", "project"]),
  },
  methods: {
    ...mapActions("global", ["getProject", "updateProject"]),
    onClose() {
      this.dialog = false;
      this.$emit("close");
    },
    async onSave(newProject) {
      newProject.tasks.forEach((task) => {
        let desLabourCost = task.labourCost / task.descriptions.length;
        task.descriptions.forEach((description) => {
          description.laborCost = desLabourCost;
        });
      });
      await this.updateProject(newProject);
      this.$router.push({ name: 'all-projects' });
    },
  },
  async mounted() {
    let id = this.$route.params.id;
    if (id) {
      await this.getProject(id);
    }
  },
};
</script>
