<template>
  <v-row>
    <v-col cols="12" sm="12" md="12" width="100%" class="displayblock">
      <span class="text-h4 pa-3"><b> Create Project </b></span>
      <v-select
        :items="statuses"
        v-model="project.status"
        filled
        label="Status"
        class="float-right"
      ></v-select>
    </v-col>
    <v-row class="mt-5">
      <v-col cols="12" sm="12" md="3">
        <v-text-field
          outlined
          v-model="project.name"
          label="Project Name"
          name="projectName"
          type="text"
      /></v-col>
      <v-col cols="12" sm="12" md="3">
        <v-text-field
          outlined
          v-model="project.clientEmail"
          label="Client Email"
          name="clientEmail"
      /></v-col>
      <v-col cols="12" sm="12" md="6">
        <v-text-field
          outlined
          v-model="project.clientAddress"
          label="Client Address"
          name="clientAddress"
      /></v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="3" class="">
        <v-card width="100%">
          <v-card-title class="displayblock">
            <span class="text-h5 pa-3"><b> Tasks: </b></span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    outlined
                    v-model="search"
                    label="Search ..."
                    name="search"
                /></v-col>
                <v-col
                  cols="12"
                  sm="12"
                  md="12"
                  class="mb-2 border-line"
                  v-for="task in tasks"
                  :key="task.name"
                >
                  {{ task.name }}
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="6" class="">
        <v-card width="100%">
          <v-card-title class="displayblock">
            <v-btn
              color="primary"
              class="ma-3 expand-btn"
              @click="all"
              elevation="9"
              rounded
            >
              {{
                this.panel.length &&
                this.panel.length === this.project.tasks.length
                  ? "Unexpand All"
                  : "Expand All"
              }}
            </v-btn>
            <v-btn
              color="primary"
              class="ma-3 expand-btn float-right"
              elevation="9"
              rounded
            >
              Preview
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col>
                  <v-expansion-panels focusable v-model="panel" multiple>
                    <v-expansion-panel
                      v-for="task in project.tasks"
                      :key="task.name"
                    >
                      <v-expansion-panel-header>{{
                        task.name
                      }}</v-expansion-panel-header>
                      <v-expansion-panel-content
                        v-for="description in task.descriptions"
                        :key="description.name"
                        >{{ description.name }}
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-divider></v-divider>

          <v-card-actions>
            <div class="displayblock">
              <v-btn
                color="primary"
                class="ma-3 save-btn float-right"
                elevation="9"
                rounded
              >
                Save
              </v-btn>
            </div>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="3" class="">
        <v-card width="100%">
          <v-card-title class="displayblock">
            <span class="text-h5 pa-3"><b> Descriptions: </b></span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    outlined
                    v-model="search"
                    label="Search ..."
                    name="search"
                /></v-col>
                <v-col
                  cols="12"
                  sm="12"
                  md="12"
                  class="mb-2 border-line"
                  v-for="description in descriptions"
                  :key="description.name"
                >
                  {{ description.name }}
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-row>
</template>

<script>
import { mapState, mapActions } from "vuex";
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
    tasks: [
      {
        id: 1,
        name: "Drawing Room",
      },
      {
        id: 2,
        name: "Room 1",
      },
      {
        id: 3,
        name: "Room 2",
      },
      {
        id: 4,
        name: "Room 3",
      },
      {
        id: 5,
        name: "Room 4",
      },
    ],
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
    task: {
      name: "",
      amount: 0,
    },
    panel: [],
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
    ...mapState("global", ["comingProject"]),
  },
  mounted() {
    let id = this.$route.params.id;
    this.getProject(id);
    this.fetchAllTasksAndDescriptions();

    console.log(this.comingProject);
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
.save-btn{
  width: 120px;
  height: 50px !important;
}
</style>
