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
          <v-card width="600px">
            <v-simple-table>
              <template v-slot: default>
                <thead>
                  <tr>
                    <th class="text-left">Name</th>
                    <th class="text-left">Labour Cost</th>
                    <th class="text-left">Material Cost</th>
                    <th class="text-left">Description</th>
                    <th class="text-left">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="project in projects" :key="project.name">
                    <td>{{ project.name }}</td>
                    <td>{{ project.labourCost }}</td>
                    <td>{{ project.materialCost }}</td>
                    <td>{{ project.description }}</td>
                    <td>
                      <div class="text-center pa-1">
                        <router-link
                          :to="{
                            name: 'project-task-update',
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
  name: "ProjectTaskList",
  data() {
    return {
      projects: [
        {
          type: Object,
          name: "Task 2",
          labourCost: 909.0,
          materialCost: 500.1,
          description: "This is budget Manager",
        },
      ],
      header: "All Tasks ",
      activeProject: null,
    };
  },
};
</script>

<style>
th{
  width: 30%;
}
</style>
