<template>
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
            this.panel.length && this.panel.length === projectTasks.length
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
        <v-row>
          <v-col cols="12" sm="12" md="3" class="h-amount">
            <div class="mr-5">
              <p class="ps"><strong>Total Labour Cost</strong></p>
              <h2>
                <b>{{ CURRENCY_SYMBOL }}</b> {{ totalLabourCost }}
              </h2>
            </div>
          </v-col>
          <v-col cols="12" sm="12" md="3" class="h-amount">
            <div class="mr-5">
              <p class="ps"><strong>Total Material Cost</strong></p>
              <h2>
                <b>{{ CURRENCY_SYMBOL }}</b> {{ totalMaterialCost }}
              </h2>
            </div>
          </v-col>
          <v-col cols="12" sm="12" md="3" class="h-amount">
            <div class="mr-5">
              <p class="ps"><strong>Total Amount</strong></p>
              <h2>
                <b>{{ CURRENCY_SYMBOL }}</b> {{ totalAmout }}
              </h2>
            </div>
          </v-col>
        </v-row>
        <v-container>
          <v-row>
            <v-col>
              <v-expansion-panels focusable v-model="panel" multiple>
                <v-expansion-panel
                  v-for="(task, taskIndex) in projectTasks"
                  :key="taskIndex"
                >
                  <v-expansion-panel-header @click="openTab(taskIndex)">
                    <v-row class="align-center">
                      <v-col cols="12" md="5" class="py-0">
                        <v-text-field
                          v-model="task.name"
                          label="Task Name"
                          name="taskName"
                          type="text"
                      /></v-col>
                      <v-col cols="12" md="3" class="py-0">
                        <v-text-field
                          class="l-amount"
                          v-model="task.materialCost"
                          label="Material Cost"
                          name="MaterialCost"
                          type="number"
                          @change="addCost"
                      /></v-col>
                      <v-col cols="12" md="3" class="py-0">
                        <v-text-field
                          class="l-amount"
                          v-model="task.labourCost"
                          label="Labor Cost"
                          name="LaborCost"
                          type="number"
                          @change="addCost"
                      /></v-col>
                      <v-col cols="12" md="1" class="py-0"
                        ><v-btn
                          class="ma-2"
                          icon
                          small
                          color="error"
                          @click="removeProjectTask(taskIndex)"
                        >
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row></v-expansion-panel-header
                  >
                  <v-expansion-panel-content
                    v-for="(description, descriptionIndex) in task.descriptions"
                    :key="descriptionIndex"
                  >
                    <v-row class="align-center">
                      <v-col cols="12" sm="11" md="11" class="">
                        <v-text-field
                          v-model="description.description"
                          label="Description"
                          name="descriptionName"
                          type="text"
                      /></v-col>
                      <v-col cols="12" sm="1" md="1" class="">
                        <v-btn
                          class="ma-2"
                          icon
                          small
                          color="error"
                          @click="
                            removeProjectDescription(
                              taskIndex,
                              descriptionIndex
                            )
                          "
                        >
                          <v-icon>mdi-delete</v-icon>
                        </v-btn></v-col
                      >
                    </v-row>
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
            @click="onSave"
          >
            Save
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
import { CURRENCY_SYMBOL } from "@/enums";
export default {
  name: "Tasks",
  props: {
    projectTasks: [],
  },
  data: () => {
    return {
      panel: [],
      headerTitle: { type: String },
      searchQuery: "",
      CURRENCY_SYMBOL,
      totalLabourCost: 0,
      totalMaterialCost: 0,
      totalAmout: 0,
    };
  },
  methods: {
    all() {
      if (this.panel.length && this.panel.length != 1) {
        this.panel = [];
      } else {
        this.panel = this.projectTasks.map((k, i) => i);
        this.$emit("open", undefined);
      }
    },
    openTab(index) {
      this.panel = [];
      this.$emit("open", index);
    },
    removeProjectTask(task) {
      this.$emit("removeTask", task);
    },

    removeProjectDescription(task, description) {
      this.$emit("removeDescription", task, description);
    },

    addCost() {
      this.totalLabourCost = this.projectTasks
        .map((task) => (task.labourCost ? task.labourCost : 0))
        .reduce((a, b) => +a + +b, 0);
      this.totalMaterialCost = this.projectTasks
        .map((task) => (task.materialCost ? task.materialCost : 0))
        .reduce((a, b) => +a + +b, 0);
      this.totalAmout = +this.totalLabourCost + this.totalMaterialCost;
    },

    onSave() {
      this.$emit("save");
    },
  },
  mounted() {
    if (this.isProjectTask) {
      this.headerTitle = "Tasks:";
    } else {
      this.headerTitle = "Descriptions:";
    }
  },
};
</script>

<style>
.displayblock {
  display: block;
  width: 100%;
}
.h-amount {
  border: 1px solid;
  margin: 4%;
  height: 70px;
  border-radius: 10px;
  color: white;
  background: linear-gradient(286deg, #00aeff, #0095ff 46%, #0076ff);
  /* background: linear-gradient(
    286deg,
    rgb(113 209 118),
    rgb(17 187 26) 46%,
    rgb(67, 160, 71)
  ); */
  /* background-color: rgb(67, 160, 71); */
  cursor: pointer;
}
.ps {
  font-size: 12px;
  margin-bottom: unset !important;
}
</style>
