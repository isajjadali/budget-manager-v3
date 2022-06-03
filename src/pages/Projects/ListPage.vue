<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <ProjectList />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProjectList from "../../components/ProjectList.vue";

export default {
  name: "ProjectsListPage",
  components: {
    ProjectList,
  },
};
</script>
