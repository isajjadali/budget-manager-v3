<template>
  <v-col cols="12" sm="12" md="3" class="">
    <v-card width="100%">
      <v-card-title class="displayblock">
        <span class="text-h5 pa-3"><b> {{ headerTitle }} </b></span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-text-field
                outlined
                v-model="searchQuery"
                label="Search ..."
                name="search"
            /></v-col>
            <v-col
              cols="12"
              sm="12"
              md="12"
              class="mb-2 border-line"
              v-for="task in filteredTasks"
              :key="task.name"
            >
              {{ task.name }}
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: 'ProjectTasks',
  props: {
    projectTasks: [],
    isProjectTask: Boolean,
  },
  data: () => {
    return {
      headerTitle: { type: String },
      searchQuery: "",
    }
  },
  computed: {
    filteredTasks() {
      if (this.searchQuery) {
        const matchingRegex = new RegExp(`^${this.searchQuery}`, 'i');
        const list =  this.projectTasks.filter((task) => matchingRegex.test(task.name));
        return list;
      }
      return this.projectTasks;
    }
  },
  mounted() {
    if(this.isProjectTask) {
      this.headerTitle = "Tasks:";
    } else {
      this.headerTitle = "Descriptions:";
    }
  }
}
</script>
