<template>
  <p v-if="!currentProject">
    <b>Invalid ID </b>
  </p>
  <ProjectEdit
    v-else
    :project="currentProject"
    @save="onSave"
    @cancel="onCancel"
  />
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ProjectEdit from '../../components/ProjectEdit.vue';

export default {
  name: 'UpdatePage',
  components: {
    ProjectEdit,
  },
  computed: {
    ...mapState('global', ['projects']),
    currentProject() {
      const id = this.$route.params.id;
      if (id) {
        const project = this.projects.find((project) => project.id === +id);
        return project;
      }
      return null;
    },
  },
  methods: {
    ...mapActions('global', ['updateProject']),

    onCancel() {
      this.$router.push({ name: 'all-project' });
    },

    onSave(project) {
      this.updateProject(project);
      this.$router.push({ name: 'all-project' });
    },
  },
};
</script>
