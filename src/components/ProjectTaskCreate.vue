<template>
  <v-row>
    <ProjectForm :project="project" />
    <v-row>
      <Tasks is-project-task key-to-map="name" :project-tasks="tasks" />
      <ProjectTasks :project-tasks="project.tasks" />
      <Tasks
        :is-project-task="false"
        key-to-map="description"
        :project-tasks="descriptions"
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
  data: () => ({
    rules: {
      required: (value) => !!value || "Required.",
    },
    search: "",
    statuses: ["DRAFT", "PENDINGREVIEW", "ONGOING", "COMPLETED"],
    toggleModalOpen: false,
    activeProject: {},
    project: {
      clientAddress: "afsdadfkjlaksjdf",
      clientEmail: "iamnaqihaider@gmail.com",
      createdAt: "2022-05-20T15:44:49.000Z",
      deletedAt: null,
      id: 6,
      name: "Testing Project",
      status: "DRAFT",
      updatedAt: "2022-05-20T15:55:35.000Z",
      tasks: [
        {
          id: 1,
          name: "Drawing Room",
          descriptions: [
            {
              id: 1,
              name: "Paint",
            },
            {
              id: 2,
              name: "Roof Cieling",
            },
            {
              id: 3,
              name: "Wallpaper",
            },
            {
              id: 4,
              name: "Cleaning",
            },
            {
              id: 5,
              name: "Carpanting",
            },
          ],
        },
        {
          id: 2,
          name: "Room 1",
          descriptions: [
            {
              id: 1,
              name: "Paint",
            },
            {
              id: 2,
              name: "Roof Cieling",
            },
            {
              id: 3,
              name: "Wallpaper",
            },
            {
              id: 4,
              name: "Cleaning",
            },
            {
              id: 5,
              name: "Carpanting",
            },
          ],
        },
        {
          id: 3,
          name: "Room 2",
          descriptions: [
            {
              id: 1,
              name: "Paint",
            },
            {
              id: 2,
              name: "Roof Cieling",
            },
            {
              id: 3,
              name: "Wallpaper",
            },
            {
              id: 4,
              name: "Cleaning",
            },
            {
              id: 5,
              name: "Carpanting",
            },
          ],
        },
        {
          id: 4,
          name: "Room 3",
          descriptions: [
            {
              id: 1,
              name: "Paint",
            },
            {
              id: 2,
              name: "Roof Cieling",
            },
            {
              id: 3,
              name: "Wallpaper",
            },
            {
              id: 4,
              name: "Cleaning",
            },
            {
              id: 5,
              name: "Carpanting",
            },
          ],
        },
        {
          id: 5,
          name: "Room 4",
          descriptions: [
            {
              id: 1,
              name: "Paint",
            },
            {
              id: 2,
              name: "Roof Cieling",
            },
            {
              id: 3,
              name: "Wallpaper",
            },
            {
              id: 4,
              name: "Cleaning",
            },
            {
              id: 5,
              name: "Carpanting",
            },
          ],
        },
      ],
    },
    // tasks: [
    //   {
    //     id: 1,
    //     name: "Drawing Room",
    //   },
    //   {
    //     id: 2,
    //     name: "Room 1",
    //   },
    //   {
    //     id: 3,
    //     name: "Room 2",
    //   },
    //   {
    //     id: 4,
    //     name: "Room 3",
    //   },
    //   {
    //     id: 5,
    //     name: "Room 4",
    //   },
    // ],
    // descriptions: [
    //   {
    //     id: 1,
    //     name: "Paint",
    //   },
    //   {
    //     id: 2,
    //     name: "Roof Cieling",
    //   },
    //   {
    //     id: 3,
    //     name: "Wallpaper",
    //   },
    //   {
    //     id: 4,
    //     name: "Cleaning",
    //   },
    //   {
    //     id: 5,
    //     name: "Carpanting",
    //   },
    // ],
    task: {
      name: "",
      amount: 0,
    },
  }),
  methods: {
    ...mapActions("global", [
      "updateProject",
      "getProject",
      "fetchAllTasksAndDescriptions",
    ]),
    editProject(project) {
      this.toggleModalOpen = true;
      this.activeProject = project;
    },
    async onSave(project) {
      await this.updateProject(project);
      this.toggleModalOpen = false;
    },
    onClose() {
      this.toggleModalOpen = false;
    },
    all() {
      if (this.panel.length) {
        this.panel = [];
      } else {
        this.panel = this.project.tasks.map((k, i) => i);
      }
    },
  },
  computed: {
    ...mapState("global", ["tasks"]),
    ...mapGetters("global", ['descriptions'])
  },
  async mounted() {
    let id = this.$route.params.id;
    if (id) {
      this.project = await this.getProject(id);
    }
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
  width: 120px;
  height: 50px !important;
}

.v-expansion-panel-content__wrap {
  padding: 8px 24px 0px !important;
  flex: 1 1 auto;
  max-width: 100%;
}
</style>
