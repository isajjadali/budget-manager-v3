<template>
  <v-card width="100%" class="wrapper">
    <v-card-title class="displayblock pb-2">
      <span class="text-h5"
        ><b> {{ headerTitle }} </b></span
      >
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="12" md="12" class="px-0">
            <v-text-field
              outlined
              v-model="searchQuery"
              label="Search ..."
              name="search"
              hide-details
          /></v-col>
          <div class="card-container">
            <v-col
              cols="12"
              sm="12"
              md="12"
              class="mb-2 border-line"
              v-for="(task, index) in filteredTasks"
              :key="`${index}-${task[keyToMap]}`"
              @click="onAdd(task)"
            >
              {{ task[keyToMap] }}
            </v-col>
          </div>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Tasks",
  props: {
    projectTasks: [],
    isProjectTask: Boolean,
    keyToMap: {
      type: String,
      default: "name",
    },
  },
  data: () => {
    return {
      headerTitle: { type: String },
      searchQuery: "",
    };
  },
  methods: {
    onAdd(task) {
      this.$emit("add", task);
    },
  },
  computed: {
    filteredTasks() {
      if (this.searchQuery) {
        const matchingRegex = new RegExp(`^${this.searchQuery}`, "i");
        const list = this.projectTasks.filter((task) =>
          matchingRegex.test(task[this.keyToMap])
        );
        return list;
      }
      return this.projectTasks;
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

<style scoped lang='scss'>
.wrapper {
  position: sticky;
  top: 64px;
  height: calc(100vh - (64px));
  overflow: hidden,
}
.card-container {
  height: calc(100vh - (138px + 50px));
  overflow-y: auto;
  padding-bottom: 50px;
  width: 100%;
}
</style>