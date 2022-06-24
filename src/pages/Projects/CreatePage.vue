<template>
  <v-row>
    <v-col cols="12">
      <ProjectTaskCreate 
        :isProjectCreate="true"
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
  name: "ProjectCreatePage",
  components: {
    ProjectTaskCreate,
  },
  data: () => ({
    dialog: false,
    project: {
      tasks: [],
    },
  }),
  computed: {
    ...mapState("global", ["isCreatingProject"]),
  },
  methods: {
    ...mapActions("global", ["createProject"]),
    onClose() {
      this.dialog = false;
      this.$emit("close");
    },
    async onSave(newProject) {
      newProject.tasks.forEach(task => {
        let desLabourCost = task.labourCost / task.descriptions.length
        task.descriptions.forEach(description => {
          description.laborCost = desLabourCost
        })
      });
      await this.createProject(newProject);
      this.$router.push({ name: 'all-projects' });
    },
  },
  async mounted() {
  },
};
</script>
