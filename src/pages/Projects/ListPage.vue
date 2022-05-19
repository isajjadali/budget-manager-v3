<template>
  <v-row>
    <v-col>
      <ModalProjectCreate />
    </v-col>
    <v-col cols="12">
      <ProjectList />
    </v-col>
  </v-row>
</template>

<script>
import ModalProjectCreate from '../../components/ModalProjectCreate.vue';
import ProjectList from '../../components/ProjectList.vue';

export default {
  name: 'ProjectsListPage',
  components: {
    ModalProjectCreate,
    ProjectList,
  },
};
</script>