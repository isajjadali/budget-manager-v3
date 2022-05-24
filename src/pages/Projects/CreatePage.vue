<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <ProjectTaskCreate @cancel="onClose" @save="onSave" />
      </v-col>
    </v-row>
  </v-container>
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
      await this.createProject(newProject);
      this.$emit("save", newProject);
      this.dialog = false;
    },
  },
};
</script>
