<template>
  <v-row>
    <ProjectForm
      :project="project"
      @projectChange="onChangeInProject"
      @save="onSave"
      ref="projectForm"
    />
    <v-row>
      <Tasks
        is-project-task
        key-to-map="name"
        @add="addProjectTask"
        :project-tasks="tasks"
      />
      <ProjectTasks
        ref="projectTask"
        @removeTask="removeProjectTask"
        @removeDescription="removeProjectDescription"
        @open="openTask"
        :project-tasks="project.tasks"
        :panel="panel"
      />
      <Tasks
        :is-project-task="false"
        key-to-map="description"
        :project-tasks="descriptions"
        @add="addProjectDescription"
      />
    </v-row>
  </v-row>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import Tasks from "./Tasks.vue";
import ProjectTasks from "./ProjectTasks.vue";
import ProjectForm from "./ProjectForm.vue";

export default {
  name: "ProjectTaskCreate",
  props: {
    project: {
      type: Object,
    },
  },
  data: () => ({
    rules: {
      required: (value) => !!value || "Required.",
    },
    panel: [],
    search: "",
    statuses: ["DRAFT", "PENDINGREVIEW", "ONGOING", "COMPLETED"],
    toggleModalOpen: false,
    // project: {
    //   tasks: [],
    // },
    task: undefined,
  }),
  methods: {
    ...mapActions("global", [
      "createProject",
      "updateProject",
      "getProject",
      "fetchAllTasksAndDescriptions",
    ]),

    editProject(project) {
      this.toggleModalOpen = true;
      this.activeProject = project;
    },

    onChangeInProject(project) {
      this.project.name = project.name;
      this.project.status = project.status;
      this.project.clientAddress = project.clientAddress;
      this.project.clientEmail = project.clientEmail;
    },

    openTask(task) {
      if (task === undefined) {
        this.task = task;
        if (this.panel.length && this.panel.length != 1) {
          this.panel = [];
        } else {
          this.panel = this.project.tasks.map((k, i) => i);
        }
      } else {
        this.task = task;
        // this.panel = []
      }
    },

    addProjectTask(task) {
      let obj = JSON.parse(JSON.stringify(task));
      delete obj.id;
      obj.descriptions.forEach((description) => {
        delete description.id;
      });
      this.project.tasks.push(obj);
      this.panel = [this.project.tasks.length - 1];
    },

    addProjectDescription(description) {
      if (this.task) {
        let obj = JSON.parse(JSON.stringify(description));
        delete obj.id;
        this.project.tasks[this.task].descriptions = [
          ...this.project.tasks[this.task].descriptions,
          obj,
        ];
      } else {
        this.$toast.error("Please Select Task First");
      }
    },

    removeProjectTask(task) {
      this.project.tasks.splice(task, 1);
    },

    removeProjectDescription(task, description) {
      this.project.tasks[task].descriptions.splice(description, 1);
    },

    async onSave() {
      this.$emit("save", this.project);
    },
  },
  computed: {
    ...mapState("global", ["tasks"]),
    ...mapGetters("global", ["descriptions"]),
  },
  async mounted() {
    await this.fetchAllTasksAndDescriptions();
  },
  components: {
    Tasks,
    ProjectTasks,
    ProjectForm,
  },
};
</script>
<style>
.displayblock {
  display: block;
  width: 100%;
}
.border-line {
  border: 0.3px solid;
  border-radius: 10px;
  cursor: pointer;
}
.save-btn {
  height: 50px !important;
}

.v-expansion-panel-content__wrap {
  padding: 8px 24px 0px !important;
  flex: 1 1 auto;
  max-width: 100%;
}
</style>
